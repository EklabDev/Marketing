const SESSION_TTL_MS = 1000 * 60 * 60 * 12

function getCredentials() {
  const username = process.env.SEO_ANALYTICS_USERNAME?.trim()
  const password = process.env.SEO_ANALYTICS_PASSWORD?.trim()
  return { username, password }
}

function getSessionSecret(): string {
  return (
    process.env.SEO_ANALYTICS_SECRET?.trim() ||
    process.env.SEO_ANALYTICS_PASSWORD?.trim() ||
    'dev-only-seo-analytics-secret'
  )
}

function bytesToBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)
  let binary = ''
  for (const byte of view) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function base64UrlToBytes(value: string): Uint8Array {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/')
  const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4))
  const binary = atob(padded + pad)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i)
  return bytes
}

function textToBytes(value: string): Uint8Array {
  return new TextEncoder().encode(value)
}

async function sign(value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    textToBytes(getSessionSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', key, textToBytes(value))
  return bytesToBase64Url(signature)
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return mismatch === 0
}

export const SEO_ANALYTICS_COOKIE = 'eklab_seo_analytics'

export function areAnalyticsCredentialsConfigured(): boolean {
  const { username, password } = getCredentials()
  return Boolean(username && password)
}

export function verifyAnalyticsCredentials(username: string, password: string): boolean {
  const expected = getCredentials()
  if (!expected.username || !expected.password) return false
  return (
    safeEqual(username, expected.username) && safeEqual(password, expected.password)
  )
}

export async function createAnalyticsSessionToken(username: string): Promise<string> {
  const payload = bytesToBase64Url(
    textToBytes(
      JSON.stringify({
        u: username,
        exp: Date.now() + SESSION_TTL_MS,
      }),
    ),
  )
  return `${payload}.${await sign(payload)}`
}

export async function isValidAnalyticsSessionToken(
  token: string | undefined | null,
): Promise<boolean> {
  if (!token) return false
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return false
  if (!safeEqual(await sign(payload), signature)) return false

  try {
    const json = new TextDecoder().decode(base64UrlToBytes(payload))
    const parsed = JSON.parse(json) as { u?: string; exp?: number }
    if (!parsed.u || typeof parsed.exp !== 'number') return false
    if (parsed.exp < Date.now()) return false
    const expected = getCredentials()
    return Boolean(expected.username && safeEqual(parsed.u, expected.username))
  } catch {
    return false
  }
}

export { SESSION_TTL_MS }
