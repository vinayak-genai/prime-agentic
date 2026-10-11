import { z } from 'zod';

const demoStepSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const demoSchema = z.object({
  slug: z.string(),
  persona: z.object({
    name: z.string(),
    detail: z.string(),
  }),
  steps: z.array(demoStepSchema).min(1),
});

export type PlatformDemo = z.infer<typeof demoSchema>;
