# Self-contained Next.js marketing image (standalone output + SQLite).
#
# Base: Node 26.12.1 on Alpine, which is newer than the Node 24.22.1 Alpine
# image. better-sqlite3 is compiled in the builder (no glibc prebuild).
#
# Runtime environment (inject at deploy time — do NOT bake secrets into the image):
#   NEXT_PUBLIC_SITE_URL
#   SEO_ANALYTICS_USERNAME
#   SEO_ANALYTICS_PASSWORD
#   SEO_ANALYTICS_SECRET          (optional; defaults to password-derived secret)
#   SQLITE_PATH                  (default: /data/seo.db)
#   CHATBOT_VECTOR_API_URL       (optional)
#   CHATBOT_ENDPOINT_ID
#   CHATBOT_USER_ID
#   CHATBOT_API_TOKEN
#
# Persist SEO metadata across restarts:
#   docker run -v eklab-seo-data:/data -e SQLITE_PATH=/data/seo.db ...

FROM node:26.12.1-alpine AS builder

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:26.12.1-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV SQLITE_PATH=/data/seo.db

RUN apk add --no-cache libc6-compat \
  && mkdir -p /data \
  && addgroup -g 1001 -S nodejs \
  && adduser -S -u 1001 -G nodejs nextjs \
  && chown -R nextjs:nodejs /data

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/better-sqlite3 ./node_modules/better-sqlite3

# /app itself is created as root by WORKDIR; make it writable for the app user
# (belt-and-suspenders if SQLITE_PATH ever resolves under /app).
RUN chown nextjs:nodejs /app

USER nextjs

VOLUME ["/data"]
EXPOSE 3000

CMD ["node", "server.js"]
