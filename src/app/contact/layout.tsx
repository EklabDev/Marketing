import { createPageMetadata, getSeoPage } from '@/lib/seo'

const page = getSeoPage('contact')

export const metadata = createPageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
