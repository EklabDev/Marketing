import { generateSeoMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  return generateSeoMetadata('software')
}

export default function SoftwareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
