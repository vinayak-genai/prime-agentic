# TECH WORKFLOW — Prime Agentic Website

Operational workflows: lead capture, content publishing, CI/CD, and
environments. Complements `ARCHITECTURE.md` (the _what_) with the _how_.

---

## 1. Lead-Capture Flow

Two lead sources: **demo requests** and **contact** (`LeadForm`), plus
**newsletter** signups.

### 1.1 Demo request / contact

```
User submits LeadForm (apps/web)
        │  typed client, zod-validated
        ▼
POST /api/demo-requests (or /contact)  — apps/api
        │
        ├─ 1. Rate limiter (per-IP + per-form)     → 429 on abuse
        ├─ 2. DTO validation (class-validator)     → 400 on invalid
        ├─ 3. Honeypot check (hidden field empty)  → silently drop bots
        ├─ 4. Captcha verify (Turnstile/reCAPTCHA) → reject if fails
        ├─ 5. Persist to Postgres (Prisma)
        └─ 6. Email notification (Resend / SMTP)
```

- **Success:** 201 + confirmation; **error:** typed error mapped to a friendly
  inline message.
- Every demo request stores `platform` of interest so sales can prioritize.
- Do-not-fabricate rule: no lead is created without a real submission.

### 1.2 Newsletter

```
Email in NewsletterForm → POST /api/newsletter
  → rate limit → email validation → opt-in flag → persist → email
```

- Double opt-in is a follow-up (documented, not yet built) — mark as
  "In Development" until then.

---

## 2. Content Flow

Content is Markdown/MDX in-repo (no CMS — see `PRD.md`).

```
author edits docs / content
        │
        ├─ Blog posts:  apps/web/content/blog/*.mdx
        ├─ Copy:        page components (or content JSON if needed)
        └─ Docs:        /docs (this site's own documentation)
        ▼
git push → PR → CI (lint/typecheck/test) → merge
        ▼
Vercel builds (SSR + ISR revalidate) → live
```

- Blog frontmatter: `title`, `date`, `excerpt`, `tags`, `coverImage`, `author`.
- Never commit real customer data, metrics, or testimonials — `[PLACEHOLDER]`
  until real content exists.

---

## 3. CI/CD

GitHub Actions, two stages:

**On pull request:**

1. Setup pnpm + cache
2. `pnpm lint`
3. `pnpm typecheck`
4. `pnpm test` (Vitest unit)
5. `pnpm build`
6. `pnpm test:e2e` (Playwright, includes a11y assertions)

**On merge to `main`:**

1. Same gates (green required)
2. Deploy `apps/web` → Vercel
3. Deploy `apps/api` → Railway/Render
4. Run database migrations (Prisma) in the API deploy step

Quality gates are also runnable locally via `/verify`.

---

## 4. Environments

| Env          | URL                                    | Data                              | Notes                      |
| ------------ | -------------------------------------- | --------------------------------- | -------------------------- |
| `local`      | `localhost:3000` (web) / `:3001` (api) | Local Postgres (Docker) or SQLite | `.env` from `.env.example` |
| `preview`    | Vercel preview URL + staging API       | Staging Postgres                  | Per-PR deploy              |
| `production` | `prime-agentic.com`                    | Production Postgres               | Locked deploys             |

**Environment variables** (`.env.example`, no values):

| Key                                             | Scope |
| ----------------------------------------------- | ----- |
| `DATABASE_URL`                                  | api   |
| `EMAIL_PROVIDER` (`smtp` / `resend`) + keys     | api   |
| `TURNSTILE_SECRET_KEY` / `RECAPTCHA_SECRET_KEY` | api   |
| `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_API_URL`   | web   |
| `NEXT_PUBLIC_ANALYTICS_ID`                      | web   |

**Secrets:** never in repo; injected via Vercel/Railway/Render dashboards.

---

## 5. Definition of Done

A change is "done" when:

- [ ] Docs updated if design/architecture changed
- [ ] `lint`, `typecheck`, `test` pass
- [ ] Build succeeds; e2e/a11y pass
- [ ] No `[PLACEHOLDER]` left where a decision was made
- [ ] Committed with a conventional-commit message
