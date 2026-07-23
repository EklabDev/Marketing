import 'server-only'
import { cookies } from 'next/headers'
import {
  createAnalyticsSessionToken,
  isValidAnalyticsSessionToken,
  SEO_ANALYTICS_COOKIE,
  SESSION_TTL_MS,
} from './seo-session-token'

export {
  areAnalyticsCredentialsConfigured,
  SEO_ANALYTICS_COOKIE,
  verifyAnalyticsCredentials,
} from './seo-session-token'

export async function setAnalyticsSessionCookie(username: string) {
  const jar = await cookies()
  jar.set(SEO_ANALYTICS_COOKIE, await createAnalyticsSessionToken(username), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  })
}

export async function clearAnalyticsSessionCookie() {
  const jar = await cookies()
  jar.delete(SEO_ANALYTICS_COOKIE)
}

export async function hasAnalyticsSession(): Promise<boolean> {
  const jar = await cookies()
  return isValidAnalyticsSessionToken(jar.get(SEO_ANALYTICS_COOKIE)?.value)
}
