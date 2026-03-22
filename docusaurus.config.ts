import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'SangHyun Bang',
  tagline: 'Links to resume, portfolio, GitHub, and live service',
  favicon: 'img/favicon.png',

  url: 'https://betterworldwithlucas.com',
  baseUrl: '/',

  organizationName: 'sanghyunbang',
  projectName: 'my-website',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'SangHyun Bang',
      logo: {
        alt: 'SangHyun Bang Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          href: 'https://www.notion.so/Hi-I-m-SangHyun-321b82bc8b718076951af8d8979005ff?source=copy_link',
          label: 'Resume',
          position: 'right',
        },
        {
          href: 'https://www.figma.com/deck/lm0luFHjvmFkrk9ILnaKHZ/%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4?node-id=1-259&t=QONEdD7IQrzUUc2f-1',
          label: 'Portfolio',
          position: 'right',
        },
        {
          href: 'https://github.com/sanghyunbang',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://m.onestore.co.kr/v2/ko-kr/app/0001002340',
          label: 'App',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} SangHyun Bang`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
