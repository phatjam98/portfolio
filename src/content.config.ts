import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    heroMetric: z.string().optional(),
    heroMetricLabel: z.string().optional(),
    tags: z.array(z.string()),
    publishDate: z.coerce.date(),
    order: z.number(),
    status: z.enum(['published', 'draft']),
    category: z.enum(['optimization', 'architecture', 'infrastructure', 'vision']),
    role: z.string().optional(),
    company: z.string().optional(),
    teamSize: z.string().optional(),
    duration: z.string().optional(),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    publishDate: z.coerce.date(),
    status: z.enum(['published', 'draft']),
    category: z.string().optional(),
  }),
});

export const collections = { 'case-studies': caseStudies, writing };
