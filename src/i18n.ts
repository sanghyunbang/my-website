export type Lang = 'ko' | 'en';
export const DEFAULT_LANG: Lang = 'ko';
export const LANGS: Lang[] = ['ko', 'en'];

/** 현재 URL에서 언어 판별 */
export function getLang(url: URL): Lang {
  const seg = url.pathname.split('/')[1];
  return seg === 'en' ? 'en' : 'ko';
}

/** ko 경로를 현재 언어 경로로 변환 ('/about' → '/en/about') */
export function localize(path: string, lang: Lang): string {
  if (lang === 'ko') return path;
  if (path === '/') return '/en';
  return `/en${path}`;
}

/** 언어 토글용: 같은 페이지의 다른 언어 경로 (블로그는 en 없음 → /en 홈으로) */
export function altLangPath(url: URL, target: Lang): string {
  let p = url.pathname.replace(/\/$/, '') || '/';
  const isEn = p === '/en' || p.startsWith('/en/');
  const bare = isEn ? p.replace(/^\/en/, '') || '/' : p;
  if (target === 'ko') return bare;
  // en으로 갈 때: 블로그는 영문판이 없으므로 홈으로
  if (bare.startsWith('/blog')) return '/en';
  return bare === '/' ? '/en' : `/en${bare}`;
}

/** UI 문자열 사전 */
export const ui: Record<Lang, Record<string, string>> = {
  ko: {
    'nav.about': 'About',
    'nav.work': 'Work',
    'nav.blog': 'Blog',
    'nav.resume': 'Resume',
    'home.hey': "👋 안녕하세요, ",
    'home.role': 'Spring 백엔드부터 Flutter 앱까지, 제품이 되는 소프트웨어를 만듭니다',
    'home.based': 'Seoul, KR 기반',
    'home.cta.projects': '프로젝트 보기',
    'home.cta.about': 'About me',
    'home.open': '함께 일할 곳을 찾고 있어요',
    'home.work.label': '01 — Work',
    'home.work.title': '대표 프로젝트',
    'home.work.all': '전체 보기 →',
    'home.writing.label': '02 — Writing',
    'home.writing.title': '최근 글',
    'home.writing.all': '블로그 →',
    'home.links.label': '03 — Elsewhere',
    'home.links.title': '링크',
    'proj.detail.back': '← Projects',
    'proj.detail.more': '← 다른 프로젝트 보기',
    'proj.detail.role': 'Role',
    'proj.detail.period': 'Period',
    'proj.detail.roles': '역할 분담',
    'projects.eyebrow': 'Projects',
    'projects.title': '프로젝트',
    'projects.sub': '기능 구현에서 끝나지 않고, 성능·구조·장애의 근본 원인까지 파고든 작업들입니다.',
    'proj.viewmore': '자세히 보기',
    'about.eyebrow': 'About',
    'about.title': '서비스를 만들고 운영하는 소프트웨어 엔지니어',
    'about.journey': 'My professional journey so far',
    'about.edu': '학력',
    'about.resumeHint.pre': '전체 경력·자격·수상은 ',
    'about.resumeHint.link': '이력서',
    'about.resumeHint.post': '에서 한눈에 볼 수 있습니다.',
    'about.connect': "Let's connect ☕",
    'about.connect.sub': '사용자와 데이터의 흐름을 이해하고, 안정적인 서비스를 함께 만들고 싶습니다. 편하게 연락 주세요.',
    'about.connect.cta': '이력서 보기',
    'resume.print': '인쇄 / PDF로 저장',
    'resume.summary': '구현 이후의 동작과 구조까지 확인하는 소프트웨어 엔지니어. Spring 백엔드부터 Flutter 앱까지 직접 만들고, 실제 SQL·실행 계획·로그를 읽어 병목과 구조적 결함을 개선합니다. 경영·경제 배경과 데이터 분석 경험으로 비즈니스·데이터 흐름을 함께 고려합니다.',
    'blog.korean': '블로그 글은 한국어로 제공됩니다.',
    'footer.rights': '',
  },
  en: {
    'nav.about': 'About',
    'nav.work': 'Work',
    'nav.blog': 'Blog',
    'nav.resume': 'Resume',
    'home.hey': "👋 Hey, I'm ",
    'home.role': 'From Spring backends to Flutter apps — I build software that ships as a product',
    'home.based': 'Based in Seoul, KR',
    'home.cta.projects': 'View projects',
    'home.cta.about': 'About me',
    'home.open': 'Open to work',
    'home.work.label': '01 — Work',
    'home.work.title': 'Selected work',
    'home.work.all': 'View all →',
    'home.writing.label': '02 — Writing',
    'home.writing.title': 'Recent posts',
    'home.writing.all': 'Blog →',
    'home.links.label': '03 — Elsewhere',
    'home.links.title': 'Links',
    'proj.detail.back': '← Projects',
    'proj.detail.more': '← Back to projects',
    'proj.detail.role': 'Role',
    'proj.detail.period': 'Period',
    'proj.detail.roles': 'Role breakdown',
    'projects.eyebrow': 'Projects',
    'projects.title': 'Projects',
    'projects.sub': "Work where I didn't stop at 'it runs' — digging into performance, structure, and the root cause of failures.",
    'proj.viewmore': 'View case study',
    'about.eyebrow': 'About',
    'about.title': 'A software engineer who builds and operates services',
    'about.journey': 'My professional journey so far',
    'about.edu': 'Education',
    'about.resumeHint.pre': 'Full experience, certifications and awards are in my ',
    'about.resumeHint.link': 'resume',
    'about.resumeHint.post': '.',
    'about.connect': "Let's connect ☕",
    'about.connect.sub': "I want to understand how users and data flow, and build reliable services together. Feel free to reach out.",
    'about.connect.cta': 'View resume',
    'resume.print': 'Print / Save as PDF',
    'resume.summary': 'A software engineer who checks not just that code runs, but how and why it runs. I build from Spring backends to Flutter apps, and read real SQL, query plans and logs to fix bottlenecks and structural flaws. My business/economics background and data experience help me consider business and data flow together.',
    'blog.korean': 'Blog posts are written in Korean.',
    'footer.rights': '',
  },
};

export function useT(lang: Lang) {
  return (key: string): string => ui[lang][key] ?? ui.ko[key] ?? key;
}
