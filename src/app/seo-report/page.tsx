import { generateSeoReport } from '@/lib/seo'
import SeoReportView from './SeoReportView'

export default function SeoReportPage() {
  const report = generateSeoReport()
  return <SeoReportView report={report} />
}
