'use client'

import { useState } from 'react'
import type { SeoReport } from '@/lib/seo/report'
import type { EditablePageMetadata } from '@/lib/seo/types'
import SeoReportView from './SeoReportView'
import MetadataEditor from './MetadataEditor'
import { logoutAction } from './actions'

export default function AnalyticsWorkspace({
  report,
  pages,
}: {
  report: SeoReport
  pages: EditablePageMetadata[]
}) {
  const [tab, setTab] = useState<'analytics' | 'metadata'>('analytics')

  return (
    <div>
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTab('analytics')}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                tab === 'analytics'
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Analytics
            </button>
            <button
              type="button"
              onClick={() => setTab('metadata')}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                tab === 'metadata'
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Edit metadata
            </button>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-sm text-slate-600 hover:text-slate-900 underline underline-offset-2"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>

      {tab === 'analytics' ? (
        <SeoReportView report={report} compactHeader />
      ) : (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Page metadata</h2>
          <MetadataEditor pages={pages} />
        </div>
      )}
    </div>
  )
}
