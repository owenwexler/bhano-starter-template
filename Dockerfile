# ./Dockerfile
# Multi-stage build for Platform-As-A-Service (PAAS) deployments with the BHANO stack (Bun + HTMX + Alpine.js + Hono)
# Confirmed to work with Render and DigitalOcean App Platform

# Base image (alpine for small footprint)
FROM oven/bun:1-alpine AS base
WORKDIR /app

# Dependencies layer (better caching)
FROM base AS deps
# Copy only files needed to resolve deps; add pnpm/yarn files here if you use them.
COPY bun.lock package.json ./
RUN bun install --frozen-lockfile

# Build layer (optional; keep if you have a bundling step for static assets)
FROM deps AS build
# Bring in the rest of your app
COPY . .
# If you have a build (e.g., Vite, Tailwind, etc.), leave this line enabled.
# If not, it's harmless if no "build" script exists.
# WHY: Ensures static assets are produced for serving via Hono or a static dir.
RUN bun run build || true

# Runtime image
FROM oven/bun:1-alpine AS runtime
WORKDIR /src

# Render sets PORT at runtime; we provide sane defaults.
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=8080

# Copy runtime deps and application code
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app ./

# Create non-root user for security
# This made the build fail but maybe it is needed?
#RUN addgroup -S bun && adduser -S bun -G bun
#USER bun

# Render ignores EXPOSE but useful locally
EXPOSE 8080

# Healthcheck expects your app to expose /health (or change path below)
# BusyBox wget exists in alpine
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s \
  CMD wget -qO- http://127.0.0.1:${PORT}/health || exit 1

# Start your server; ensure your Hono/Bun server reads HOST/PORT envs.
CMD ["bun", "run", "start"]
