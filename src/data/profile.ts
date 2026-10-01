/**
 * 사이트의 단일 정본(single source of truth).
 *
 * 이력·교육·학력·자격·어학·수상·스킬·이력서 프로젝트·포지셔닝·링크를 이 파일에만 적는다.
 * Resume / About / Home / BaseLayout / 프로젝트 상세(award id)는 모두 여기서 읽는다.
 *
 * 규칙
 * - 날짜는 'YYYY-MM' 또는 'YYYY-MM-DD'로 한 번만 적고, 표시는 formatDate / formatPeriod로 한다.
 * - 모든 문구는 ko/en을 함께 적는다(L10n). 영문 표기를 모르는 고유명사는 한국어 그대로 둔다(예: 레이시스).
 * - 근거: FACT SHEET(증명서 확인, 2026-10-01), 제출 PDF(2026-09-30),
 *   _site-refresh/site-audit.md, _site-refresh/project-briefs.md, _review/14-reviewer-audit.md.
 *   근거 문서보다 부풀린 문장을 넣지 않는다.
 * - 개인 연락처·생년월일·주소, 팀원 실명, 사업자 정보는 넣지 않는다.
 */
import type { Lang } from '../i18n';

export type L10n = Record<Lang, string>;
export type L10nList = Record<Lang, string[]>;
/** 'YYYY-MM' 또는 'YYYY-MM-DD' */
export type DateStr = string;
/** 날짜, 'present'(현재 진행), 'open'(끝 없이 열어 둠: "2023.09 –") */
export type PeriodEnd = DateStr | 'present' | 'open';

/* ───────────────────────── helpers ───────────────────────── */

const DATE_RE = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/;

/** '2026-07' → '2026.07', '2025-11-29' → '2025.11.29' */
export function formatDate(d: DateStr, _lang: Lang = 'ko'): string {
  const m = DATE_RE.exec(d);
  if (!m) throw new Error(`[profile] invalid date: ${d}`);
  return m[3] ? `${m[1]}.${m[2]}.${m[3]}` : `${m[1]}.${m[2]}`;
}

/** formatPeriod('2026-07', 'present', 'ko') → '2026.07 – 현재' */
export function formatPeriod(start: DateStr, end: PeriodEnd, lang: Lang): string {
  const s = formatDate(start, lang);
  if (end === 'open') return `${s} –`;
  if (end === 'present') return `${s} – ${lang === 'ko' ? '현재' : 'present'}`;
  return `${s} – ${formatDate(end, lang)}`;
}

/* ───────────────────────── person / site ───────────────────────── */

export const site = {
  url: 'https://betterworldwithlucas.com',
  host: 'betterworldwithlucas.com',
  /** og:image 기본값 (1200×630). 영문 페이지는 영문 문구판을 쓴다 */
  ogImage: { ko: '/og/default.jpg', en: '/og/default-en.jpg' } satisfies L10n,
} as const;

export const person = {
  name: { ko: '방상현', en: 'SangHyun Bang' } satisfies L10n,
  latinName: 'SangHyun Bang',
  koreanName: '방상현',
  firstName: 'SangHyun',
  brand: 'SANGHYUN',
  location: { ko: 'Seoul, KR 기반', en: 'Based in Seoul, KR' } satisfies L10n,
  avatar: {
    src: '/img/avatar-512.webp',
    width: 512,
    height: 512,
    alt: 'SangHyun Bang',
  },
} as const;

/* ───────────────────────── positioning ───────────────────────── */

const ROLE: L10n = {
  ko: 'Java · Spring Boot 백엔드 개발자',
  en: 'Java · Spring Boot Backend Developer',
};
const HEADLINE: L10n = {
  ko: '데이터와 상태가 어긋나는 지점을 찾아, 구조로 막고 테스트로 고정합니다.',
  en: 'I find where data and state drift apart, block it with structure, and pin it down with tests.',
};

