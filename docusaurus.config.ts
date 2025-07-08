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

  // Preset 설정 : "classic" 프리셋 -> 세부적으로 docs, blog, theme 설정정
  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs', // 문서파일은 docs/폴더에 있음음
          sidebarPath: require.resolve('./sidebars.ts'), // 사이드 바 설정은 sidebar.ts에서 설정
          editUrl: 'https://github.com/sanghyunbang/my-website/tree/main/', // Edit This Page 클릭 시 이동할 주소
        },
        blog: {
          path: 'blog', // 블로그 파일이 있는곳 : blog/ 폴더 안에 있다는 의미미
          routeBasePath: 'blog', // /blog 주소로 접근
          showReadingTime: true, // 블로그 읽는 시간 표시
          blogSidebarTitle: 'All Posts', // 사이드 바에 모든 포스트를 보여줌줌
          blogSidebarCount: 'ALL',
          include: ['**/*.md', '**/*.mdx'],
          editUrl: 'https://github.com/sanghyunbang/my-website/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'), // 커스텀 css 파일 -> 디자인 변경 가능능
        },
      } satisfies Preset.Options,
    ],
  ],

  // 테마 및 레이아웃 설정
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg', // 공유할 때 보여질 이미지

    // 상단 메뉴 바에 표시될 내용
    navbar: {
      title: "Lucas S. Bang",
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.png',
      },

      // 왼쪽: AboutMe, Projects, Blog 등 <-> 오른쪽: GitHub 링크
      items: [
        { to: '/docs/AboutMe/intro', label: 'About Me', position: 'left' },
        { to: '/docs/Projects/intro', label: 'Projects', position: 'left' },
        { to: '/docs/TechNotes/intro', label: 'Notes', position: 'left' },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/sanghyunbang/my-website',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    // 하단 footer 설정
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
