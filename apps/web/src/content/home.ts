export interface HeroSlide {
  eyebrow?: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
}

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: 'Prime Agentic',
    title: 'Four agentic platforms. One coordinated approach.',
    subtitle:
      'Prime Agentic builds AI that plans, executes, and adapts — across finance, recruiting, education, and industry.',
    ctaLabel: 'Request a demo',
    ctaHref: '/contact',
  },
  {
    eyebrow: 'The platforms',
    title: 'Specialized AI for the work that matters.',
    subtitle:
      'Wealth management, recruiting, education, and industrial operations — each powered by coordinated agents.',
    ctaLabel: 'Explore platforms',
    ctaHref: '/#platforms',
  },
  {
    eyebrow: 'The approach',
    title: 'Agents that coordinate, not just chat.',
    subtitle:
      'Multiple specialized agents work toward a single outcome — planning, executing, and adapting together.',
    ctaLabel: 'See the approach',
    ctaHref: '/agentic-ai',
  },
];

export const platformShowcase = {
  eyebrow: 'Platforms',
  title: 'One approach, four applications.',
  description:
    'Each vertical applies the same coordination engine to its own workflow. All platforms are in development.',
};

export const agenticApproach = {
  eyebrow: 'How it works',
  title: 'Specialized agents, one goal.',
  description:
    'Rather than one assistant, Prime Agentic coordinates a team of agents — each with a distinct role — toward a single outcome.',
  pillars: [
    {
      title: 'Plan',
      description:
        'Agents break a goal into steps, gather context, and sequence the work.',
    },
    {
      title: 'Execute',
      description:
        'Specialized agents carry out each step, handing off results to one another.',
    },
    {
      title: 'Adapt',
      description:
        'As conditions change, the team revises the plan and continues toward the goal.',
    },
  ],
};

export const scenarios = {
  eyebrow: 'Illustrative scenarios',
  title: 'What coordinated agents could do for you.',
  description:
    'Illustrative examples of how the approach applies — not testimonials or live customer outcomes.',
  items: [
    {
      title: 'A plan that stays current',
      industry: 'Wealth management',
      description:
        'Agents monitor a client’s goals and market changes, flagging when a plan needs review.',
    },
    {
      title: 'A shortlist built overnight',
      industry: 'Recruiting',
      description:
        'Agents screen applicants, schedule interviews, and summarize the strongest matches.',
    },
    {
      title: 'Learning that adapts',
      industry: 'Education',
      description:
        'Agents adjust pacing and material to each learner, across a whole institution.',
    },
    {
      title: 'Operations that self-correct',
      industry: 'Industrial IoT',
      description:
        'Agents watch device telemetry and coordinate responses before failures cascade.',
    },
  ],
};

export const ctaBand = {
  title: 'See how coordinated agents work for your industry.',
  description:
    'Request a demo and we’ll walk through the approach against your workflow.',
};