export const positioning = {
  /** 제출 PDF 1쪽 */
  role: ROLE,
  /** 제출 PDF 1쪽 헤드라인 */
  headline: HEADLINE,
  /** 홈 히어로의 큰 장식 문구 */
  heroWords: { top: 'backend', script: 'developer' },
  /**
   * 홈 상태 배지. null이면 렌더하지 않는다.
   * 레이시스 재직 중이라 구직 상태 문구는 내렸다. 문구가 정해지면 { ko, en }을 넣는다.
   */
  statusBadge: null as L10n | null,
  /** 이력서 상단 요약 */
  summary: {
    ko: `${HEADLINE.ko} 실제 SQL·실행 계획·로그를 읽어 병목과 구조적 결함을 고치고, 테스트가 초록인지보다 무엇을 실제로 확인하는지를 따집니다. 경영·경제 배경과 데이터 분석 경험으로 비즈니스·데이터 흐름을 함께 고려합니다.`,
    en: `${HEADLINE.en} I read real SQL, query plans and logs to fix bottlenecks and structural flaws, and I check what a test actually verifies rather than trusting a green run. My business/economics background and data-analysis experience help me consider business and data flow together.`,
  } satisfies L10n,
  /** About 소개 문단 */
  intro: {
    ko: [
      'Java · Spring Boot로 서비스를 만들며, 동시에 온 요청이 같은 번호를 받는 문제, 권한이 바뀌었는데 이미 발급된 토큰은 그대로인 문제, 이벤트가 사라져 서비스 사이 데이터가 어긋나는 문제처럼 "기능은 동작하는데 데이터가 틀리는" 지점을 주로 다뤄 왔습니다. 개인 프로젝트는 AI 코딩 에이전트와 함께 만들었기 때문에, "통과했다"는 보고보다 테스트가 실제로 무엇을 확인하는지를 먼저 봅니다.',
      '경영학·경제학을 먼저 전공했고, 데이터 분석과 강화학습 연구 보조를 경험했습니다.',
    ],
    en: [
      'I build services with Java and Spring Boot, and most of my work has been on spots where “the feature works but the data is wrong” — concurrent requests getting the same sequence number, permissions that changed while already-issued tokens stayed the same, events that went missing and left services out of sync. I built my personal projects together with AI coding agents, so I look at what a test actually verifies before trusting a “passed” report.',
      'I studied business administration and economics first, and have experience in data analysis and in assisting reinforcement-learning research.',
    ],
  } satisfies L10nList,
  /**
   * About 이미지 hover 키워드. 빈 배열이면 렌더하지 않는다.
   * 자기 규정 해시태그(#구조적사고, #계속만든다 등)는 어투 기준에 맞지 않아 비웠다.
   * 다시 넣는다면 사이트에 이미 있는 사실(기술 이름 등)만 쓴다.
   */
  keywords: {
    ko: [],
    en: [],
  } as L10nList,
  /** 페이지별 meta description */
  meta: {
    home: {
      ko: `방상현(SangHyun Bang) — ${ROLE.ko}. ${HEADLINE.ko}`,
      en: `SangHyun Bang — ${ROLE.en}. ${HEADLINE.en}`,
    },
    about: {
      ko: `방상현(SangHyun Bang) 소개 — ${ROLE.ko}의 경력, 교육, 학력.`,
      en: `About SangHyun Bang, ${ROLE.en} — experience, training and education.`,
    },
    resume: {
      ko: `방상현(SangHyun Bang) 이력서 — ${ROLE.ko}. 경력, 프로젝트, 교육, 학력, 자격, 수상.`,
      en: `Resume of SangHyun Bang, ${ROLE.en} — experience, projects, training, education, certifications and awards.`,
    },
  } satisfies Record<string, L10n>,
};

/* ───────────────────────── links ───────────────────────── */

export type AppId = 'pawloop' | 'heat-trip';

export interface StoreApp {
  id: AppId;
  name: L10n;
  store: L10n;
  href: string;
  /** 스토어에 표시된 버전과 그 시점(FACT SHEET). 사용자 수·다운로드·평점은 주장하지 않는다. */
  version: string;
  versionDate: DateStr;
  /** 연결되는 프로젝트 slug (src/content/projects/{lang}/<slug>) */
  project: string;
  /**
   * 링크 라벨 뒤 괄호에 붙는 상태 (예: 등록 기록 · 현재 서버 운영 종료).
   * 프로젝트 상세 링크와 이력서(PDF) 링크가 같은 문구를 쓴다.
   */
  status?: L10n;
}

const apps: StoreApp[] = [
  {
    id: 'pawloop',
    name: { ko: '포루프 (Pawloop)', en: 'Pawloop' },
    store: { ko: '원스토어', en: 'ONE store' },
    href: 'https://m.onestore.co.kr/v2/ko-kr/app/0001009354',
    version: '2.0.0',
    versionDate: '2026-09',
    project: 'pawloop',
  },
  {
    id: 'heat-trip',
    name: { ko: 'Heat Trip', en: 'Heat Trip' },
    store: { ko: '원스토어', en: 'ONE store' },
    href: 'https://m.onestore.co.kr/v2/ko-kr/app/0001002340',
    version: '1.0.0',
    versionDate: '2025-09',
    project: 'heat-trip',
    // 리스팅은 남아 있지만 운영 API가 내려가 있다(2026-10-01 HTTP 530). 지금 받아도 앱이 동작하지 않는다.
    status: { ko: '등록 기록 · 현재 서버 운영 종료', en: 'listing record · server no longer running' },
  },
];

export const links = {
  github: {
    href: 'https://github.com/sanghyunbang',
    label: 'GitHub',
    display: 'github.com/sanghyunbang',
  },
  site: { href: site.url, display: site.host },
  /** scripts/build-resume-pdf.mjs가 /resume, /en/resume을 인쇄해 만든다 */
  resumePdf: { ko: '/resume-ko.pdf', en: '/resume-en.pdf' } satisfies L10n,
  apps,
};

export function getApp(id: AppId): StoreApp {
  const a = links.apps.find((x) => x.id === id);
  if (!a) throw new Error(`[profile] unknown app: ${id}`);
  return a;
}

/** ' (등록 기록 · 현재 서버 운영 종료)' — status가 없으면 빈 문자열 */
export function appStatusSuffix(a: StoreApp, lang: Lang): string {
  return a.status ? ` (${a.status[lang]})` : '';
}

/** 프로젝트 slug에 연결된 스토어 링크 (프로젝트 상세에서 frontmatter links 뒤에 붙인다) */
export function storeLinksFor(slug: string, lang: Lang): { label: string; href: string }[] {
  return links.apps
    .filter((a) => a.project === slug)
    .map((a) => ({ label: `${a.store[lang]} — ${a.name[lang]}${appStatusSuffix(a, lang)}`, href: a.href }));
}

/* ───────────────────────── experience ───────────────────────── */

export interface ExperienceItem {
  id: string;
  org: L10n;
  role: L10n;
  start: DateStr;
  end: PeriodEnd;
  bullets: L10nList;
  /** About 여정 카드 한 줄 설명 */
  blurb: L10n;
}

