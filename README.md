# Prime Agentic Claude Code Starter Kit

Copy the contents of this folder into your repo root (keep the hidden
`.claude/` folder), then run:

    git init && claude

Then open docs/PROMPTS.md and paste the Kickoff prompt.

Slash commands: /verify, /new-doc <name>, /new-platform-page <platform>

## Development

Prerequisites: Node 20+, pnpm 9. Install with `pnpm install`, then `pnpm dev`
(web on :3000, API on :3001).

The API uses **Postgres** (see `apps/api/docker-compose.yml`), and its e2e
tests spin up a Postgres container via **Testcontainers**, which requires
**Docker Desktop** to be running. API unit tests run without Docker.
