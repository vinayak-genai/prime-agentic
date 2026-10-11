import { z } from 'zod';

const blockSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const platformContentSchema = z.object({
  slug: z.string(),
  hero: z.object({
    outcome: z.string(),
    description: z.string(),
  }),
  problem: blockSchema,
  outcome: blockSchema,
  features: z.array(blockSchema),
  steps: z.array(blockSchema),
  useCases: z.array(blockSchema),
  faqs: z.array(faqSchema),
  disclaimer: z.string().optional(),
});

export type PlatformContent = z.infer<typeof platformContentSchema>;
