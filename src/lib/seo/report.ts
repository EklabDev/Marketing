import { auditPage, auditSite, type PageAuditResult, type SiteAuditResult } from '@power-seo/audit'
import { analyzeContent, type ContentAnalysisOutput } from '@power-seo/content-analysis'
import { analyzeAltText, type ImageAuditResult } from '@power-seo/images'
import {
  analyzeLinkEquity,
  buildLinkGraph,
  findOrphanPages,
  type OrphanPage,
  type LinkEquityScore,
} from '@power-seo/links'
import {
  generateOgPreview,
  generateSerpPreview,
  type OgPreviewData,
  type SerpPreviewData,
} from '@power-seo/preview'
import { analyzeReadability, type ReadabilityOutput } from '@power-seo/readability'
import { getPageUrl, SEO_PAGES, type SeoPageDefinition } from './pages'
import { SITE_NAME, SITE_URL } from './site'

export interface PageSeoInsight {
  page: SeoPageDefinition
  url: string
  audit: PageAuditResult
  content: ContentAnalysisOutput
  readability: ReadabilityOutput
  serp: SerpPreviewData
  og: OgPreviewData
}

export interface SeoReport {
  generatedAt: string
  siteUrl: string
  site: SiteAuditResult
  pages: PageSeoInsight[]
  images: ImageAuditResult | null
  orphans: OrphanPage[]
  linkEquity: LinkEquityScore[]
  marketingPriorities: string[]
}

function toAuditInput(page: SeoPageDefinition) {
  const url = getPageUrl(page)
  return {
    url,
    title: page.title,
    metaDescription: page.description,
    content: page.contentHtml,
    focusKeyphrase: page.focusKeyphrase,
    canonical: url,
    openGraph: {
      title: page.title,
      description: page.description,
    },
    images: page.images?.map((image) => ({
      src: image.src,
      alt: image.alt,
    })),
    internalLinks: page.internalLinks,
    externalLinks: page.externalLinks,
    headings: page.headings,
    wordCount: page.wordCount,
  }
}

function collectMarketingPriorities(
  site: SiteAuditResult,
  pages: PageSeoInsight[],
  orphans: OrphanPage[],
): string[] {
  const priorities: string[] = []

  if (site.score < 70) {
    priorities.push(
      `Site-wide SEO score is ${site.score}/100. Focus first on the lowest-scoring service pages before publishing new content.`,
    )
  }

  const thinPages = pages
    .filter((entry) => entry.page.wordCount < 300 && entry.page.includeInSitemap)
    .sort((a, b) => a.page.wordCount - b.page.wordCount)
    .slice(0, 3)

  for (const entry of thinPages) {
    priorities.push(
      `Expand “${entry.page.title}” (${entry.page.wordCount} words). Aim for 300+ words with clear H1, benefits, and a primary CTA.`,
    )
  }

  const missingH1 = pages.filter((entry) => !entry.page.headings.some((h) => h.startsWith('h1:')))
  for (const entry of missingH1.slice(0, 3)) {
    priorities.push(
      `Add a single H1 on ${entry.page.path} that includes the focus keyphrase “${entry.page.focusKeyphrase}”.`,
    )
  }

  if (orphans.length > 0) {
    priorities.push(
      `Strengthen internal linking to orphan/low-inbound pages: ${orphans
        .slice(0, 3)
        .map((page) => page.url.replace(SITE_URL, '') || '/')
        .join(', ')}.`,
    )
  }

  const topIssueTitles = site.topIssues.slice(0, 5).map((issue) => issue.title)
  for (const title of topIssueTitles) {
    priorities.push(`Address recurring audit finding: ${title}.`)
  }

  return Array.from(new Set(priorities)).slice(0, 12)
}

/** Run a full Power SEO report for marketing analysis. */
export function generateSeoReport(): SeoReport {
  const auditInputs = SEO_PAGES.map(toAuditInput)
  const site = auditSite({ pages: auditInputs, hostname: SITE_URL })

  const pages: PageSeoInsight[] = SEO_PAGES.map((page) => {
    const url = getPageUrl(page)
    const audit = auditPage(toAuditInput(page))
    const content = analyzeContent({
      title: page.title,
      metaDescription: page.description,
      content: page.contentHtml,
      focusKeyphrase: page.focusKeyphrase,
      slug: page.path === '/' ? '' : page.path.replace(/^\//, ''),
      canonicalUrl: url,
      siteUrl: SITE_URL,
      internalLinks: page.internalLinks,
      externalLinks: page.externalLinks,
      images: page.images?.map((image) => ({ src: image.src, alt: image.alt })),
    })
    const readability = analyzeReadability({ content: page.contentHtml })
    const serp = generateSerpPreview({
      title: page.title,
      description: page.description,
      url,
      siteTitle: SITE_NAME,
    })
    const og = generateOgPreview({
      title: page.title,
      description: page.description,
      url,
      siteName: SITE_NAME,
    })

    return { page, url, audit, content, readability, serp, og }
  })

  const steamImages = SEO_PAGES.find((page) => page.id === 'steam-education')?.images ?? []
  const images =
    steamImages.length > 0
      ? analyzeAltText(
          steamImages.map((image) => ({
            src: image.src,
            alt: image.alt,
            loading: image.loading,
            isAboveFold: image.isAboveFold,
          })),
        )
      : null

  const graph = buildLinkGraph(
    SEO_PAGES.map((page) => ({
      url: getPageUrl(page),
      title: page.title,
      content: page.contentHtml,
      links: page.internalLinks.map((link) => (link.startsWith('http') ? link : `${SITE_URL}${link}`)),
    })),
  )

  const orphans = findOrphanPages(graph, [SITE_URL, `${SITE_URL}/`])
  const linkEquity = analyzeLinkEquity(graph).slice(0, 10)
  const marketingPriorities = collectMarketingPriorities(site, pages, orphans)

  return {
    generatedAt: new Date().toISOString(),
    siteUrl: SITE_URL,
    site,
    pages,
    images,
    orphans,
    linkEquity,
    marketingPriorities,
  }
}
