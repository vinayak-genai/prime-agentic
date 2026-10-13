# Multi-stage build for the NestJS API. Runs as a non-root user.
FROM node:20-alpine AS base
RUN npm install -g pnpm@9.15.4
WORKDIR /app

# Install workspace dependencies (pnpm resolves the monorepo).
FROM base AS deps
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json
COPY packages/contracts/package.json ./packages/contracts/package.json
COPY packages/ui/package.json ./packages/ui/package.json
RUN pnpm install --frozen-lockfile

# Build contracts, the API, and the Prisma client.
FROM base AS build
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm --filter @prime-agentic/contracts build \
  && pnpm --filter @prime-agentic/api build \
  && pnpm --filter @prime-agentic/api exec prisma generate

# Runtime image (migrations run as a separate deploy step, not on start).
FROM node:20-alpine AS runner
ENV NODE_ENV=production
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
COPY --from=build --chown=nodejs:nodejs /app /app
USER nodejs
WORKDIR /app/apps/api
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3001/health || exit 1
CMD ["node", "dist/main.js"]
