# Prime Agentic: Website (prime-agentic.com)

## Scope

Showcase and lead-generation website ONLY. The four platforms (Financial
Planner & Wealth Management, Recruitment ATS, EdTech AI Enterprise, IoT)
are built elsewhere. Never build platform internals. All demos use mock data.
Unreleased features must be labeled "In Development" / "Early Access".

## Stack

- Monorepo: pnpm + Turborepo
- apps/web: Next.js (App Router), TypeScript strict, Tailwind, shadcn/ui,
  Framer Motion, Embla Carousel
- apps/api: NestJS (contact/demo-request, newsletter, content, email,
  rate limiting)
- packages/ui: shared components (Carousel, Hero, PlatformCard, DemoViewer)
- Optional: services/ai-demo (Python/FastAPI), only if explicitly requested
- Docs live in /docs as Markdown

## Standards

- Accessibility WCAG 2.2 AA; respect prefers-reduced-motion
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Mobile-first; breakpoints 360/768/1024/1440; dark/light themes
- Tests: Vitest (unit), Playwright (e2e + a11y)
- No secrets in repo; use .env.example
- Conventional commits; small, reviewable changes

## Workflow rules

- Read /docs before implementing; update docs when design changes
- Plan first for any task touching more than 3 files, then wait for approval
- Run lint, typecheck, and tests before declaring a task done
- Never fabricate customers, metrics, or testimonials; use marked placeholders

## Docs index

PRD.md, SITEMAP_UIUX.md, ARCHITECTURE.md, MODULE_INDEX.md,
TECH_WORKFLOW.md, CONTENT_PLAN.md
