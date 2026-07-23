# Self-contained Next.js marketing image (standalone output + SQLite).
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

FROM node:24-bookworm-slim AS builder

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:24-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV SQLITE_PATH=/data/seo.db

RUN mkdir -p /data \
  && groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs \
  && chown -R nextjs:nodejs /data

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

VOLUME ["/data"]
EXPOSE 3000

CMD ["node", "server.js"]
