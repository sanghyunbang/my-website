// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/** 공개(draft가 아닌) 블로그 글 수. 0편이면 /blog/를 사이트맵에서 뺀다 (draft 글 페이지는 아예 만들지 않는다) */
function publishedPostCount() {
  const dir = new URL('./src/content/blog/', import.meta.url);
  try {
    return readdirSync(dir)
      .filter((f) => /\.mdx?$/.test(f))
      .filter((f) => {
        const src = readFileSync(new URL(f, dir), 'utf8');
        const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(src)?.[1] ?? '';
        return !/^draft:\s*true\s*$/m.test(fm);
      }).length;
  } catch {
    return 0;
  }
}
const hasPosts = publishedPostCount() > 0;

/**
 * 표의 각 td에 같은 열의 머리글을 data-label로 붙인다.
 * 좁은 화면에서 표를 카드로 쌓을 때 CSS(.prose td::before)가 이 값을 라벨로 보여 준다.
 */
function rehypeTableLabels() {
  /** @param {any} n @returns {string} */
  const text = (n) => (n.type === 'text' ? n.value : (n.children ?? []).map(text).join(''));
  /** @param {any} node @param {(n: any) => void} fn */
  const walk = (node, fn) => {
    fn(node);
    for (const c of node.children ?? []) walk(c, fn);
  };
  /** @param {any} tree */
  return (tree) => {
    walk(tree, (table) => {
      if (table.type !== 'element' || table.tagName !== 'table') return;
      /** @type {string[]} */
      const heads = [];
      walk(table, (n) => {
        if (n.type === 'element' && n.tagName === 'th') heads.push(text(n).trim());
      });
      if (heads.length === 0) return;
      walk(table, (tr) => {
        if (tr.type !== 'element' || tr.tagName !== 'tr') return;
        let i = 0;
        for (const td of tr.children ?? []) {
          if (td.type !== 'element' || td.tagName !== 'td') continue;
          td.properties = { ...(td.properties ?? {}), dataLabel: heads[i] ?? '' };
          i += 1;
        }
      });
    });
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://betterworldwithlucas.com',
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    mdx(),
    sitemap({
      i18n: { defaultLocale: 'ko', locales: { ko: 'ko-KR', en: 'en-US' } },
      filter: (page) => {
        const { pathname } = new URL(page);
        if (/\/404\/?$/.test(pathname)) return false;
        if (!hasPosts && pathname.startsWith('/blog')) return false;
        return true;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    rehypePlugins: [rehypeTableLabels],
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
