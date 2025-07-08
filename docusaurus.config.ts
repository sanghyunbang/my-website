// 코드 블록에 사용할 색상 테마(Prism.js 테마)를 지정.
import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: "Lucas S. Bang's",
  tagline: 'Humble Beginnings, Bold Futures!',
  favicon: 'img/favicon.png',

  url: 'https://betterworldwithlucas.com',
  baseUrl: '/',

  // GitHub 저장소 경로 설정에 사용
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
        docs: {
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.ts'),
          editUrl: 'https://github.com/sanghyunbang/my-website/tree/main/',
        },
        blog: {
          path: 'blog',
          routeBasePath: 'blog',
          showReadingTime: true,
          blogSidebarTitle: 'All Posts',
          blogSidebarCount: 'ALL',
          include: ['**/*.md', '**/*.mdx'],
          editUrl: 'https://github.com/sanghyunbang/my-website/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: "Lucas S. Bang",
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.png',
      },
      items: [
        { to: '/docs/AboutMe/intro', label: 'About Me', position: 'left' },
        { to: '/docs/Projects/intro', label: 'Projects', position: 'left' },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/sanghyunbang/my-website',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Projects',
              to: '/docs/Projects/intro',
            },
            {
              label: 'About Me',
              to: '/docs/AboutMe/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/sanghyunbang/my-website',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Lucas S. Bang. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
