import type { MetadataRoute } from 'next'
import { toNextSitemap } from '@power-seo/sitemap'
import { SEO_PAGES, SITE_URL } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const urls = SEO_PAGES.filter((page) => page.includeInSitemap).map((page) => ({
    loc: page.path,
    changefreq: page.changeFrequency,
    priority: page.priority,
  }))

  return toNextSitemap(urls, SITE_URL) as MetadataRoute.Sitemap
}
