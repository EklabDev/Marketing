import { NextResponse, type NextRequest } from 'next/server'
import {
  isValidAnalyticsSessionToken,
  SEO_ANALYTICS_COOKIE,
} from '@/lib/auth/seo-session-token'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(SEO_ANALYTICS_COOKIE)?.value
  const authenticated = await isValidAnalyticsSessionToken(token)

  if (pathname === '/seo-analytics/login') {
    if (authenticated) {
      const destination = request.nextUrl.clone()
      destination.pathname = '/seo-analytics'
      destination.search = ''
      return NextResponse.redirect(destination)
    }
    return NextResponse.next()
  }

  if (authenticated) {
    return NextResponse.next()
  }

  const loginUrl = request.nextUrl.clone()
  loginUrl.pathname = '/seo-analytics/login'
  loginUrl.searchParams.set('next', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/seo-analytics', '/seo-analytics/:path*'],
}
