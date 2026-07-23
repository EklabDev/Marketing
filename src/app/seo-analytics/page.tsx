import { generateSeoReport, listPageMetadata } from '@/lib/seo'
import AnalyticsWorkspace from './AnalyticsWorkspace'

export const dynamic = 'force-dynamic'

export default function SeoAnalyticsPage() {
  const report = generateSeoReport()
  const pages = listPageMetadata()
  return <AnalyticsWorkspace report={report} pages={pages} />
}
