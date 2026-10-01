export type Lang = 'ko' | 'en';
export const DEFAULT_LANG: Lang = 'ko';
export const LANGS: Lang[] = ['ko', 'en'];

/*
 * 이 파일은 UI 문구와 경로 헬퍼만 둔다.
 * 이력·학력·수상·포지셔닝·외부 링크 같은 사실은 src/data/profile.ts에만 적는다.
 */

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

/** hreflang용: 현재 페이지의 ko/en 경로 (끝 슬래시는 그대로 둔다) */
export function langPaths(url: URL): Record<Lang, string> {
  const p = url.pathname;
  const isEn = p === '/en' || p.startsWith('/en/');
  let bare = isEn ? p.slice(3) : p;
  if (!bare.startsWith('/')) bare = `/${bare}`;
  return { ko: bare, en: bare === '/' ? '/en/' : `/en${bare}` };
}

/** UI 문자열 사전 */
export const ui: Record<Lang, Record<string, string>> = {
  ko: {
    'nav.about': 'About',
    'nav.work': 'Work',
    'nav.blog': 'Blog',
    'nav.resume': 'Resume',
    'nav.pdf': 'PDF',
    'nav.pdf.title': '이력서 PDF (한국어)',
    'home.hey': '👋 안녕하세요, ',
    'home.cta.projects': '프로젝트 보기',
    'home.cta.about': 'About me',
    'home.work.label': 'Work',
    'home.work.title': '대표 프로젝트',
    'home.work.all': '전체 보기 →',
    'home.writing.label': 'Writing',
    'home.writing.title': '최근 글',
    'home.writing.all': '블로그 →',
    'home.links.label': 'Elsewhere',
    'home.links.title': '링크',
    'links.resume.desc': '경력 · 기술 스택 · 프로젝트 이력서',
    'links.pdf.title': 'Resume PDF',
    'links.pdf.desc': '이력서 PDF (A4, 한국어)',
    'links.github.desc': '코드 · 실험 프로젝트 · 저장소',
    'proj.detail.back': '← Projects',
    'proj.detail.more': '← 다른 프로젝트 보기',
    'proj.detail.role': 'Role',
    'proj.detail.period': 'Period',
    'proj.detail.roles': '역할 분담',
    'projects.eyebrow': 'Projects',
    'projects.title': '프로젝트',
    'projects.sub': '데이터와 상태가 어긋나는 지점을 찾아 구조로 풀어 간 작업들입니다.',
    'projects.other': '그 밖의 프로젝트',
    'projects.other.sub': '상세 페이지 없이 짧게 소개하는 프로젝트입니다.',
    'proj.viewmore': '자세히 보기',
    'award.badge': '수상',
    'about.eyebrow': 'About',
    'about.journey': '지금까지의 경력',
    'about.edu': '학력',
    'about.resumeHint.pre': '전체 경력·자격·수상은 ',
    'about.resumeHint.link': '이력서',
    'about.resumeHint.post': '에서 한눈에 볼 수 있습니다.',
    'about.connect': "Let's connect ☕",
    'about.connect.sub': '사용자와 데이터의 흐름을 이해하고, 안정적인 서비스를 함께 만들고 싶습니다.',
    'about.connect.cta': '이력서 보기',
    'resume.title': '이력서',
    'resume.print': '인쇄',
    'resume.pdf': 'PDF 받기',
    'resume.experience': '경력',
    'resume.projects': '프로젝트',
    'resume.otherProjects': '그 밖의 프로젝트',
    'resume.training': '교육',
    'resume.education': '학력',
    'resume.skills': '기술',
    'resume.certs': '자격 · 어학',
    'resume.languages': '어학',
    'resume.awards': '수상',
    'resume.awardLine': '수상',
    'resume.casestudy': '케이스 스터디',
    'blog.korean': '블로그 글은 한국어로 제공됩니다.',
    'notfound.title': '페이지를 찾을 수 없습니다',
    'notfound.sub': '주소가 바뀌었거나 없는 페이지입니다.',
    'notfound.home': '홈으로',
    'notfound.projects': '프로젝트 보기',
    'footer.rights': '',
  },
  en: {
    'nav.about': 'About',
    'nav.work': 'Work',
    'nav.blog': 'Blog',
    'nav.resume': 'Resume',
    'nav.pdf': 'PDF',
    'nav.pdf.title': 'Resume PDF (English)',
    'home.hey': "👋 Hey, I'm ",
    'home.cta.projects': 'View projects',
    'home.cta.about': 'About me',
    'home.work.label': 'Work',
    'home.work.title': 'Selected work',
    'home.work.all': 'View all →',
    'home.writing.label': 'Writing',
    'home.writing.title': 'Recent posts',
    'home.writing.all': 'Blog →',
    'home.links.label': 'Elsewhere',
    'home.links.title': 'Links',
    'links.resume.desc': 'Experience · stack · projects',
    'links.pdf.title': 'Resume PDF',
    'links.pdf.desc': 'Resume as a PDF (A4, English)',
    'links.github.desc': 'Code · experiments · repositories',
    'proj.detail.back': '← Projects',
    'proj.detail.more': '← Back to projects',
    'proj.detail.role': 'Role',
    'proj.detail.period': 'Period',
    'proj.detail.roles': 'Role breakdown',
    'projects.eyebrow': 'Projects',
    'projects.title': 'Projects',
    'projects.sub': 'Work where I looked for the points where data and state drift apart and addressed them structurally.',
    'projects.other': 'Other projects',
    'projects.other.sub': 'Shorter entries without a case-study page.',
    'proj.viewmore': 'View case study',
    'award.badge': 'Award',
    'about.eyebrow': 'About',
    'about.journey': 'My professional journey so far',
    'about.edu': 'Education',
    'about.resumeHint.pre': 'Full experience, certifications and awards are in my ',
    'about.resumeHint.link': 'resume',
    'about.resumeHint.post': '.',
    'about.connect': "Let's connect ☕",
    'about.connect.sub': 'I want to understand how users and data flow, and build reliable services together.',
    'about.connect.cta': 'View resume',
    'resume.title': 'Resume',
    'resume.print': 'Print',
    'resume.pdf': 'Download PDF',
    'resume.experience': 'Experience',
    'resume.projects': 'Projects',
    'resume.otherProjects': 'Other projects',
    'resume.training': 'Training',
    'resume.education': 'Education',
    'resume.skills': 'Skills',
    'resume.certs': 'Certifications',
    'resume.languages': 'Language',
    'resume.awards': 'Awards',
    'resume.awardLine': 'Award',
    'resume.casestudy': 'Case study',
    'blog.korean': 'Blog posts are written in Korean.',
    'notfound.title': 'Page not found',
    'notfound.sub': 'The address may have changed, or the page does not exist.',
    'notfound.home': 'Go home',
    'notfound.projects': 'View projects',
    'footer.rights': '',
  },
};

export function useT(lang: Lang) {
  return (key: string): string => ui[lang][key] ?? ui.ko[key] ?? key;
}
