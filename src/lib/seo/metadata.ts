import { createMetadata } from '@power-seo/meta'
import type { Metadata } from 'next'
import { getPageMetadataById, getPageMetadataByPath } from './store'
import type { SeoPageId } from './pages'
import { absoluteUrl, SITE_NAME } from './site'

export interface PageMetadataInput {
  title: string
  description: string
  path: string
  noindex?: boolean
  nofollow?: boolean
}

/** Build Next.js Metadata via @power-seo/meta with EKLab defaults. */
export function createPageMetadata({
  title,
  description,
  path,
  noindex = false,
  nofollow = false,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path)

  return createMetadata({
    title,
    description,
    canonical,
    noindex,
    nofollow,
    robots: {
      index: !noindex,
      follow: !nofollow,
      maxSnippet: 160,
      maxImagePreview: 'large',
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      url: canonical,
      title,
      description,
    },
    twitter: {
      cardType: 'summary_large_image',
      title,
      description,
    },
  }) as Metadata
}

export function createRootMetadata(): Metadata {
  return {
    metadataBase: new URL(absoluteUrl('/')),
    title: {
      default: `${SITE_NAME} - Software Development & 3D Printing`,
      template: `%s`,
    },
    description:
      'EKLab specializes in software design and development, 3D printing design and product retail, and STEAM education.',
  }
}

/** SSR metadata lookup from SQLite (falls back to defaults seeded in DB). */
export async function generateSeoMetadata(
  idOrPath: SeoPageId | string,
): Promise<Metadata> {
  const fromId = getPageMetadataById(idOrPath as SeoPageId)
  const row = fromId ?? getPageMetadataByPath(idOrPath)
  if (!row) {
    return createPageMetadata({
      title: SITE_NAME,
      description: 'EKLab marketing site',
      path: typeof idOrPath === 'string' && idOrPath.startsWith('/') ? idOrPath : '/',
    })
  }

  return createPageMetadata({
    title: row.title,
    description: row.description,
    path: row.path,
    noindex: row.noindex,
  })
}
