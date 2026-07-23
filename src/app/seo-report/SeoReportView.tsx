import type { SeoReport } from '@/lib/seo/report'
import { ScoreBadge, StatusDot } from './ScoreBadge'

export default function SeoReportView({ report }: { report: SeoReport }) {
  const generated = new Date(report.generatedAt).toLocaleString('en-CA', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <div className="bg-slate-50 min-h-full">
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-sm font-medium text-teal-700">Internal · Marketing</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
            SEO Report
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Powered by{' '}
            <a
              href="https://github.com/CyberCraftBD/power-seo"
              className="text-teal-700 underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              @power-seo
            </a>
            . Use this page to prioritize content, metadata, and internal-linking work.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Generated {generated} · Site {report.siteUrl}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Site health</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <ScoreBadge label="Overall" score={report.site.score} />
            <ScoreBadge label="Meta" score={report.site.summary.meta.score} />
            <ScoreBadge label="Content" score={report.site.summary.content.score} />
            <ScoreBadge label="Structure" score={report.site.summary.structure.score} />
            <ScoreBadge label="Performance" score={report.site.summary.performance.score} />
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Audited {report.site.totalPages} pages
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Marketing priorities
          </h2>
          <ol className="space-y-3 list-decimal list-inside bg-white border border-slate-200 rounded-lg p-5">
            {report.marketingPriorities.map((item) => (
              <li key={item} className="text-slate-700 leading-relaxed">
                {item}
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Top recurring issues</h2>
          <ul className="space-y-2">
            {report.site.topIssues.map((issue) => (
              <li
                key={`${issue.id}-${issue.title}`}
                className="flex items-start gap-3 bg-white border border-slate-200 rounded-lg px-4 py-3"
              >
                <StatusDot severity={issue.severity} />
                <div>
                  <p className="font-medium text-slate-900">{issue.title}</p>
                  <p className="text-sm text-slate-600">{issue.description}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-400 mt-1">
                    {issue.category} · {issue.severity}
                  </p>
                </div>
              </li>
            ))}
            {report.site.topIssues.length === 0 && (
              <li className="text-slate-600">No recurring issues detected.</li>
            )}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Page breakdown</h2>
          <div className="space-y-4">
            {report.pages
              .slice()
              .sort((a, b) => a.audit.score - b.audit.score)
              .map((entry) => (
                <article
                  key={entry.page.id}
                  className="bg-white border border-slate-200 rounded-lg p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {entry.page.path}
                      </h3>
                      <p className="text-sm text-slate-500">{entry.page.title}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        Focus: {entry.page.focusKeyphrase} · ~{entry.page.wordCount} words
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <ScoreBadge label="Audit" score={entry.audit.score} />
                      <ScoreBadge
                        label="Content"
                        score={
                          entry.content.maxScore
                            ? (entry.content.score / entry.content.maxScore) * 100
                            : entry.content.score
                        }
                      />
                      <ScoreBadge label="Read" score={entry.readability.score} />
                    </div>
                  </div>

                  <div className="mt-4 grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 mb-2">
                        SERP preview
                      </h4>
                      <div className="rounded border border-slate-200 p-3 bg-slate-50">
                        <p className="text-[#1a0dab] text-lg leading-snug">
                          {entry.serp.title}
                          {entry.serp.titleTruncated ? '…' : ''}
                        </p>
                        <p className="text-[#006621] text-sm mt-1">{entry.serp.displayUrl}</p>
                        <p className="text-sm text-slate-600 mt-1">
                          {entry.serp.description}
                          {entry.serp.descriptionTruncated ? '…' : ''}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 mb-2">
                        Recommendations
                      </h4>
                      <ul className="space-y-1.5 text-sm text-slate-700">
                        {entry.audit.recommendations.slice(0, 4).map((rec) => (
                          <li key={rec} className="flex gap-2">
                            <span className="text-teal-600">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                        {entry.content.recommendations.slice(0, 2).map((rec) => (
                          <li key={`c-${rec}`} className="flex gap-2">
                            <span className="text-amber-600">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Link equity</h2>
            <ul className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-100">
              {report.linkEquity.map((node) => (
                <li key={node.url} className="px-4 py-3 flex justify-between gap-3 text-sm">
                  <span className="text-slate-700 break-all">
                    {node.url.replace(report.siteUrl, '') || '/'}
                  </span>
                  <span className="tabular-nums text-slate-900 font-medium">
                    {node.score.toFixed(3)} · {node.inboundCount} in
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Orphan / low inbound</h2>
            <ul className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-100">
              {report.orphans.length === 0 && (
                <li className="px-4 py-3 text-sm text-slate-600">No orphan pages found.</li>
              )}
              {report.orphans.map((page) => (
                <li key={page.url} className="px-4 py-3 text-sm text-slate-700 break-all">
                  {page.url.replace(report.siteUrl, '') || '/'}
                  <span className="block text-xs text-slate-400 mt-1">
                    {page.outboundCount} outbound links
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {report.images && (
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Image SEO</h2>
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <div className="flex items-center gap-4 mb-3">
                <ScoreBadge
                  label="Alt text"
                  score={
                    report.images.maxScore
                      ? (report.images.score / report.images.maxScore) * 100
                      : report.images.score
                  }
                />
                <p className="text-sm text-slate-600">
                  {report.images.totalImages} images analyzed (STEAM Education)
                </p>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                {report.images.recommendations.map((rec) => (
                  <li key={rec}>• {rec}</li>
                ))}
                {report.images.recommendations.length === 0 && (
                  <li>No image recommendations.</li>
                )}
              </ul>
            </div>
          </section>
        )}

        <p className="text-xs text-slate-400 pb-8">
          This report is noindex and excluded from robots.txt. Revisit after content updates
          to refresh scores.
        </p>
      </div>
    </div>
  )
}
