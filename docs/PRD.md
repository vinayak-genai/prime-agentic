# PRD — Prime Agentic Website

**Product:** Showcase + lead-generation website for `prime-agentic.com`
**Status:** Phase 1 (documentation only)
**Owner:** Prime Agentic

---

## 1. Summary

Prime Agentic is an **Agentic AI / GenAI SaaS company** with four platforms in
development:

1. Financial Planner & Wealth Management — _In Development_
2. Recruitment ATS — _In Development_
3. EdTech AI Enterprise — _In Development_
4. IoT — _In Development_

This website is the **showcase and lead-generation layer only**. The platforms
themselves are built elsewhere and are **not** part of this codebase.

---

## 2. Goals

1. **Generate qualified demo requests** — the single north-star outcome.
2. **Communicate the Agentic AI approach** — position the company around
   coordinated agents (Claude, Codex, OpenClaw) working toward one goal.
3. **Drive newsletter signups** — capture a nurture audience for launch.
4. **Establish credibility** — clear, honest positioning with no fabricated
   customers, metrics, or testimonials.

---

## 3. Success Metrics

| Metric                   | Role        | Target                                  |
| ------------------------ | ----------- | --------------------------------------- |
| Demo requests            | Primary KPI | [PLACEHOLDER: e.g. N/month post-launch] |
| Newsletter signups       | Secondary   | [PLACEHOLDER]                           |
| Contact form submissions | Secondary   | [PLACEHOLDER]                           |
| Core Web Vitals          | Guardrail   | LCP < 2.5s, CLS < 0.1, INP < 200ms      |

> Metrics are placeholders only until real analytics are in place. No invented
> numbers are used anywhere in the site.

---

## 4. Audience

**Primary buyers/decision-makers:**

- Wealth management firms and independent financial advisors
- Recruitment agencies and HR/TA leaders
- EdTech operators (schools, universities, training providers)
- Industrial / IoT operators

**Secondary — technical evaluators:**

- CTOs, Heads of AI, and engineering leads who care about the _agentic_
  architecture and how the systems coordinate.

**Tone:** professional, credible, specific. Avoid hype; lead with outcomes and
approach, not superlatives.

---

## 5. Positioning

- **One approach, four platforms.** Prime Agentic is an agentic AI platform
  company; each vertical is an application of the same coordination engine.
- **Coordinated, not isolated.** Multiple specialized agents coordinate toward
  a single goal — visualized on the home page as an animated agent-flow
  diagram.
- **Honest about maturity.** Every platform is labeled "In Development" or
  "Early Access" until released. Demos are mock data and are labeled as such.

---

## 6. Scope

**In scope (this website):**

- Home page with hero, platform showcase, agent-flow diagram, use cases, CTA.
- Four platform showcase pages (one reusable template).
- Agentic AI approach page, About, Contact.
- Blog (MDX), legal/disclaimer pages, 404.
- Contact + demo-request forms with rate limiting and spam protection.
- Newsletter signup.

**Out of scope:**

- Any platform internal functionality (the actual planner, ATS, EdTech, IoT
  products).
- Real customer data, production integrations, live model inference.
- Fabricated customers, metrics, or testimonials.

---

## 7. Non-Goals

- Do **not** build platform internals.
- Do **not** use real (non-mock) data in demos.
- Do **not** publish claims without `[PLACEHOLDER]` or explicit "In
  Development" / "Early Access" labeling.

---

## 8. Assumptions (from kickoff)

| Topic            | Decision                                                                |
| ---------------- | ----------------------------------------------------------------------- |
| Visual direction | **Clean light mode**; white/near-white surfaces; single accent          |
| Hosting          | Vercel (web) + Railway/Render (API + Postgres)                          |
| CMS              | None — content as Markdown/MDX in-repo                                  |
| Demo style       | Interactive mock UI driven by JSON mock data (`apps/web/mocks`)         |
| Analytics        | Privacy-first (Plausible/Umami) by default; GA4 optional behind consent |

---

## 9. Key Pages

- **Home** — hero carousel, platform showcase carousel, Agentic AI approach,
  use-case carousel, CTA band, footer.
- **Platform pages (×4)** — hero + status badge, problem/outcome, feature
  carousel, how-it-works agent flow, interactive mock demo, use cases, FAQ, CTA.
- **Agentic AI approach** — the coordination story.
- **About** — company story (placeholder copy).
- **Contact** — contact + demo-request forms.
- **Blog** — MDX articles.
- **404** + legal/disclaimer pages.

---

## 10. Open Questions / Follow-ups

- Exact accent color for the light theme (defaulting to a professional
  indigo/blue; adjustable in `SITEMAP_UIUX.md`).
- Target demo-request volume once analytics are live.