export const experience: ExperienceItem[] = [
  {
    id: 'raysis',
    // 영문 법인 표기 미확인 → en에서도 한국어 그대로
    org: { ko: '레이시스', en: '레이시스' },
    role: { ko: '백엔드 개발자', en: 'Backend Developer' },
    start: '2026-07',
    end: 'present',
    bullets: {
      ko: ['ERP 회계 모듈 · Node.js, MariaDB'],
      en: ['ERP accounting module · Node.js, MariaDB'],
    },
    blurb: {
      ko: '백엔드 개발자 · ERP 회계 모듈 · Node.js, MariaDB',
      en: 'Backend Developer · ERP accounting module · Node.js, MariaDB',
    },
  },
  {
    id: 'cau-iacf',
    org: { ko: '중앙대학교 산학협력단', en: 'Chung-Ang Univ. Industry-Academic Cooperation Foundation' },
    role: { ko: '학생연구원', en: 'Student Researcher' },
    start: '2023-09',
    end: '2024-08',
    bullets: {
      ko: [
        'Multi-Armed Bandit / 강화학습 연구 보조 — 이론 분석, 실험 정리, 연구과제 수행 지원',
      ],
      en: [
        'Assisted Multi-Armed Bandit / reinforcement-learning research — theory analysis, experiment organization, project support',
      ],
    },
    blurb: {
      ko: '학생연구원 · Multi-Armed Bandit / 강화학습 연구 보조',
      en: 'Student Researcher · Multi-Armed Bandit / RL research',
    },
  },
  {
    id: 'cau-intern',
    org: { ko: '중앙대학교', en: 'Chung-Ang University' },
    role: { ko: '연구 인턴', en: 'Research Intern' },
    start: '2023-01',
    end: '2023-08',
    bullets: {
      ko: ['Bandit Algorithm / Reinforcement Learning 연구 인턴'],
      en: ['Bandit Algorithm / Reinforcement Learning research intern'],
    },
    blurb: {
      ko: '연구 인턴 · Bandit Algorithm / 강화학습',
      en: 'Research Intern · Bandit algorithms / RL',
    },
  },
  {
    id: 'daol',
    org: { ko: '다올투자증권㈜', en: 'Daol Investment & Securities' },
    role: { ko: '경영기획 인턴', en: 'Management Planning Intern' },
    start: '2022-01',
    end: '2022-02',
    bullets: {
      ko: ['경영기획 업무 지원 — 비즈니스·데이터가 의사결정으로 이어지는 흐름을 경험'],
      en: ['Supported management-planning work — experienced how business and data connect to decisions'],
    },
    blurb: {
      ko: '경영기획 인턴',
      en: 'Management Planning Intern',
    },
  },
];

/* ───────────────────────── training ───────────────────────── */

export interface TrainingItem {
  id: string;
  name: L10n;
  detail: L10n;
  start: DateStr;
  end: PeriodEnd;
  /** 연결된 케이스 스터디 slug */
  project?: string;
  /** 연결된 수상 */
  award?: AwardId;
}

export const training: TrainingItem[] = [
  {
    id: 'devcourse',
    name: {
      ko: '프로그래머스 데브코스 · MSA 기반 Spring AI 심화 캠프',
      en: 'Programmers Dev Course · MSA Spring AI Intensive',
    },
    detail: {
      ko: 'Spring Cloud · MSA 백엔드 — BARO FARM(인증·인가 담당)',
      en: 'Spring Cloud · MSA backend — BARO FARM (auth boundary)',
    },
    start: '2025-11',
    end: '2026-01',
    project: 'baro-farm',
  },
  {
    id: 'kdt',
    name: {
      ko: '강남 하이미디어 · KDT 풀스택 캠프',
      en: 'Gangnam HiMedia · KDT Full-stack Bootcamp',
    },
    detail: {
      ko: 'Spring · React 풀스택 — 졸업 프로젝트 우수상 (오름 · 등산 커뮤니티)',
      en: 'Spring · React full-stack — Excellence Award for the graduation project (OREUM, hiking community)',
    },
    start: '2025-01',
    end: '2025-07',
    award: 'kdt-2025',
    project: 'oreum',
  },
];

/* ───────────────────────── education ───────────────────────── */

export interface EducationItem {
  id: string;
  school: L10n;
  program: L10n;
  start: DateStr;
  end: PeriodEnd;
  gpa?: string;
  honors?: L10n;
  status?: L10n;
  /** 학위 수여 시점 */
  conferred?: DateStr;
}

export const education: EducationItem[] = [
  {
    id: 'cbs',
    school: { ko: '학점은행제 (4년제)', en: 'Academic Credit Bank System' },
    program: { ko: '컴퓨터공학 전공 공학사', en: 'B.Eng. in Computer Engineering' },
    start: '2025-07',
    end: '2026-08',
    gpa: '4.05 / 4.5',
    conferred: '2026-08',
  },
  {
    id: 'sogang',
    school: { ko: '서강대학교', en: 'Sogang University' },
    program: {
      ko: '경영학·경제학 복수전공',
      en: 'Business Administration & Economics, double major',
    },
    start: '2015-03',
    end: '2023-02',
    gpa: '3.75 / 4.3',
    honors: { ko: '최우수 졸업(Summa Cum Laude)', en: 'Summa Cum Laude' },
  },
  {
    id: 'cau-grad',
    school: { ko: '중앙대학교 대학원', en: 'Chung-Ang University Graduate School' },
    program: { ko: 'AI학과 석사과정', en: 'M.S. program in Artificial Intelligence' },
    start: '2023-09',
    end: 'open',
    status: { ko: '휴학 중', en: 'on leave' },
  },
];

