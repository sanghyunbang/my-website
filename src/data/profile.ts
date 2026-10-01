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
      "경영·경제를 먼저 공부한 덕에 '왜 이 데이터가 필요한가'를 함께 생각하고, 데이터 분석 경험으로 정량적으로 문제를 바라보는 습관을 들였습니다. 단순히 동작하는 코드가 아니라 동작 이후의 구조까지 확인합니다.",
    ],
    en: [
      'I build services with Java and Spring Boot, and most of my work has been on spots where “the feature works but the data is wrong” — concurrent requests getting the same sequence number, permissions that changed while already-issued tokens stayed the same, events that went missing and left services out of sync. I built my personal projects together with AI coding agents, so I look at what a test actually verifies before trusting a “passed” report.',
      'Studying business and economics first taught me to ask “why is this data needed,” and data analysis gave me the habit of looking at problems quantitatively. I check not just that code runs, but the structure behind how it runs.',
    ],
  } satisfies L10nList,
  /** About 이미지 hover 키워드 */
  keywords: {
    ko: ['#구조적사고', '#데이터기반', '#집요한디버깅', '#끝까지책임', '#계속만든다'],
    en: ['#StructuralThinking', '#DataDriven', '#RelentlessDebugging', '#OwnItFully', '#AlwaysBuilding'],
  } satisfies L10nList,
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

