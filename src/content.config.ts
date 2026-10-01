import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { AWARD_IDS } from './data/profile';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    canonicalUrl: z.string().url().optional(),
    /** true면 목록·홈·사이트맵에서 빠지고 /blog/[slug] 페이지도 만들지 않는다 */
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    /** case = 상세 페이지가 있는 케이스 스터디, brief = /projects 하단 "그 밖의 프로젝트" 짧은 항목(상세 페이지 없음) */
    kind: z.enum(['case', 'brief']).default('case'),
    title: z.string(),
    summary: z.string(),
    role: z.string().optional(),
    period: z.string().optional(),
    tech: z.array(z.string()).default([]),
    highlight: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    /** public 절대경로 (예: /img/projects/<slug>/cover.webp), 16:9 권장 */
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    /** 상세 페이지 커버 아래 한 줄 캡션 (예: 화면이 어느 단계·빌드인지) */
    coverCaption: z.string().optional(),
    /** cover의 실제 픽셀 크기 (img width/height 속성 — 레이아웃 이동 방지) */
    coverWidth: z.number().int().positive().optional(),
    coverHeight: z.number().int().positive().optional(),
    /** og:image 전용 1200×630 JPEG (webp를 못 읽는 공유 미리보기 대비). 없으면 cover */
    ogImage: z.string().optional(),
    /** src/data/profile.ts의 awards id (날짜·명칭은 profile에서 가져온다) */
    award: z.enum(AWARD_IDS).optional(),
    /** true면 어디에도 싣지 않는다(게시 보류). 목록·홈·상세 페이지 모두 제외 */
    draft: z.boolean().default(false),
    /** 짧은 항목 아래에 붙일 한 줄 고지 (예: 투자 자문이 아닙니다) */
    disclaimer: z.string().optional(),
    roleBreakdown: z
      .array(z.object({ area: z.string(), pct: z.number() }))
      .default([]),
    metrics: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
          note: z.string().optional(),
        })
      )
      .default([]),
    links: z
      .array(z.object({ label: z.string(), href: z.string().url() }))
      .default([]),
  }),
});

export const collections = { blog, projects };
