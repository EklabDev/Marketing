import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'SEO Analytics Redirect | EKLab',
  description: 'Redirects to the internal SEO analytics workspace.',
  path: '/seo-report',
  noindex: true,
  nofollow: true,
})

export default function SeoReportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
