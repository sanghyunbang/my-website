# SangHyun Bang — Personal Site

[Astro](https://astro.build) 기반 개인 사이트입니다(ko/en). 이력서, 프로젝트 케이스 스터디, 이력서 PDF를 담습니다.
배포: Netlify (`main` 브랜치, `npm run build` → `dist/`, Node 20).

## 스택

- **Astro 5** (정적 빌드) + **TypeScript**
- **Tailwind CSS 4** (`@tailwindcss/vite`) — 디자인 토큰과 인쇄 스타일은 `src/styles/global.css`
- **MDX** + **Content Collections** — 블로그/프로젝트 (`src/content.config.ts`)

## 구조

```
src/
├── data/profile.ts     # ★ 단일 정본: 경력·교육·학력·자격·어학·수상·스킬·이력서 프로젝트·포지셔닝·링크 (ko/en)
├── i18n.ts             # UI 문구와 경로 헬퍼만 (사실은 profile.ts에)
├── lib/content.ts      # 공개 글/프로젝트 조회 헬퍼 (draft·kind 필터)
├── content/
│   ├── blog/           # 블로그 글 (.md/.mdx) — draft: true면 어디에도 나오지 않음
│   └── projects/{ko,en}/  # kind: case(상세 페이지) | brief(“그 밖의 프로젝트” 짧은 항목)
├── components/         # Header, Footer, ProjectRow, ProjectBrief, Figure, Gallery, …
│   └── views/          # Home/About/Resume/Projects/ProjectDetail/NotFound (ko·en 공용)
├── layouts/            # BaseLayout(메타·OG·hreflang), PostLayout
└── pages/              # ko는 /, en은 /en/
public/
├── og/default.jpg      # 기본 og:image (1200×630)
├── favicon.ico, favicon-32x32.png, apple-touch-icon.png
├── img/avatar-512.webp
├── resume-ko.pdf, resume-en.pdf   # npm run pdf로 생성해 커밋
└── robots.txt
scripts/build-resume-pdf.mjs       # 이력서 PDF 빌드
```

## 개발

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # dist/ 로 정적 빌드
npm run preview   # 빌드 결과 미리보기
npm run pdf       # 빌드 → preview → 로컬 Chrome(없으면 Edge) headless로 /resume/, /en/resume/ 인쇄
                  #   → public/resume-ko.pdf, public/resume-en.pdf (커밋할 것. Netlify는 Chrome이 필요 없다)
```

브라우저 경로는 `CHROME_PATH` 환경 변수로 바꿀 수 있습니다.

## 콘텐츠 수정

- **경력·학력·자격·수상·스킬·포지셔닝·외부 링크**: `src/data/profile.ts`만 고칩니다. 날짜는 `'YYYY-MM'`으로 한 번만 쓰고 화면에는 `formatPeriod()`로 표시됩니다. 고친 뒤 `npm run pdf`로 PDF도 다시 만듭니다.
- **프로젝트**: `src/content/projects/{ko,en}/<slug>.md(x)`. ko와 en을 함께 추가합니다.
  - `kind: case`(기본) → `/projects/<slug>` 상세 페이지, `featured: true`면 홈에 노출, `order`로 정렬.
  - `kind: brief` → 상세 페이지 없이 `/projects` 하단 “그 밖의 프로젝트”에 한 단락으로.
  - `award`는 `profile.ts`의 수상 id(예: `tour-data-2025`)를 씁니다. 명칭과 날짜는 profile에서 가져옵니다.
  - `cover`: `public/img/projects/<slug>/cover.webp` 같은 public 절대경로(16:9 권장). 카드·상세 히어로에 쓰입니다. `coverWidth`·`coverHeight`에 실제 픽셀 크기를 적습니다(img width/height 속성).
  - `ogImage`: 공유 미리보기용 1200×630 JPEG(`public/img/projects/<slug>/og.jpg`). 없으면 `cover`가 og:image가 됩니다.
  - 본문 이미지(.mdx): `Figure`(한 장), `Gallery`(세로 폰 스크린샷 여러 장). 둘 다 `alt`와 `width`·`height`를 적고, 지연 로딩됩니다(상세 히어로 cover만 즉시 로딩).
  - 이미지 출처는 본인 스토어 그래픽, 본인 앱 캡처, 본인이 그린 구조도, 팀 발표 자료 중 본인 담당 장(캡션에 "팀 발표 자료 중 본인 담당 영역" 표기)만 씁니다. 팀원 실명·연락처·인프라 식별자가 보이는 장은 쓰지 않습니다.
- **블로그**: `src/content/blog/`. `draft: true`면 목록·홈·사이트맵·상세 페이지 모두에서 빠지고, 공개 글이 0편이면 헤더의 Blog 메뉴도 숨겨집니다.
