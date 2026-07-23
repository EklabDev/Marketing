import { generateSeoMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  return generateSeoMetadata('contact')
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
