import { createPageMetadata, getSeoPage } from '@/lib/seo'

const page = getSeoPage('software')

export const metadata = createPageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
})

export default function SoftwareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
