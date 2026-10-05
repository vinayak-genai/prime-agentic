# MODULE INDEX — Prime Agentic Website

Reference of website modules (shared components + page templates) with their
props and dependencies. Complements `SITEMAP_UIUX.md` §3.

Legend — Type: `ui` (packages/ui) · `web` (apps/web component) · `page`
(apps/web route). Data: `mock` (reads `apps/web/mocks/*.json`) · `api` (calls
`apps/api`) · `static` (in-code copy).

---

## 1. Shared Components (`packages/ui`)

| Module           | Type | Props                                                                                                  | Dependencies                             |
| ---------------- | ---- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| `Carousel`       | ui   | `items`, `autoplay`, `interval`, `loop`, `showDots`, `showArrows`, `variant`, `ariaLabel`, `className` | Embla, `useReducedMotion`; lazy images   |
| `Hero`           | ui   | `title`, `subtitle`, `ctas` (`{label, href, variant}[]`), `media`, `align`, `overlay`                  | `Button`                                 |
| `PlatformCard`   | ui   | `name`, `tagline`, `status`, `href`, `icon`, `illustration`                                            | `StatusBadge`, `Button`                  |
| `StatusBadge`    | ui   | `status: "In Development" \| "Early Access" \| "Live"`                                                 | design tokens                            |
| `DemoViewer`     | ui   | `demo` (`DemoSchema`), `title`, `platform`                                                             | reads `demo.steps`; renders mock screens |
| `SectionHeading` | ui   | `eyebrow`, `title`, `description`, `align`                                                             | —                                        |
| `Button`         | ui   | `variant: primary/ secondary/ ghost`, `size: sm/md/lg`, `asChild`, `href`                              | shadcn/ui button                         |

## 2. App Components (`apps/web`)

| Module           | Type | Props                                                 | Dependencies                            |
| ---------------- | ---- | ----------------------------------------------------- | --------------------------------------- |
| `Header`         | web  | `nav: NavItem[]`, `cta: {label, href}`                | `Button`, mobile-menu state             |
| `Footer`         | web  | `nav`, `social: SocialLink[]`, `newsletter`           | `NewsletterForm`                        |
| `AgentFlow`      | web  | `agents: Agent[]`, `goal: string`, `animate: boolean` | Framer Motion, `useReducedMotion`       |
| `LeadForm`       | web  | `type: "contact" \| "demo"`, `platforms: Platform[]`  | api `createDemoRequest`, `zod` schema   |
| `NewsletterForm` | web  | `—`                                                   | api `subscribeNewsletter`, `zod` schema |
| `FAQ`            | web  | `items: {q, a}[]`                                     | accessible disclosure (Radix/headless)  |
| `CTABand`        | web  | `title`, `description`, `ctas`                        | `Button`                                |

## 3. Pages (`apps/web`)

| Module                    | Type | Data                 | Composes                                                                               |
| ------------------------- | ---- | -------------------- | -------------------------------------------------------------------------------------- |
| `HomePage`                | page | static + mock        | `Hero`→`Carousel`, `PlatformCard` grid, `AgentFlow`, use-case `Carousel`, `CTABand`    |
| `PlatformPage` (template) | page | mock `<slug>.json`   | `Hero`, `StatusBadge`, feature `Carousel`, `AgentFlow`, `DemoViewer`, `FAQ`, `CTABand` |
| `AgenticAIPage`           | page | static               | `Hero`, `AgentFlow`, platform grid, `CTABand`                                          |
| `AboutPage`               | page | static [PLACEHOLDER] | `Hero`, value grid, team cards                                                         |
| `ContactPage`             | page | api                  | `LeadForm` (`type: "contact"`)                                                         |
| `BlogIndexPage`           | page | MDX metadata         | post grid                                                                              |
| `BlogPostPage`            | page | MDX                  | MDX renderer                                                                           |
| `NotFoundPage`            | page | static               | `Button` (return home)                                                                 |

---

## 4. Mock Data Schemas (`apps/web/mocks`)

| File             | Shape                                                                                |
| ---------------- | ------------------------------------------------------------------------------------ |
| `platforms.json` | `Platform[]` — `{slug, name, tagline, status, icon, summary}`                        |
| `<slug>.json`    | `PlatformDemo` — `{slug, problem, outcome, features[], steps[], useCases[], faqs[]}` |
| `use-cases.json` | `UseCase[]` — `{title, industry, outcome, quote}` [PLACEHOLDER]                      |

---

## 5. Dependency Notes

- `packages/ui` has **no** dependency on `apps/web` or `apps/api` (unidirectional).
- `apps/web` depends on `packages/ui` and the typed API client from `apps/api`
  (or a shared `packages/contracts` if needed later).
- `apps/api` depends on nothing in `apps/web`.
- All mock-driven components (`DemoViewer`, `PlatformPage`) take data as props —
  never fetch real platform data.