/** 프로젝트 slug에 연결된 스토어 링크 (프로젝트 상세에서 frontmatter links 뒤에 붙인다) */
export function storeLinksFor(slug: string, lang: Lang): { label: string; href: string }[] {
  return links.apps
    .filter((a) => a.project === slug)
    .map((a) => ({ label: `${a.store[lang]} — ${a.name[lang]}`, href: a.href }));
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
        '정량적 실험 설계와 결과 해석을 통해 데이터 기반으로 문제를 바라보는 습관을 다짐',
      ],
      en: [
        'Assisted Multi-Armed Bandit / reinforcement-learning research — theory analysis, experiment organization, project support',
        'Built the habit of viewing problems quantitatively through experiment design and interpretation',
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
      ko: 'Spring Cloud · Spring AI · MSA 백엔드 — BARO FARM 프로젝트',
      en: 'Spring Cloud · Spring AI · MSA backend — BARO FARM project',
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
  /** 'full' = 불릿 목록, 'line' = 한 줄 요약(그 밖의 프로젝트) */
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
    // 문장 근거: project-briefs.md §3 (14장이 '반대 증거'로 판정한 PDF 문장은 쓰지 않음:
    // "UPDATE와 SELECT 사이 끼어듦", "잠금 순서로 교착 회피", "통합 테스트 112", "되돌리면 실패", "App Store 심사 중")
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
        '기획부터 Flutter 앱, Spring Boot 서버, AWS 배포까지 혼자 맡아 원스토어에 출시 (2026.09)',
        '채팅 방별 순번 — 방을 읽고 +1 해서 쓰는 방식은 두 요청이 같은 값을 읽을 수 있어 방별 순번 유니크 제약에 걸림. 증가와 "내 번호 받기"를 UPDATE … SET last_seq = LAST_INSERT_ID(last_seq + 1)로 묶어, 요청은 UPDATE의 행 잠금으로 한 줄로 서고 증가한 값은 세션에 남아 행을 다시 읽지 않고 받음',
        '실제 MySQL(Testcontainers)에서 스레드 20개가 같은 방에 동시에 보내 순번 1–20이 각각 한 번씩 나오는지 테스트로 고정(커넥션 풀 10 — 동시 트랜잭션은 최대 10). 재전송 멱등은 (room_id, sender_user_id, client_msg_id) 유니크 제약으로 두고 같은 ID 중복 / 다른 멤버의 같은 키 / 키 없음 세 경우를 테스트로 고정',
        '첫 운영 배포(2026.09.17)에서 Caddy가 설정 파싱 오류로 종료돼 80·443이 응답하지 않음 — Caddyfile 문자열만 검사하던 테스트가 틀린 설정도 통과시킨 것이 원인. 운영과 같은 Caddy 이미지를 Testcontainers로 띄워 caddy validate를 실제로 실행하는 테스트로 교체',
        'Spring Modulith 기반 모듈러 모놀리스 — 경계 검사를 나중에 들여 위반을 620건에서 107건으로 줄이고, 늘면 실패하는 래칫 테스트로 고정. 모듈 간 순환 의존 0',
        '백엔드 테스트 전체 1,994건 실패 0 (2026-09-30 기준). 커밋의 약 81%(445/550)는 AI 코딩 에이전트와 함께 작성했고 커밋 트레일러로 표기',
        'Java 21 / Spring Boot 3.5 / Spring Modulith / JPA / MySQL 8 / Testcontainers / Docker Compose · Caddy / AWS EC2 · Terraform / Flutter',
      ],
      en: [
        'Planned and built it alone — Flutter app, Spring Boot server and AWS deployment — and released it on ONE store (2026.09)',
        'Per-room chat sequence — reading the room and writing +1 lets two requests read the same value and hit the per-room unique constraint. Bundled the increment and "get my number" into UPDATE … SET last_seq = LAST_INSERT_ID(last_seq + 1): the UPDATE’s row lock serializes the requests, and the incremented value stays in the session, so the number comes back without re-reading the row',
        'Pinned with a test on real MySQL (Testcontainers): 20 threads sending to the same room get sequence numbers 1–20 exactly once each (connection pool of 10, so at most 10 concurrent transactions). Resend idempotency uses a (room_id, sender_user_id, client_msg_id) unique constraint, with three cases fixed by tests: same ID duplicated / same key from another member / no key',
        'First production deploy (2026.09.17): Caddy exited on a config parse error and ports 80/443 did not respond — the test guarding the config only checked Caddyfile strings and passed a broken config. Replaced it with a test that runs caddy validate in the production Caddy image via Testcontainers',
        'Modular monolith on Spring Modulith — introduced boundary checks after the fact, cut violations from 620 to 107 and locked them with a ratchet test that fails if they grow; zero dependency cycles between modules',
        'Full backend test run: 1,994 tests, 0 failures (as of 2026-09-30). About 81% of commits (445/550) were written with an AI coding agent and are marked with commit trailers',
        'Java 21 / Spring Boot 3.5 / Spring Modulith / JPA / MySQL 8 / Testcontainers / Docker Compose · Caddy / AWS EC2 · Terraform / Flutter',
      ],
    },
  },
  {
    id: 'baro-farm',
    slug: 'baro-farm',
    name: {
      ko: 'BARO FARM — MSA 커머스 백엔드 (회원·인증, Gateway, OPA 인가)',
      en: 'BARO FARM — MSA commerce backend (member/auth, Gateway, OPA authorization)',
    },
    periods: [{ start: '2025-11-29', end: '2026-01-27', label: { ko: '팀 프로젝트', en: 'team project' } }],
    size: 'full',
    bullets: {
      ko: [
        'Spring Cloud Gateway·Redis·Kafka·OPA 기반 MSA에서 회원·인증 서비스, Gateway, OPA 인가 담당',
        '간헐적 403을 게이트웨이 오류가 아닌 "JWT 권한과 사용자 상태 불일치" 구조 문제로 진단하고, Kafka hotlist 이벤트 → OPA 번들 갱신으로 권한 반영 시차를 폴링 주기(10~60초) 안으로 줄이는 경로를 설계·구현',
        '회원탈퇴 이벤트를 탈퇴 트랜잭션 안에서 outbox에 적재하고 스케줄러로 발행(5회 실패 시 FAILED)',
        '(이후 개인 리팩토링 2026.02–03) 판매자 승인의 관리자 경로를 커밋 후 비동기 전파로 분리하고 결정을 ADR로 기록',
      ],
      en: [
        'Owned the member/auth service, the Gateway and OPA authorization in an MSA on Spring Cloud Gateway·Redis·Kafka·OPA',
        'Diagnosed intermittent 403s as a structural "JWT permission vs user-state mismatch," not a gateway error, and designed and implemented a Kafka hotlist event → OPA bundle refresh path to cut the permission lag to within the polling interval (10–60s)',
        'Wrote the member-withdrawal event to an outbox inside the withdrawal transaction, published by a scheduler (FAILED after 5 failures)',
        '(Later solo refactoring, 2026.02–03) Split the admin seller-approval path into commit-then-async propagation and recorded the decision in an ADR',
      ],
    },
  },
  {
    id: 'heat-trip',
    slug: 'heat-trip',
    name: {
      ko: 'HeatTrip — 감정 기반 여행지 추천 서비스 (팀 리드)',
      en: 'HeatTrip — Emotion-based travel recommendation (Team Lead)',
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
        'LLM 역할 한정 — 수만 건의 장소를 LLM에 넣지 않고, LLM은 카테고리(cat3)만 고르게 한 뒤 실제 장소는 cat3로 걸러 Spring 안의 점수 함수로 랭킹',
        '장소 목록 조회를 Offset / Cursor 페이지네이션으로 분리 (createdtime + contentid 복합 키, Base64 cursor, size+1로 hasNext 판단)',
        '(개인 리팩토링) 장소 검색 — EXPLAIN ANALYZE로 병목이 count 쿼리(전체 스캔 + 상관 서브쿼리 반복, 약 755ms)임을 확인, search_text 반정규화 + FULLTEXT(ngram) + MATCH…AGAINST로 전환. 문서의 실행 계획 기준 count 전체 스캔이 사라졌고, 목록은 약 4.9ms(\'카페\' 1회 측정)',
        '(개인 리팩토링) 단위 테스트와 관측성 코드 추가 — AOP 요청/예외 수집, fingerprint 중복 억제 후 Slack 알림, correlation id. JaCoCo 커버리지 리포트 · Qodana(GitHub Actions)',
        'Java 21 / Spring Boot 3.5 / Spring Security·OAuth2·JWT / JPA / MySQL 8 / AWS S3·CloudFront / Docker Compose',
      ],
      en: [
        'Scoped the LLM role — instead of feeding tens of thousands of places to the LLM, it picks only the category (cat3); actual places are filtered by cat3 and ranked by a scoring function inside Spring',
        'Split place-list pagination into Offset / Cursor (createdtime + contentid composite key, Base64 cursor, size+1 for hasNext)',
        '(Solo refactoring) Place search — EXPLAIN ANALYZE showed the bottleneck was the count query (full scan + repeated correlated subquery, ~755ms); switched to search_text denormalization + FULLTEXT (ngram) + MATCH…AGAINST. Per the documented plan the count full scan is gone; list ~4.9ms (single measurement for \'카페\')',
        '(Solo refactoring) Added unit tests and observability code — AOP request/exception collection, fingerprint dedup → Slack alerts, correlation id. JaCoCo coverage reports · Qodana (GitHub Actions)',
        'Java 21 / Spring Boot 3.5 / Spring Security·OAuth2·JWT / JPA / MySQL 8 / AWS S3·CloudFront / Docker Compose',
      ],
    },
  },
  {
    // 공개 범위: project-briefs.md §1 — 레포 링크·종목명·수치·호스팅 정보 없음
    id: 'scout',
    name: { ko: 'SCOUT', en: 'SCOUT' },
    periods: [{ start: '2026-05', end: 'present', label: { ko: '1인 개발 · 출시 전', en: 'solo · pre-launch' } }],
    size: 'line',
    summary: {
      ko: '공개 가치평가 방법론(DCF · 몬테카를로)으로 적정가치 범위를 계산하는 서비스. 순수 Kotlin 엔진 + Spring Boot API(PostgreSQL · Testcontainers) + Flutter 앱. 사업화를 준비 중인 비공개 프로젝트라 소스는 공개하지 않습니다.',
      en: 'A valuation service that estimates a fair-value range with public valuation methods (DCF · Monte Carlo). Pure Kotlin engine + Spring Boot API (PostgreSQL · Testcontainers) + Flutter app. A private project being prepared for launch; the source is not public.',
    },
    disclaimer: { ko: '투자 자문이 아닙니다.', en: 'Not investment advice.' },
  },
  {
    // project-briefs.md §2 — 레포 링크 없음. 4인 팀은 팀 발표 자료(팀 구성 슬라이드)로 확인.
    // 2026-10-01 본인이 키 폐기 완료를 알려 와 게시.
    id: 'oreum',
    name: { ko: '오름 (OREUM)', en: 'OREUM' },
    periods: [{ start: '2025-06', end: '2025-07', label: { ko: 'KDT 졸업 프로젝트 · 4인 팀', en: 'KDT graduation project · team of 4' } }],
    award: 'kdt-2025',
    size: 'line',
    summary: {
      ko: '등산 코스를 지도 위에 기록하고 나누는 등산 커뮤니티 웹 서비스. 지도·산 검색·기상청 단기예보, 큐레이션 글(MongoDB · 지도 경로), 소셜 로그인(OAuth2 · JWT), S3 미디어 업로드 담당 (Spring Boot · React).',
      en: 'A hiking-community web service for recording and sharing trails on a map. Owned the map, mountain search and KMA short-term forecast, curation posts (MongoDB · route on map), social login (OAuth2 · JWT) and S3 media upload (Spring Boot · React).',
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
