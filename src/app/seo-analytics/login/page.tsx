import { Suspense } from 'react'
import {
  areAnalyticsCredentialsConfigured,
} from '@/lib/auth/seo-session'
import LoginForm from '../LoginForm'

export default function SeoAnalyticsLoginPage() {
  const configured = areAnalyticsCredentialsConfigured()

  return (
    <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-teal-700">Internal access</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">SEO Analytics</h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in with the credentials configured in the server environment.
        </p>

        {!configured && (
          <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Set <code className="font-mono">SEO_ANALYTICS_USERNAME</code> and{' '}
            <code className="font-mono">SEO_ANALYTICS_PASSWORD</code> before signing in.
          </p>
        )}

        <div className="mt-6">
          <Suspense fallback={<p className="text-sm text-slate-500">Loading…</p>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
