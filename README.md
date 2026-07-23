# EKLab Marketing Site

Next.js App Router marketing site with server-side rendering, Power SEO tooling, and SQLite-backed metadata.

## Getting Started

```bash
cp .env.example .env
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## SEO Analytics (unlisted)

The Power SEO analytics + metadata editor lives at `/seo-analytics`.

- Not linked from the public navigation or footer
- Requires `SEO_ANALYTICS_USERNAME` and `SEO_ANALYTICS_PASSWORD`
- Stores editable page metadata in SQLite (`SQLITE_PATH`, default `./data/seo.db`)
- Public pages read metadata via SSR (`generateMetadata`)

## Scripts

```bash
npm run dev
npm run build
npm start
npm test
```

## Deploy (self-contained container)

CI publishes a multi-arch image to GHCR on pushes to `main` (see `.github/workflows/docker-publish.yml`). Pull requests build the image without pushing.

```bash
docker run --rm -p 3000:3000 \
  -v eklab-seo-data:/data \
  -e NEXT_PUBLIC_SITE_URL=https://eklab.xyz \
  -e SEO_ANALYTICS_USERNAME=... \
  -e SEO_ANALYTICS_PASSWORD=... \
  -e CHATBOT_ENDPOINT_ID=... \
  -e CHATBOT_USER_ID=... \
  -e CHATBOT_API_TOKEN=... \
  ghcr.io/<org>/marketing:main
```

Mount `/data` so SQLite metadata survives container restarts.
