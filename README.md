# SangHyun Bang — Personal Site

[Astro](https://astro.build) 기반의 개인 사이트 & 블로그입니다. 이력서·포트폴리오·프로젝트 링크와, velog에서 옮겨오는 개발 글을 담습니다.

## 스택

- **Astro 5** (정적 빌드) + **TypeScript**
- **Tailwind CSS 4** (`@tailwindcss/vite`) — 디자인 토큰은 `src/styles/global.css`
- **MDX** + **Content Collections** — 블로그/프로젝트 (`src/content.config.ts`)

## 구조

```
src/
├── content/
│   ├── blog/        # 블로그 글 (.md/.mdx) — velog 재호스팅 포함
│   └── projects/    # 프로젝트 (.md)
├── content.config.ts
├── components/      # Header, Footer, LinkCard, ProjectCard, PostCard
├── layouts/         # BaseLayout, PostLayout
├── pages/           # index, about, projects/, blog/
└── styles/global.css
public/img/          # 정적 이미지 (cat_profile.png, favicon.png)
```

## 개발

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # dist/ 로 정적 빌드
npm run preview   # 빌드 결과 미리보기
```

## 콘텐츠 추가

- **블로그 글**: `src/content/blog/`에 `.md`/`.mdx` 추가. frontmatter에 `title`, `description`, `date`, 그리고 시리즈면 `series`·`seriesOrder`, velog 원문이 있으면 `canonicalUrl`을 넣으면 시리즈별로 그룹핑되고 원문 링크가 표시됩니다.
- **프로젝트**: `src/content/projects/`에 `.md` 추가. `featured: true`면 홈 대표 프로젝트에 노출, `order`로 정렬.

## 배포

`astro.config.mjs`의 `site`는 `https://betterworldwithlucas.com` 으로 설정되어 있습니다. `npm run build` 결과(`dist/`)를 정적 호스팅에 올리면 됩니다. (GitHub Pages 사용 시 Actions 워크플로로 `dist/`를 배포하도록 구성하세요.)