/** 이력서용 한 줄: 전공·학위 · 우등 · 학점 · 수여/상태 */
export function educationDetail(e: EducationItem, lang: Lang): string {
  const parts = [e.program[lang]];
  if (e.honors) parts.push(e.honors[lang]);
  if (e.gpa) parts.push(e.gpa);
  if (e.conferred)
    parts.push(lang === 'ko' ? `${formatDate(e.conferred)} 학위 수여` : `conferred ${formatDate(e.conferred)}`);
  if (e.status) parts.push(e.status[lang]);
  return parts.join(' · ');
}

/** About용 짧은 줄: 학교 · 전공 (우등/상태) */
export function educationShort(e: EducationItem, lang: Lang): string {
  const note = e.status?.[lang] ?? (e.honors ? (lang === 'ko' ? '최우수 졸업' : 'Summa Cum Laude') : '');
  return `${e.school[lang]} · ${e.program[lang]}${note ? ` (${note})` : ''}`;
}

/* ───────────────────────── certifications / languages ───────────────────────── */

export interface CertItem {
  id: string;
  name: L10n;
  date: DateStr;
}

export const certs: CertItem[] = [
  { id: 'eip', name: { ko: '정보처리기사', en: 'Engineer Information Processing' }, date: '2026-06' },
  { id: 'sqld', name: { ko: 'SQL개발자 SQLD', en: 'SQL Developer (SQLD)' }, date: '2026-06' },
  { id: 'adsp', name: { ko: 'ADsP (데이터분석 준전문가)', en: 'ADsP — Data Analysis Semi-Professional' }, date: '2022-09' },
  { id: 'cim', name: { ko: '투자자산운용사', en: 'Certified Investment Manager' }, date: '2022-12' },
];

export interface LanguageItem {
  id: string;
  name: string;
  score: string;
  date: DateStr;
}

export const languages: LanguageItem[] = [
  { id: 'ielts', name: 'IELTS', score: '7.0', date: '2024-12' },
  { id: 'opic', name: 'OPIc', score: 'IH', date: '2026-03' },
];

/* ───────────────────────── awards ───────────────────────── */

export const AWARD_IDS = ['tour-data-2025', 'kdt-2025', 'db-fec-2023', 'bok-2022'] as const;
export type AwardId = (typeof AWARD_IDS)[number];

export interface AwardItem {
  id: AwardId;
  /** 전체 명칭 (이력서 한 줄) */
  title: L10n;
  /** 상 이름만 (예: 우수상) */
  prize: L10n;
  /** 대회 이름만 */
  event: L10n;
  issuer?: L10n;
  /** 상장 일자 기준 */
  date: DateStr;
  /** 출품작 */
  work?: L10n;
  /** 출품작 케이스 스터디 slug */
  project?: string;
  /** 대회 진행 기간 (About 여정에 사용) */
  contest?: { start: DateStr; end: PeriodEnd };
}

export const awards: AwardItem[] = [
  {
    id: 'tour-data-2025',
    title: {
      ko: '2025 관광데이터 활용 공모전 우수상',
      en: 'Excellence Award, 2025 Tourism Data Utilization Competition',
    },
    prize: { ko: '우수상', en: 'Excellence Award' },
    event: { ko: '2025 관광데이터 활용 공모전', en: '2025 Tourism Data Utilization Competition' },
    issuer: { ko: '한국관광공사', en: 'Korea Tourism Organization' },
    date: '2025-11', // 상장 일자 2025.11.20 기준 (제출 PDF의 월 표기와 다름)
    work: { ko: 'HeatTrip', en: 'HeatTrip' },
    project: 'heat-trip',
    contest: { start: '2025-07', end: '2025-11' },
  },
  {
    id: 'kdt-2025',
    title: {
      ko: 'KDT 풀스택 캠프 졸업 프로젝트 우수상',
      en: 'Excellence Award, KDT Full-stack Bootcamp graduation project',
    },
    prize: { ko: '우수상', en: 'Excellence Award' },
    event: { ko: 'KDT 풀스택 캠프 졸업 프로젝트', en: 'KDT Full-stack Bootcamp graduation project' },
    issuer: { ko: '강남 하이미디어', en: 'Gangnam HiMedia' },
    date: '2025-07',
    work: { ko: '오름', en: 'OREUM' },
    project: 'oreum',
  },
  {
    id: 'db-fec-2023',
    title: { ko: '제13회 DB FEC 가작', en: 'Honorable Mention, 13th DB FEC' },
    prize: { ko: '가작', en: 'Honorable Mention' },
    event: { ko: '제13회 DB FEC', en: '13th DB FEC' },
    issuer: { ko: 'DB김준기문화재단', en: 'DB Kim Jun-ki Cultural Foundation' },
    date: '2023-05',
  },
  {
    id: 'bok-2022',
    title: {
      ko: '한국은행 통화정책 경시대회 예선 — 서울 상위 11개팀',
      en: 'Bank of Korea Monetary Policy Competition — preliminary round, top 11 teams in Seoul',
    },
    prize: { ko: '예선 서울 상위 11개팀', en: 'Top 11 teams in Seoul (preliminary round)' },
    event: { ko: '한국은행 통화정책 경시대회', en: 'Bank of Korea Monetary Policy Competition' },
    date: '2022-07',
  },
];

export function getAward(id: AwardId): AwardItem {
  const a = awards.find((x) => x.id === id);
  if (!a) throw new Error(`[profile] unknown award: ${id}`);
  return a;
}

