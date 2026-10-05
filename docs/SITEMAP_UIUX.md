# SITEMAP & UI/UX — Prime Agentic Website

Companion to `PRD.md`. Defines information architecture, page wireframes (in
text), design tokens, the component inventory, carousel specs, and motion rules.

> **Theme decision (from kickoff):** clean **light mode** is the default and
> only theme for now. No dark mode is in scope. (This overrides the generic
> "dark/light" note in `CLAUDE.md` for this project.)

---

## 1. Sitemap

```
/  (Home)
├── /agentic-ai                       Agentic AI approach
├── /platforms
│   ├── /platforms/financial-planner  Financial Planner & Wealth Management
│   ├── /platforms/recruitment-ats    Recruitment ATS
│   ├── /platforms/edtech-ai          EdTech AI Enterprise
│   └── /platforms/iot                IoT
├── /about                            About
├── /contact                          Contact + demo request
├── /blog                             Blog index
│   └── /blog/[slug]                  Blog post (MDX)
├── /legal
│   ├── /legal/privacy
│   ├── /legal/terms
│   └── /legal/disclaimer             Financial-advice disclaimer
└── /404                              Not found
```

**Navigation (header):** Platforms (dropdown → 4 pages) · Agentic AI · About ·
Blog · Contact · [Primary CTA: "Request a demo"].

**Footer:** logo · nav links · legal links · newsletter signup · social
placeholders · "Not financial advice" one-liner.

---

## 2. Design Tokens — Light Mode

Tokens are authored as CSS custom properties and mapped to Tailwind theme
extensions in `apps/web`.

### 2.1 Color

| Token            | Value                  | Usage                         |
| ---------------- | ---------------------- | ----------------------------- |
| `--bg`           | `#FFFFFF`              | Page background               |
| `--bg-subtle`    | `#F8FAFC` (slate-50)   | Alternating sections, cards   |
| `--surface`      | `#FFFFFF`              | Cards, modals                 |
| `--border`       | `#E2E8F0` (slate-200)  | Hairlines, dividers           |
| `--text`         | `#0F172A` (slate-900)  | Primary text                  |
| `--text-muted`   | `#475569` (slate-600)  | Secondary text                |
| `--accent`       | `#4F46E5` (indigo-600) | Links, primary buttons, focus |
| `--accent-hover` | `#4338CA` (indigo-700) | Hover states                  |
| `--accent-soft`  | `#EEF2FF` (indigo-50)  | Accent tints, tags            |
| `--success`      | `#16A34A`              | Positive indicators           |
| `--warning`      | `#B45309`              | "In Development" badge text   |
| `--warning-soft` | `#FEF3C7`              | "In Development" badge bg     |
| `--info`         | `#0369A1`              | "Early Access" badge text     |
| `--info-soft`    | `#E0F2FE`              | "Early Access" badge bg       |

**Contrast:** all text/background pairs meet WCAG 2.2 AA (≥ 4.5:1). `--accent`
on white is ~6.3:1; use `--accent-soft` (not white) behind accent text.

### 2.2 Typography

- **Typeface:** system font stack (no web-font download) to protect LCP.
  `ui-sans-serif, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`.
- **Scale** (rem, 16px root):

| Token         | Size / line-height | Usage             |
| ------------- | ------------------ | ----------------- |
| `--text-xs`   | 0.75 / 1rem        | Labels, badges    |
| `--text-sm`   | 0.875 / 1.25rem    | Body-muted, meta  |
| `--text-base` | 1 / 1.5rem         | Body              |
| `--text-lg`   | 1.125 / 1.75rem    | Lead paragraphs   |
| `--text-xl`   | 1.25 / 1.75rem     | Card titles       |
| `--text-2xl`  | 1.5 / 2rem         | Section subheads  |
| `--text-3xl`  | 1.875 / 2.25rem    | Page H2           |
| `--text-4xl`  | 2.25 / 2.5rem      | Hero H1 (mobile)  |
| `--text-5xl`  | 3 / 1.2            | Hero H1 (desktop) |

