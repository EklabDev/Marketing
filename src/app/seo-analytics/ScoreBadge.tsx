function scoreTone(score: number): string {
  if (score >= 80) return 'text-teal-700 bg-teal-50 border-teal-200'
  if (score >= 60) return 'text-amber-700 bg-amber-50 border-amber-200'
  return 'text-rose-700 bg-rose-50 border-rose-200'
}

export function ScoreBadge({ label, score }: { label: string; score: number }) {
  return (
    <div className={`rounded-lg border px-4 py-3 ${scoreTone(score)}`}>
      <p className="text-xs font-medium uppercase tracking-wide opacity-80">{label}</p>
      <p className="mt-1 text-3xl font-bold tabular-nums">{Math.round(score)}</p>
    </div>
  )
}

export function StatusDot({ severity }: { severity: string }) {
  const color =
    severity === 'pass'
      ? 'bg-teal-500'
      : severity === 'warning' || severity === 'ok'
        ? 'bg-amber-500'
        : severity === 'info' || severity === 'na'
          ? 'bg-slate-400'
          : 'bg-rose-500'

  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${color}`} aria-hidden />
}