/** '2025 관광데이터 활용 공모전 우수상 (한국관광공사, 2025.11)' */
export function formatAward(a: AwardItem, lang: Lang, opts: { work?: boolean } = {}): string {
  const meta = [a.issuer?.[lang], formatDate(a.date, lang)].filter(Boolean).join(', ');
  const work = opts.work && a.work ? ` — ${a.work[lang]}` : '';
  return `${a.title[lang]} (${meta})${work}`;
}

/* ───────────────────────── skills ───────────────────────── */

type SkillItem = string | L10n;

export const skills = {
  /** 홈 히어로 칩 */
  hero: ['Java', 'Spring Boot', 'JPA', 'MySQL', 'Testcontainers', 'Kafka', 'Redis'],
  /**
   * 이력서 Skills. 근거가 있는 것만 둔다.
   * - Node.js·MariaDB: 레이시스(현재 업무)
   * - Spring Modulith·Testcontainers·Terraform·Caddy·AWS EC2: Pawloop
   * - Kotlin: SCOUT 엔진, HeatTrip LLM 연동부 일부
   * - Android는 근거가 없어 뺐다.
   */
  groups: [
    {
      id: 'backend',
      label: { ko: 'Backend', en: 'Backend' },
      items: ['Java', 'Kotlin', 'Spring Boot', 'Spring Security', 'Spring Cloud Gateway', 'Spring Modulith', 'JPA / Hibernate', 'Node.js'],
    },
    {
      id: 'data',
      label: { ko: 'DB / Messaging', en: 'DB / Messaging' },
      items: ['MySQL', 'MariaDB', 'PostgreSQL', 'Redis', 'Kafka'],
    },
    {
      id: 'infra',
      label: { ko: 'Infra / Test', en: 'Infra / Test' },
      items: ['Docker Compose', 'Caddy', 'AWS (EC2 · S3 · CloudFront)', 'Terraform', 'OPA', 'Testcontainers', 'GitHub Actions'],
    },
    {
      id: 'ai',
      label: { ko: 'Data / AI', en: 'Data / AI' },
      items: ['Python', { ko: 'LLM 연동', en: 'LLM integration' }, 'Data Analysis', 'Reinforcement Learning'],
    },
    {
      id: 'etc',
      label: { ko: 'Mobile / Etc.', en: 'Mobile / Etc.' },
      items: ['Flutter', 'Git'],
    },
  ] as { id: string; label: L10n; items: SkillItem[] }[],
};

export function skillText(s: SkillItem, lang: Lang): string {
  return typeof s === 'string' ? s : s[lang];
}

/* ───────────────────────── resume projects ───────────────────────── */

export interface ResumeProject {
  id: string;
  /** 케이스 스터디가 있으면 slug */
  slug?: string;
  name: L10n;
  /** label은 기간 뒤 괄호로 붙는다. 이름과 겹치면(예: '1인 개발') 생략한다 */
  periods: { start: DateStr; end: PeriodEnd; label?: L10n }[];
  award?: AwardId;
  app?: AppId;
  /** 'full' = 불릿 목록, 'line' = 불릿 없이 요약 한 문단(같은 '프로젝트' 절, 별도 소제목 없음) */
  size: 'full' | 'line';
  bullets?: L10nList;
  summary?: L10n;
  note?: L10n;
  disclaimer?: L10n;
  /**
   * true면 이력서·PDF에서 뺀다(게시 보류). 본인 확인이 끝나면 지운다.
   * 수상 줄(awards)은 이 값과 상관없이 남는다.
   */
  hold?: boolean;
}

