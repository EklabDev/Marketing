import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'SEO Report (Internal) | EKLab',
  description:
    'Internal Power SEO audit and marketing insights for the EKLab marketing site.',
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
