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
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
