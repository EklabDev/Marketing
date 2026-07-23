export const SITE_NAME = 'EKLab'
export const SITE_TAGLINE = 'Software Development, 3D Printing & STEAM Education'
export const SITE_DESCRIPTION =
  'EKLab specializes in software design and development, 3D printing design and product retail, and STEAM education.'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://eklab.xyz'

export const SITE_EMAIL = 'edward.wong@eklab.xyz'
export const SITE_PHONE = '416-837-2344'
export const SITE_ADDRESS = {
  streetAddress: '1908 15 Greenview Ave',
  addressLocality: 'Toronto',
  addressRegion: 'ON',
  addressCountry: 'CA',
} as const

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}