export const resumeProjects: ResumeProject[] = [
  {
    // 문장 근거: _site-refresh/refresh4/specs/pawloop.md §6, 팩트 시트 refresh4/facts/pawloop.md (GitHub main b0f89f6)
    // 쓰지 않는 것: "UPDATE와 SELECT 사이 끼어듦", "잠금 순서로 교착 회피", "통합 테스트 112", "되돌리면 실패",
    // App Store·iOS 출시, "처음부터 새로", 웹소켓 채팅, CI/CD·자동 배포, 운영 모니터링
    // 2번 불릿은 코드 사실만 쓴다(원스토어 빌드의 UPLOAD_LOCATION 값은 본인 기억 없음, 2026-10-01)
    id: 'pawloop',
    slug: 'pawloop',
    name: {
      ko: 'Pawloop (포루프) — 반려견 산책·가족 케어 앱 (1인 개발)',
      en: 'Pawloop — dog-walking & family-care app (solo)',
    },
    periods: [{ start: '2026-06', end: 'present' }],
    app: 'pawloop',
    size: 'full',
    note: { ko: '소스 비공개 · 요청 시 시연', en: 'Source is private · demo on request' },
    bullets: {
      ko: [
        '1인 개발 — 기획·설계 문서(ADR 23건), Flutter 앱, Spring Boot 서버, AWS 인프라(Terraform), 원스토어 출시(2026.09)·운영. 커밋 약 81%는 AI 코딩 에이전트와 함께 작성(트레일러 표기)',
        '좌표가 기기를 떠나는 9곳을 정책 하나(컴파일 타임 상수)로 모으고, 주변 장소는 전국 카탈로그를 받아 기기에서 거리 계산(위치기반서비스사업 신고 전)',
        '채팅은 가족·크루 공용 방 + HTTP 전송·ETag 폴링(3→30초), 방별 순번을 LAST_INSERT_ID(last_seq + 1)로 원자 발급하고 실제 MySQL 20스레드 테스트로 고정',
        'EC2 1대 운영(Caddy 단일 진입점, DB 데이터 EBS 분리, 설정 SSM, CI는 테스트·문서 드리프트, 배포 수동). 첫 운영 부팅의 Caddy 설정 오류 뒤 운영 이미지로 caddy validate를 실행하는 테스트로 교체 · 백엔드 테스트 1,994건 실패 0(2026-09-30)',
      ],
      en: [
        'Solo — planning and design docs (23 ADRs), Flutter app, Spring Boot server, AWS infrastructure (Terraform), ONE store release (2026.09) and operation; about 81% of commits written with an AI coding agent (marked by trailers)',
        'Gathered the nine places where coordinates can leave the device into one compile-time policy, and computed nearby places on the device from a nationwide catalog (no location-based service business filing has been made)',
        'Chat: shared rooms for family and crews, HTTP send with ETag polling (3→30 s), per-room sequence issued atomically with LAST_INSERT_ID(last_seq + 1) and pinned by a 20-thread test on real MySQL',
        'Single-EC2 production (Caddy as the only entry, DB data on separate EBS, config in SSM, CI runs tests and doc-drift checks, manual deploy). After a Caddy config error on first boot, replaced the string check with a test that runs caddy validate in the production image · 1,994 backend tests, 0 failures (2026-09-30)',
      ],
    },
  },
  {
    // 공개 범위: project-briefs.md §1 — 레포 링크·종목명·수치·호스팅 정보 없음
    id: 'scout',
    slug: 'scout',
    name: { ko: 'SCOUT', en: 'SCOUT' },
    periods: [{ start: '2026-05', end: 'present', label: { ko: '1인 개발 · 출시 전', en: 'solo · pre-launch' } }],
    size: 'line',
    summary: {
      ko: '공개 가치평가 방법론(DCF · 몬테카를로)으로 적정가치 범위를 계산하는 서비스(AI 코딩 에이전트와 함께 작성, 커밋 공저 표기). 순수 Kotlin 엔진 + Spring Boot API(PostgreSQL · Testcontainers) + Flutter 앱. 사업화를 준비 중인 비공개 프로젝트라 소스는 공개하지 않습니다.',
      en: 'A valuation service that estimates a fair-value range with public valuation methods (DCF · Monte Carlo), written with an AI coding agent (co-authorship marked in commits). Pure Kotlin engine + Spring Boot API (PostgreSQL · Testcontainers) + Flutter app. A private project being prepared as a business; the source is not public.',
    },
    disclaimer: { ko: '투자 자문이 아닙니다.', en: 'Not investment advice.' },
  },
  {
    // 문장 근거: _site-refresh/refresh4/specs/baro-farm.md §6, 팩트 시트 refresh4/facts/baro-farm.md (발표 시점 78eaa987).
    // 쓰지 않는 것: 403 사건 서사, "(이후 개인 리팩토링 2026.02–03)" 불릿(BF §J1·J11), Spring AI·SAGA·재고·K8s(§J12·J13)
    id: 'baro-farm',
    slug: 'baro-farm',
    name: {
      ko: 'BARO FARM — MSA 커머스 백엔드, 인증·인가 경계 (5인 팀)',
      en: 'BARO FARM — MSA commerce backend, auth boundary (team of 5)',
    },
    periods: [{ start: '2025-11-29', end: '2026-01-27', label: { ko: '팀 프로젝트', en: 'team project' } }],
    size: 'full',
    bullets: {
      ko: [
        '5인 팀 Spring Cloud MSA에서 인증·인가 경계 담당 — 회원·인증 서비스, Gateway 인증·인가 필터, OPA 정책·번들 서비스',
        'Gateway에서 쿠키 JWT를 검증해 사용자 헤더를 다시 쓰고, 인가는 OPA에 질의(서비스·역할별 경로 규칙). OPA 오류·지연 시 503으로 닫음(서킷브레이커·벌크헤드·2초)',
        '정지·탈퇴·판매자 승인을 Kafka hotlist 이벤트로 발행하고, 번들 서비스가 정책 번들을 다시 만들어 OPA가 10–60초 주기로 가져가도록 설계·구현. 같은 토픽으로 판매자 서비스 상태 동기화',
        'HttpOnly·Secure·SameSite=Strict 쿠키, 리프레시 토큰 회전·폐기, 카카오·네이버 OAuth 계정 연결, 회원탈퇴 outbox(같은 트랜잭션 적재, 5회 실패 시 FAILED)',
      ],
      en: [
        'Owned the auth boundary of a five-person Spring Cloud MSA — member/auth service, gateway auth filters, OPA policy and bundle service',
        'Gateway validates the cookie JWT and rewrites user headers; authorization is an OPA query over per-service, per-role path rules, failing closed with 503 on OPA errors or delay (circuit breaker, bulkhead, 2 s)',
        'Designed and built the path that publishes suspensions, withdrawals and seller approvals as Kafka hotlist events; a bundle service rebuilds the policy bundle and OPA pulls it every 10–60 s; the seller service syncs from the same topic',
        'HttpOnly/Secure/SameSite=Strict cookies, refresh-token rotation and revocation, Kakao/Naver OAuth account linking, a withdrawal outbox (written in the same transaction, FAILED after 5 attempts)',
      ],
    },
  },
  {
    // 상세 페이지: src/content/projects/{ko,en}/heat-trip.mdx. 불릿은 그 페이지와 같은 사실만 쓴다.
    // 문장 근거: _site-refresh/refresh4/specs/heat-trip.md §6, 팩트 시트 refresh4/facts/heat-trip.md
    // (백엔드 47d161f·034c3dc, 앱 스토어 빌드 5313bc7). Python 추천 서버는 비공개 — 링크 없음.
    // "팀 리드"는 제출 PDF 표기(p.1·p.5). 쓰지 않는 것: "85%", 커밋·줄 비율, "팀 리드로 PR·리뷰 운영",
    // "LLM이 장소/cat3를 고른다", "755ms → 4.9ms 개선"(서로 다른 쿼리), 테스트·관측성 성과, 부하 테스트
    id: 'heat-trip',
    slug: 'heat-trip',
    name: {
      ko: 'HeatTrip — 감정 기반 여행지 추천 서비스 (3인 팀 리드)',
      en: 'HeatTrip — Emotion-based travel recommendation (Team Lead, team of 3)',
    },
    periods: [
      { start: '2025-07', end: '2025-11', label: { ko: '공모전 · 팀 Hit다Heat, 3인', en: 'competition · team Hit다Heat, 3 people' } },
      { start: '2026-03', end: '2026-06', label: { ko: '개인 리팩토링', en: 'solo refactoring' } },
    ],
    award: 'tour-data-2025',
    app: 'heat-trip',
    size: 'full',
    bullets: {
      ko: [
        '3인 공모전 팀 리드(기획) — 백엔드(장소 수집·탐색·추천·미디어·인증), Python 추천 서버, 앱 추천·탐색 화면, 배포·원스토어 출시',
        'LLM에는 장소 대신 95개 카테고리 이름만 주고(그룹 2개), Spring이 라벨을 cat3 코드로 바꿔 장소를 거르고 점수식으로 순위를 매김',
        '관광공사 장소 약 5만 곳 수집·정제 뒤 Kakao 링크·좌표 보강과 카테고리 특성 스냅숏 생성. 무한 스크롤은 (createdtime, contentid) 커서 + size+1',
        '(2026 개인) 추천 API 인증·경로별 레이트 리밋·비밀 스캔으로 공개 운영 정비. 검색은 EXPLAIN ANALYZE로 count 전체 스캔을 확인하고 search_text + FULLTEXT(ngram)로 전환(변경 전 count 약 755ms, 변경 후 목록 약 4.9ms — 서로 다른 쿼리, 1회 측정)',
      ],
      en: [
        'Team lead (planning) of a three-person contest team — backend (place collection, explore, recommendation, media, auth), Python recommendation server, app recommendation & explore screens, deployment and ONE store release',
        'Gave the LLM 95 category names instead of places (two groups chosen); Spring maps labels to cat3 codes, filters places and ranks them with its own scoring',
        'Collected and cleaned ~50,000 Tourism Organization places, then backfilled Kakao links & coordinates and built category trait snapshots; infinite scroll uses a (createdtime, contentid) cursor with size+1',
        '(2026, solo) Prepared for public operation with auth on the recommendation API, per-path rate limits and secret scanning; for search, found the count query\'s full scan with EXPLAIN ANALYZE and switched to search_text + FULLTEXT (ngram) (count ~755 ms before, list ~4.9 ms after — different queries, single measurement)',
      ],
    },
  },
  {
    // 상세 페이지: src/content/projects/{ko,en}/oreum.mdx. 불릿은 그 페이지와 같은 사실만 쓴다.
    // 근거: _site-refresh/refresh4/specs/oreum.md §6, facts/oreum.md §A, interview-prep/05-oreum(백엔드 ec805ca, 프론트 c663906).
    // "팀장"은 쓰지 않는다(코드로 확인 불가, 덱 기록뿐).
    // 레포는 비공개 팀 레포라 링크 없음. 4인 팀은 팀 발표 자료(팀 구성 슬라이드)로 확인.
    // 2026-10-01 본인이 키 폐기 완료를 알려 와 게시.
    id: 'oreum',
    slug: 'oreum',
    name: {
      ko: '오름 (OREUM) — 지도 기반 등산 커뮤니티 웹 서비스 (4인 팀)',
      en: 'OREUM — map-based hiking community web service (team of 4)',
    },
    periods: [{ start: '2025-06', end: '2025-07', label: { ko: 'KDT 졸업 프로젝트', en: 'KDT graduation project' } }],
    award: 'kdt-2025',
    size: 'full',
    bullets: {
      ko: [
        '백엔드·프론트 두 레포의 초기 구조(Spring Boot, React 라우트·Redux·개발 프록시)와 서버 설정·빌드 파일 관리',
        '지도(산 검색 · 산악 예보 · 등산로), 큐레이션 글, 소셜 로그인(OAuth2 · JWT) · S3 업로드의 백엔드와 프론트 담당 (Spring Boot · React)',
        '산악 예보는 산 153곳을 묶어 수집해 Redis(TTL 12시간)에 두고, 지도 API는 Redis만 읽게 분리 (최종 코드는 자동 갱신 꺼짐)',
        '큐레이션 글은 공통 정보를 MySQL에, 경로 구간(GeoJSON 좌표)을 MongoDB에 두고 postId로 연결해 지도 위에 경로 표시',
      ],
      en: [
        'Set up the initial structure of both backend and frontend repositories (Spring Boot; React routes, Redux, dev proxy) and managed server configuration and build files',
        'Backend and frontend for the map (mountain search · mountain forecast · trails), curation posts, social login (OAuth2 · JWT) and S3 upload (Spring Boot · React)',
        'Forecasts for 153 mountains collected in batches and kept in Redis (12-hour TTL); the map’s forecast API reads only from Redis (the automatic refresh trigger is off in the final code)',
        'Curation posts keep post metadata in MySQL and route segments (GeoJSON coordinates) in MongoDB, linked by postId and drawn as a route on the map',
      ],
    },
  },
];