- **Weights:** 400 / 500 / 600 / 700. Headings 600–700, body 400.

### 2.3 Spacing & Layout

- **Spacing scale:** 4px base — 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- **Container:** max-width `72rem` (1152px), gutters 16px (mobile) / 24px
  (tablet+) / 32px (desktop).
- **Section rhythm:** `64px` between sections (mobile), `96px` (desktop).

### 2.4 Radii & Shadows

- Radii: `--radius-sm` 6px (badges, inputs), `--radius-md` 10px (cards),
  `--radius-lg` 16px (hero media, modals).
- Shadows (light, soft): `--shadow-sm`, `--shadow-md`, `--shadow-lg` with
  low-alpha slate (≤ 12% opacity). No harsh drop shadows.

### 2.5 Breakpoints

| Name | Min width            |
| ---- | -------------------- |
| `sm` | 360px (mobile first) |
| `md` | 768px                |
| `lg` | 1024px               |
| `xl` | 1440px               |

---

## 3. Component Inventory

| Component         | Location    | Props / key behavior                                   |
| ----------------- | ----------- | ------------------------------------------------------ |
| `Header`          | apps/web    | Nav links, Platforms dropdown, mobile menu, CTA        |
| `Footer`          | apps/web    | Links, newsletter, legal, disclaimer                   |
| `Hero`            | packages/ui | Title, subtitle, CTAs, media slot                      |
| `Carousel`        | packages/ui | See §4                                                 |
| `PlatformCard`    | packages/ui | `name`, `tagline`, `status`, `href`, icon/illustration |
| `StatusBadge`     | packages/ui | `status: "In Development" \| "Early Access" \| "Live"` |
| `DemoViewer`      | packages/ui | Renders interactive mock demo from JSON                |
| `AgentFlow`       | apps/web    | Animated diagram: Claude, Codex, OpenClaw → one goal   |
| `SectionHeading`  | packages/ui | Eyebrow, title, description, align                     |
| `Button`          | packages/ui | Variants: primary / secondary / ghost; sizes sm/md/lg  |
| `FAQ` (accordion) | apps/web    | Accessible disclosure pattern                          |
| `LeadForm`        | apps/web    | Contact + demo-request; validation, honeypot           |
| `NewsletterForm`  | apps/web    | Email capture                                          |
| `CTA band`        | apps/web    | Reusable conversion strip                              |
| `Badge/Icon`      | packages/ui | Platform + feature icons                               |

---

## 4. Carousel Specs (`<Carousel />` — packages/ui)

Backed by **Embla Carousel**. One component, four visual variants.

**Props:**

| Prop         | Type                                      | Default      | Notes                         |
| ------------ | ----------------------------------------- | ------------ | ----------------------------- |
| `items`      | `ReactNode[]`                             | `[]`         | Slides                        |
| `autoplay`   | `boolean`                                 | `false`      | Disabled under reduced-motion |
| `interval`   | `number`                                  | `5000`       | ms                            |
| `loop`       | `boolean`                                 | `true`       |                               |
| `showDots`   | `boolean`                                 | `true`       |                               |
| `showArrows` | `boolean`                                 | `true`       |                               |
| `variant`    | `"hero" \| "cards" \| "logos" \| "story"` | `"cards"`    | Layout                        |
| `ariaLabel`  | `string`                                  | `"carousel"` | Accessible name               |

**Variants:**

- **hero** — full-bleed large slides, overlay text, 1-up.
- **cards** — responsive peek (1 / 2 / 3 visible), platform showcase.
- **logos** — auto-scrolling logo strip, continuous marquee feel.
- **story** — testimonial/use-case, single large quote with controls.

**Accessibility (required):**

- Container: `role="region"` and `aria-roledescription="carousel"`.
- Slides: `role="group"` with `aria-label="Slide N of M"` / `aria-roledescription="slide"`.
- Live-region announcement (`aria-live="polite"`) for slide changes.
- Arrow/dot controls are real `<button>`s with visible focus and labels.
- Full keyboard operation: arrows move slides, dots jump, focus stays visible.

