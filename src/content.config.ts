import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    role: z.string().optional(),
    period: z.string().optional(),
    tech: z.array(z.string()).default([]),
    highlight: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    award: z.string().optional(),
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
