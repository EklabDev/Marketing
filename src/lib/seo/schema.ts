import {
  faqPage,
  organization,
  schemaGraph,
  toJsonLdString,
  webSite,
} from '@power-seo/schema'
import { FAQ_ITEMS } from './pages'
import {
  SITE_ADDRESS,
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE,
  SITE_URL,
} from './site'

export function buildOrganizationSchema() {
  return organization({
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE_PHONE,
      contactType: 'customer service',
      email: SITE_EMAIL,
      areaServed: 'CA',
      availableLanguage: ['English'],
    },
    address: {
      '@type': 'PostalAddress',
      ...SITE_ADDRESS,
    },
    knowsAbout: [
      'Software development',
      '3D printing',
      'STEAM education',
      'TypeScript libraries',
    ],
  })
}

export function buildWebsiteSchema() {
  return webSite({
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  })
}

export function buildSiteGraphJsonLd(): string {
  return toJsonLdString(schemaGraph([buildOrganizationSchema(), buildWebsiteSchema()]))
}

export function buildFaqJsonLd(): string {
  return toJsonLdString(faqPage(FAQ_ITEMS))
}
