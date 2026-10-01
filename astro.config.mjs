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
 * 칸 안 코드의 / 뒤에 <wbr>을 넣고, 짧은 표에는 .tbl-plain을 붙인다.
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
      let longest = 0;
      walk(table, (tr) => {
        if (tr.type !== 'element' || tr.tagName !== 'tr') return;
        let i = 0;
        for (const td of tr.children ?? []) {
          if (td.type !== 'element' || td.tagName !== 'td') continue;
          const len = text(td).trim().length;
          // 아주 짧은 칸(날짜 09-16, 커밋 하나 등)은 줄을 바꾸지 않는다 — 자동 열 폭에서 "09-|16"처럼 끊기지 않게
          td.properties = { ...(td.properties ?? {}), dataLabel: heads[i] ?? '', ...(len > 0 && len <= 10 ? { className: ['nw'] } : {}) };
          longest = Math.max(longest, len);
          i += 1;
          // 칸 안 코드: 낱말 중간에서 끊기지 않게 한다.
          //  - 공백 없는 짧은 토큰(16자 이하: 커밋 해시, baro-auth, send().get(5s) 등)은 한 줄로(.nw → nowrap)
          //  - 그보다 긴 토큰과 경로는 / ( . 뒤에 <wbr>을 넣어 그 자리에서만 줄을 바꿀 수 있게 한다
          walk(td, (code) => {
            if (code.type !== 'element' || code.tagName !== 'code') return;
            const ct = text(code);
            const short = !/\s/.test(ct) && ct.length <= 16;
            if (short) {
              code.properties = { ...(code.properties ?? {}), className: ['nw'] };
              return;
            }
            const brk = /\s/.test(ct) ? /(?<=\/)(?=.)/ : /(?<=[/(.])(?=.)/;
            code.children = (code.children ?? []).flatMap((/** @type {any} */ c) => {
              if (c.type !== 'text') return [c];
              const parts = c.value.split(brk);
              return parts.flatMap((/** @type {string} */ v, /** @type {number} */ k) =>
                k < parts.length - 1
                  ? [{ type: 'text', value: v }, { type: 'element', tagName: 'wbr', properties: {}, children: [] }]
                  : [{ type: 'text', value: v }],
              );
            });
          });
        }
      });
      // 짧은 표(3열 이하, 칸이 모두 짧음)는 좁은 화면에서도 카드로 쌓지 않는다(global.css .tbl-plain)
      if (heads.length <= 3 && longest <= 40) {
        const cls = table.properties?.className ?? [];
        table.properties = { ...(table.properties ?? {}), className: [...(Array.isArray(cls) ? cls : [cls]), 'tbl-plain'] };
      }
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