**Behavior:**

- Swipe on touch; drag on desktop.
- Autoplay pauses on `:hover` and `:focus` and resumes on leave.
- Autoplay is disabled when `prefers-reduced-motion: reduce` (see §5).
- Images are lazy-loaded (`loading="lazy"`, `decoding="async"`) except the
  first hero slide (eager, to protect LCP).
- `contain-intrinsic-size` / reserved aspect ratio to prevent CLS.

---

## 5. Motion Rules (Framer Motion)

- **Respect `prefers-reduced-motion`** globally: use `useReducedMotion()` and
  render elements in their final state (no entrance animation, no autoplay).
- Animate **opacity and transform only** (never layout properties) to protect
  CLS and INP.
- Defaults: duration `0.3s`, easing `easeOut`; entrance offsets ≤ `16px`.
- Reveal-on-scroll uses `whileInView` with `once: true`, `viewport={{ amount: 0.2 }}`.
- The home-page `AgentFlow` diagram animates the coordination loop; it is a
  decorative accent that pauses/static under reduced-motion.

---

## 6. Page Wireframes (text)

### 6.1 Home (`/`)

1. **Header** — sticky; logo, nav, "Request a demo" CTA.
2. **Hero carousel** (`variant="hero"`) — 3 slides: company statement,
   platform montage, agentic-approach teaser. Each: H1, subtitle, 1–2 CTAs.
3. **Platform showcase** (`variant="cards"`) — four `PlatformCard`s with
   `StatusBadge` ("In Development").
4. **Agentic AI approach** — `AgentFlow` diagram + 3 short value pillars.
5. **Use-case carousel** (`variant="story"`) — outcome-focused [PLACEHOLDER]
   quotes.
6. **CTA band** — "See how coordinated agents work for your industry."
7. **Footer** — nav, newsletter, legal, disclaimer.

### 6.2 Platform page (`/platforms/[slug]`)

1. **Header** (shared).
2. **Hero** — title, `StatusBadge`, one-line outcome, CTA.
3. **Problem / outcome** — two-column.
4. **Feature carousel** (`variant="cards"`).
5. **How it works** — `AgentFlow`-style step sequence (platform-specific).
6. **Interactive demo** — `DemoViewer` fed by `apps/web/mocks/<slug>.json`.
7. **Use cases** — bullet grid.
8. **FAQ** — accordion.
9. **CTA band** — "Request a demo".
10. **Footer** (shared). Financial page additionally shows the
    "not financial advice" disclaimer in the hero and footer.

### 6.3 Agentic AI approach (`/agentic-ai`)

1. Header · 2. Hero (statement) · 3. Coordination model (AgentFlow, larger) ·
2. Per-platform application grid · 5. Security/responsibility notes ·
3. CTA band · 7. Footer.

### 6.4 About (`/about`)

1. Header · 2. Company statement [PLACEHOLDER] · 3. Values · 4. Team
   [PLACEHOLDER] · 5. CTA band · 6. Footer.

### 6.5 Contact (`/contact`)

1. Header · 2. `LeadForm` (name, email, company, platform-of-interest,
   message) · 3. Contact info · 4. Footer.

### 6.6 Blog (`/blog`, `/blog/[slug]`)

1. Header · 2. Post grid / post body (MDX) · 3. Newsletter · 4. Footer.

### 6.7 Legal + 404

- Static legal copy; `404` with search-free "return home" CTA.

---

## 7. Accessibility & Performance Notes

- WCAG 2.2 AA throughout: focus-visible rings, 44px touch targets, semantic
  landmarks, single H1 per page, alt text on all images.
- Reduced-motion respected in `Carousel` and all Framer Motion usage.
- No layout shift: reserve space for images, carousels, and the agent-flow
  diagram.
- Light-mode contrast verified per §2.1.
