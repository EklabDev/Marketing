import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'SEO Analytics Login | EKLab',
  description: 'Sign in to the internal Power SEO analytics workspace.',
  path: '/seo-analytics/login',
  noindex: true,
  nofollow: true,
})

export default function SeoAnalyticsLoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
