import { z } from 'zod';
import { platformSlugSchema } from '@prime-agentic/contracts';

export const platformStatusSchema = z.enum([
  'In Development',
  'Early Access',
  'Live',
]);

export const platformSchema = z.object({
  slug: platformSlugSchema,
  name: z.string(),
  tagline: z.string(),
  status: platformStatusSchema,
  /** Short icon key, rendered by the consuming component. */
  icon: z.string(),
  summary: z.string(),
});

export type PlatformStatus = z.infer<typeof platformStatusSchema>;
export type Platform = z.infer<typeof platformSchema>;

/**
 * The four platform verticals. Slugs are single-sourced from
 * `@prime-agentic/contracts`; name/tagline/status/icon/summary live here.
 * Consumed by the header, home showcase, footer, and platform pages.
 * Validated at module load so a malformed entry fails fast.
 */
export const PLATFORMS: Platform[] = platformSchema.array().parse([
  {
    slug: 'financial-planner',
    name: 'Financial Planner & Wealth Management',
    tagline: 'Personalized financial planning, continuously updated.',
    status: 'In Development',
    icon: 'chart',
    summary:
      'Coordinated agents that keep client plans current as goals, markets, and regulations change.',
  },
  {
    slug: 'recruitment-ats',
    name: 'Recruitment ATS',
    tagline: 'Hire faster with AI that screens, schedules, and scores.',
    status: 'In Development',
    icon: 'people',
    summary:
      'Agents that screen, schedule, and score candidates so recruiters focus on the best-fit conversations.',
  },
  {
    slug: 'edtech-ai',
    name: 'EdTech AI Enterprise',
    tagline: 'Adaptive learning that meets every learner where they are.',
    status: 'In Development',
    icon: 'academic',
    summary:
      'Adaptive learning agents that tailor pacing and content to each learner across institutions.',
  },
  {
    slug: 'iot',
    name: 'IoT',
    tagline: 'Turn device data into autonomous operations.',
    status: 'In Development',
    icon: 'device',
    summary:
      'Agents that turn device telemetry into autonomous, supervised operations for industrial fleets.',
  },
]);