/** 'YYYY.MM – YYYY.MM (라벨) · …' — 라벨이 없으면 기간만 */
export function formatProjectPeriods(p: ResumeProject, lang: Lang): string {
  return p.periods
    .map((x) => `${formatPeriod(x.start, x.end, lang)}${x.label ? ` (${x.label[lang]})` : ''}`)
    .join(' · ');
}

/** 이력서·PDF에 싣는 프로젝트(게시 보류 제외) */
export const publishedResumeProjects = (): ResumeProject[] => resumeProjects.filter((p) => !p.hold);

/* ───────────────────────── project status ───────────────────────── */

/**
 * 프로젝트 카드(홈·/projects)와 상세 페이지 머리에 붙는 상태 배지의 단일 출처.
 * 값은 ko/en 공통이라 프로젝트 frontmatter(언어별 2벌)가 아니라 여기에 한 번만 적는다.
 * 라벨 문구('운영 중' 등)는 UI 문구라 src/i18n.ts의 status.* 키에 있다.
 *
 *   live      = 운영 중 — 지금 받아서 쓸 수 있다(운영 API 응답 + 스토어 등록)
 *   preparing = 출시 준비 중 — 아직 공개 출시 전
 *   completed = 완료 — 계획한 범위를 마쳤고 운영 서비스는 아니다
 *   ended     = 완료 · 서버 종료 — 출시했었지만 지금은 서버가 내려가 있다
 *
 * 새 프로젝트를 올릴 때는 slug(파일 이름)로 한 줄을 더한다. 빠지면 빌드가 실패한다.
 * 상태가 바뀌면(예: 서버 종료) 이 값과, 스토어 링크가 있으면 위 apps[].status도 같이 고친다.
 */
