import type { MetadataRoute } from 'next'
import { toNextSitemap } from '@power-seo/sitemap'
import { SEO_PAGES, SITE_URL } from '@/lib/seo'
import { listPageMetadata } from '@/lib/seo/store'

export const dynamic = 'force-dynamic'

export default function sitemap(): MetadataRoute.Sitemap {
  const overrides = new Map(listPageMetadata().map((row) => [row.path, row]))
  const urls = SEO_PAGES.filter((page) => page.includeInSitemap)
    .filter((page) => !overrides.get(page.path)?.noindex)
    .map((page) => ({
      loc: page.path,
      changefreq: page.changeFrequency,
      priority: page.priority,
    }))

  return toNextSitemap(urls, SITE_URL) as MetadataRoute.Sitemap
}
