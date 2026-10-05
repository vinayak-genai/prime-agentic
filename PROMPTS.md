# Prompt Playbook (paste into `claude`, use plan mode: Shift+Tab)

## Kickoff (Phase 1: documentation only)

Read CLAUDE.md. We are building the showcase website for prime-agentic.com,
an Agentic AI / GenAI SaaS company with four platforms in development:
Financial Planner & Wealth Management, Recruitment ATS, EdTech AI
Enterprise, and IoT.

Phase 1, documentation only. Do not write application code yet.
Create these files in /docs, one at a time, pausing for my review after each:

1. PRD.md: goals, audience, positioning, success metric (demo requests)
2. SITEMAP_UIUX.md: sitemap, page wireframes (described in text), design
   tokens, component inventory, carousel specs, motion rules
3. ARCHITECTURE.md: Mermaid diagram, frontend/backend split, deployment
4. MODULE_INDEX.md: table of website modules with props, dependencies
5. TECH_WORKFLOW.md: lead-capture flow, content flow, CI/CD, environments
6. CONTENT_PLAN.md: copy outline per page, CTAs, SEO keywords

Ask me at most 5 clarifying questions first (brand colors, hosting target,
CMS preference, demo style per platform, analytics). State assumptions for
anything I don't answer.

## Phase 2: Scaffold

Using /docs/ARCHITECTURE.md, scaffold the monorepo: pnpm workspaces,
Turborepo, apps/web (Next.js), apps/api (NestJS), packages/ui.
Add ESLint, Prettier, TypeScript strict, Husky + lint-staged, Vitest,
Playwright, GitHub Actions CI, and .env.example. Plan first, then implement.
Verify with pnpm lint, typecheck, and build.

## Phase 3: Design system and Carousel

Implement design tokens (per SITEMAP_UIUX.md) in Tailwind and build
packages/ui <Carousel /> with Embla. Props: items, autoplay, interval,
loop, showDots, showArrows, variant ("hero" | "cards" | "logos" | "story").
Requirements: keyboard and ARIA (role="region",
aria-roledescription="carousel"), swipe, pause on hover/focus,
reduced-motion support, lazy images. Add Storybook stories, Vitest tests,
and a Playwright a11y test.

## Phase 4: Home page

Build the home page per SITEMAP_UIUX.md and CONTENT_PLAN.md: hero carousel,
platform showcase carousel (four cards with status badges), Agentic AI
approach section with an animated agent-flow diagram (Claude, Codex,
OpenClaw coordinating toward one goal), use-case carousel, CTA band,
footer. Use placeholder copy marked [PLACEHOLDER]. Run Lighthouse and
report scores.

## Phase 5: Platform page template + first platform

Create a reusable PlatformPage template in apps/web, then implement the
Financial Planner & Wealth Management page with it: hero + status badge,
problem/outcome, feature carousel, how-it-works agent flow, interactive
mock demo (mock data JSON in /apps/web/mocks), use cases, FAQ, CTA.
Include a "not financial advice" disclaimer. Then show me how to add the
other three platforms by config only.

## Phase 6: Demo-request backend

Implement POST /api/demo-requests in apps/api (NestJS): DTO validation,
rate limiting, honeypot + Turnstile/reCAPTCHA hook, Postgres persistence via
Prisma, email notification via provider interface (SMTP/Resend), and a
typed client in apps/web. Add unit and e2e tests. Document it in
TECH_WORKFLOW.md.

## Phase 7: Remaining pages, SEO, launch

Add the other three platform pages, the Agentic AI approach page, About,
Contact, and Blog (MDX). Add metadata, OG images, sitemap.xml, robots.txt,
JSON-LD, analytics, cookie consent, and a 404 page. Run full CI plus
Lighthouse, then produce a launch checklist in /docs/LAUNCH.md.

## Spec Kit variant

Replace Phases 1 to 2 with /speckit.constitution, /speckit.specify,
/speckit.plan, /speckit.tasks, /speckit.implement.

## Tips

- Start each phase in plan mode, review the plan, then approve.
- Use /clear between phases; CLAUDE.md and /docs carry the context.
- Commit after each phase.
- Run /init once code exists to let Claude refine CLAUDE.md.