export const PROJECT_STATUSES = ['live', 'preparing', 'completed', 'ended'] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export interface ProjectStatusEntry {
  status: ProjectStatus;
  /**
   * 배지에 ' · '로 이어 붙는 짧은 상태 보충 (예: 개선 예정).
   * 팀/개인 같은 프로젝트 성격은 상태가 아니므로 넣지 않는다(상세 페이지 역할 줄에 있다).
   */
  note?: L10n;
}

export const projectStatus: Record<string, ProjectStatusEntry> = {
  // 2026-10-01 운영 API 응답 확인, 원스토어 등록(위 apps.pawloop)
  pawloop: { status: 'live' },
  'baro-farm': { status: 'completed' },
  // 원스토어 리스팅은 남아 있으나 운영 API가 내려가 있다(위 apps['heat-trip'].status와 같은 사실)
  'heat-trip': { status: 'ended' },
  // 출시 전 (resumeProjects.scout 기간 라벨 '1인 개발 · 출시 전')
  scout: { status: 'preparing' },
  oreum: { status: 'completed' },
};

export function getProjectStatus(slug: string): ProjectStatusEntry {
  const s = projectStatus[slug];
  if (!s) throw new Error(`[profile] projectStatus에 '${slug}' 항목이 없습니다 — src/data/profile.ts에 상태를 추가하세요`);
  return s;
}

/* ───────────────────────── About 여정 ───────────────────────── */

type JourneyRef =
  | { from: 'experience'; id: string }
  | { from: 'training'; id: string }
  | { from: 'award'; id: AwardId };

const journeyRefs: (JourneyRef & { mono: string; grad: string })[] = [
  { from: 'experience', id: 'raysis', mono: 'ERP', grad: 'from-emerald-500 to-teal-600' },
  { from: 'training', id: 'devcourse', mono: 'P', grad: 'from-violet-500 to-fuchsia-600' },
  { from: 'award', id: 'tour-data-2025', mono: '🏆', grad: 'from-amber-500 to-orange-500' },
  { from: 'training', id: 'kdt', mono: 'KDT', grad: 'from-sky-500 to-cyan-600' },
];

export interface JourneyEntry {
  title: string;
  sub: string;
  period: string;
  mono: string;
  grad: string;
  /** ko 기준 내부 경로 (localize로 바꿔 쓴다) */
  href?: string;
}

export function journey(lang: Lang): JourneyEntry[] {
  return journeyRefs.map((r) => {
    if (r.from === 'experience') {
      const e = experience.find((x) => x.id === r.id)!;
      return { title: e.org[lang], sub: e.blurb[lang], period: formatPeriod(e.start, e.end, lang), mono: r.mono, grad: r.grad };
    }
    if (r.from === 'training') {
      const t = training.find((x) => x.id === r.id)!;
      return {
        title: t.name[lang],
        sub: t.detail[lang],
        period: formatPeriod(t.start, t.end, lang),
        mono: r.mono,
        grad: r.grad,
        href: t.project ? `/projects/${t.project}` : undefined,
      };
    }
    const a = getAward(r.id);
    const sub =
      lang === 'ko'
        ? `${a.work?.ko ?? ''} 출품 · ${a.prize.ko} (${formatDate(a.date)})`
        : `Entry: ${a.work?.en ?? ''} · ${a.prize.en} (${formatDate(a.date)})`;
    return {
      title: [a.event[lang], a.issuer?.[lang]].filter(Boolean).join(' · '),
      sub,
      period: a.contest ? formatPeriod(a.contest.start, a.contest.end, lang) : formatDate(a.date),
      mono: r.mono,
      grad: r.grad,
      href: a.project ? `/projects/${a.project}` : undefined,
    };
  });
}
