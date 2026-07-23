'use server'

import { redirect } from 'next/navigation'
import {
  clearAnalyticsSessionCookie,
  setAnalyticsSessionCookie,
  verifyAnalyticsCredentials,
  areAnalyticsCredentialsConfigured,
} from '@/lib/auth/seo-session'
import { updatePageMetadata } from '@/lib/seo/store'
import type { SeoPageId } from '@/lib/seo/pages'
import { revalidatePath } from 'next/cache'

export type ActionState = {
  ok: boolean
  message: string
}

export async function loginAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!areAnalyticsCredentialsConfigured()) {
    return {
      ok: false,
      message:
        'SEO analytics credentials are not configured. Set SEO_ANALYTICS_USERNAME and SEO_ANALYTICS_PASSWORD.',
    }
  }

  const username = String(formData.get('username') || '')
  const password = String(formData.get('password') || '')
  const nextPath = String(formData.get('next') || '/seo-analytics')

  if (!verifyAnalyticsCredentials(username, password)) {
    return { ok: false, message: 'Invalid username or password.' }
  }

  await setAnalyticsSessionCookie(username)
  redirect(nextPath.startsWith('/seo-analytics') ? nextPath : '/seo-analytics')
}

export async function logoutAction() {
  await clearAnalyticsSessionCookie()
  redirect('/seo-analytics/login')
}

export async function saveMetadataAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const id = String(formData.get('id') || '') as SeoPageId
    const title = String(formData.get('title') || '')
    const description = String(formData.get('description') || '')
    const focusKeyphrase = String(formData.get('focusKeyphrase') || '')
    const noindex = formData.get('noindex') === 'on'

    const updated = updatePageMetadata({
      id,
      title,
      description,
      focusKeyphrase,
      noindex,
    })

    revalidatePath(updated.path)
    revalidatePath('/seo-analytics')
    revalidatePath('/sitemap.xml')

    return {
      ok: true,
      message: `Saved metadata for ${updated.path}`,
    }
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : 'Failed to save metadata.',
    }
  }
}
