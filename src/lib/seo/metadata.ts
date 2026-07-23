import { createMetadata } from '@power-seo/meta'
import type { Metadata } from 'next'
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
    ...createPageMetadata({
      title: `${SITE_NAME} - Software Development & 3D Printing`,
      description:
        'EKLab specializes in software design and development, 3D printing design and product retail, and STEAM education.',
      path: '/',
    }),
    metadataBase: new URL(absoluteUrl('/')),
  }
}
