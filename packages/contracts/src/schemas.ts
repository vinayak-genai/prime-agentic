import { z } from 'zod';

/** Registry slugs, mirrored from `apps/web` and `apps/api` (single source here). */
export const PLATFORM_SLUGS = [
  'financial-planner',
  'recruitment-ats',
  'edtech-ai',
  'iot',
] as const;

export const platformSlugSchema = z.enum(PLATFORM_SLUGS);
export type PlatformSlug = z.infer<typeof platformSlugSchema>;

export const demoRequestSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(254),
  company: z.string().trim().min(1).max(200),
  role: z.string().trim().max(200).optional(),
  platform: platformSlugSchema,
  message: z.string().trim().max(2000),
  consent: z
    .boolean()
    .refine((value) => value === true, { message: 'Consent is required' }),
  /** Honeypot field: must be empty for a genuine submission. */
  honeypot: z.string().max(200).optional(),
});

export type DemoRequestInput = z.input<typeof demoRequestSchema>;
export type DemoRequest = z.output<typeof demoRequestSchema>;

export const apiErrorSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    fields: z.record(z.string()).optional(),
  }),
});
export type ApiError = z.infer<typeof apiErrorSchema>;
