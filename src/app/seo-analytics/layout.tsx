import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'SEO Analytics | EKLab',
  description: 'Internal Power SEO analytics and metadata editor.',
  path: '/seo-analytics',
  noindex: true,
  nofollow: true,
})

export const dynamic = 'force-dynamic'

export default function SeoAnalyticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
