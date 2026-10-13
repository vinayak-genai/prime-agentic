# MODULE INDEX — Prime Agentic Website

Reference of website modules (shared components + page templates) with their
props and dependencies. Complements `SITEMAP_UIUX.md` §3.

Legend — Type: `ui` (packages/ui) · `web` (apps/web component) · `page`
(apps/web route). Data: `mock` (reads `apps/web/mocks/*.json`) · `api` (calls
`apps/api`) · `static` (in-code copy).

---

## 1. Shared Components (`packages/ui`)

| Module           | Type | Props                                                                                                  | Dependencies                                     |
| ---------------- | ---- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| `Carousel`       | ui   | `items`, `autoplay`, `interval`, `loop`, `showDots`, `showArrows`, `variant`, `ariaLabel`, `className` | Embla, `useReducedMotion`; lazy images           |
| `Hero`           | ui   | `title`, `subtitle`, `ctas` (`{label, href, variant}[]`), `media`, `align`, `overlay`                  | `Button`                                         |
| `PlatformCard`   | ui   | `name`, `tagline`, `status`, `href`, `icon`, `illustration`                                            | `StatusBadge`, `Button`                          |
| `StatusBadge`    | ui   | `status: "In Development" \| "Early Access" \| "Live"`                                                 | design tokens                                    |
| `DemoViewer`     | ui   | `demo` (`{persona, steps[]}`), `title`, `className`                                                    | step-through Next/Back, `aria-live`, no autoplay |
| `SectionHeading` | ui   | `eyebrow`, `title`, `description`, `align`                                                             | —                                                |
| `Button`         | ui   | `variant: primary/ secondary/ ghost`, `size: sm/md/lg`, `asChild`, `href`                              | shadcn/ui button                                 |

## 2. App Components (`apps/web`)

| Module            | Type | Props                                                              | Dependencies                                                           |
| ----------------- | ---- | ------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `Header`          | web  | `nav: NavItem[]`, `cta: {label, href}`                             | `Button`, mobile-menu state                                            |
| `Footer`          | web  | `nav`, `social: SocialLink[]`, `newsletter`, `disclaimer?: string` | `NewsletterForm`                                                       |
| `AgentFlow`       | web  | `agents: Agent[]`, `goal: string`, `animate: boolean`              | Framer Motion, `useReducedMotion`                                      |
| `LeadForm`        | web  | `defaultPlatform?: string`                                         | contracts `createDemoRequest` + `demoRequestSchema`, `TurnstileWidget` |
| `TurnstileWidget` | web  | `siteKey?: string`, `onToken: (token) => void`                     | Cloudflare Turnstile script (lazy)                                     |
| `NewsletterForm`  | web  | `—`                                                                | api `subscribeNewsletter` (6b)                                         |
| `FAQ`             | web  | `items: {question, answer}[]`                                      | native `<details>/<summary>`                                           |
| `CTABand`         | web  | `title`, `description`, `ctas`                                     | `Button`                                                               |

## 3. Pages (`apps/web`)

| Module                    | Type | Data                      | Composes                                                                                         |
| ------------------------- | ---- | ------------------------- | ------------------------------------------------------------------------------------------------ |
| `HomePage`                | page | static + mock             | `Hero`→`Carousel`, `PlatformCard` grid, `AgentFlow`, use-case `Carousel`, `CTABand`              |
| `PlatformPage` (template) | page | registry + content + demo | `Hero`, `StatusBadge`, feature `Carousel`, numbered steps, `DemoViewer` (lazy), `FAQ`, `CTABand` |
| `AgenticAIPage`           | page | static                    | `Hero`, `AgentFlow`, platform grid, `CTABand`                                                    |
| `AboutPage`               | page | static [PLACEHOLDER]      | `Hero`, value grid, team cards                                                                   |
| `ContactPage`             | page | api                       | `LeadForm` (`type: "contact"`)                                                                   |
| `BlogIndexPage`           | page | MDX metadata              | post grid                                                                                        |
| `BlogPostPage`            | page | MDX                       | MDX renderer                                                                                     |
| `NotFoundPage`            | page | static                    | `Button` (return home)                                                                           |

---

## 4. Content & Demo Data (`apps/web/src/content`, `apps/web/src/mocks`)

| File                            | Shape                                                                                                     |
| ------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `content/platforms.ts`          | `Platform[]` — registry: `{slug, name, tagline, status, icon, summary}`                                   |
| `content/platforms/index.ts`    | `PLATFORM_CONTENT_LOADERS` + `getPlatformContent(slug)` — per-slug lazy, zod-validated loaders            |
| `content/platforms/<slug>.json` | `PlatformContent` — hero, problem/outcome, `features[]`, `steps[]`, `useCases[]`, `faqs[]`, `disclaimer?` |
| `content/disclaimer.ts`         | `FINANCIAL_DISCLAIMER` — canonical disclaimer string (guarded against the JSON copy by a test)            |
| `mocks/index.ts`                | `PLATFORM_DEMO_LOADERS` + `getPlatformDemo(slug)` — per-slug lazy, zod-validated loaders                  |
| `mocks/<slug>.demo.json`        | `PlatformDemo` — `{slug, persona, steps[]}` (illustrative mock)                                           |
| `content/home.ts`               | Home copy — hero slides, sections, illustrative scenarios                                                 |

---

## 5. Dependency Notes

- `packages/ui` has **no** dependency on `apps/web` or `apps/api` (unidirectional).
- `apps/web` depends on `packages/ui` and the typed API client from `apps/api`
  (or a shared `packages/contracts` if needed later).
- `apps/api` depends on nothing in `apps/web`.
- All mock-driven components (`DemoViewer`, `PlatformPage`) take data as props —
  never fetch real platform data.
- Content and demo JSON are loaded **per slug** via lazy loaders so each
  platform route bundles only its own JSON; a registry slug with no content
  loader renders the "coming soon" page.
