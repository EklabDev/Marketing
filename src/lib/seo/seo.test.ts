import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { auditPage } from '@power-seo/audit'
import { analyzeContent } from '@power-seo/content-analysis'
import { createMetadata } from '@power-seo/meta'
import { toNextSitemap } from '@power-seo/sitemap'
import { FAQ_ITEMS, SEO_PAGES } from './pages'
import { SITE_URL } from './site'
import { createPageMetadata } from './metadata'

async function main() {
  const tempDb = path.join(os.tmpdir(), `eklab-seo-test-${Date.now()}.db`)
  process.env.SQLITE_PATH = tempDb

  const { generateSeoReport } = await import('./report')
  const { updatePageMetadata, getPageMetadataById, listPageMetadata } = await import('./store')

  async function test(name: string, fn: () => void | Promise<void>) {
    try {
      await fn()
      console.log(`ok - ${name}`)
    } catch (error) {
      console.error(`not ok - ${name}`)
      throw error
    }
  }

  await test('creates Next metadata with canonical and open graph', () => {
    const meta = createMetadata({
      title: 'Test Page',
      description: 'A sufficiently long description for SEO metadata testing purposes.',
      canonical: `${SITE_URL}/test`,
      openGraph: { type: 'website', siteName: 'EKLab', url: `${SITE_URL}/test` },
    })

    assert.equal(meta.title, 'Test Page')
    assert.equal(meta.alternates?.canonical, `${SITE_URL}/test`)
    assert.equal(meta.openGraph?.siteName, 'EKLab')
  })

  await test('builds sitemap entries for public pages', () => {
    const urls = SEO_PAGES.filter((page) => page.includeInSitemap).map((page) => ({
      loc: page.path,
      priority: page.priority,
    }))
    const entries = toNextSitemap(urls, SITE_URL)
    assert.ok(entries.length >= 7)
    assert.ok(entries.every((entry) => entry.url.startsWith('http')))
  })

  await test('seeds sqlite metadata and supports updates', () => {
    const pages = listPageMetadata()
    assert.equal(pages.length, SEO_PAGES.length)

    const updated = updatePageMetadata({
      id: 'home',
      title: 'Updated Home Title For SEO Testing',
      description: 'Updated description that is long enough for SEO metadata quality checks.',
      focusKeyphrase: 'software development toronto',
      noindex: false,
    })

    assert.equal(updated.title, 'Updated Home Title For SEO Testing')
    assert.equal(getPageMetadataById('home')?.focusKeyphrase, 'software development toronto')
  })

  await test('audits inventory pages and produces a site report', () => {
    const report = generateSeoReport()
    assert.equal(report.pages.length, SEO_PAGES.length)
    assert.ok(report.site.totalPages === SEO_PAGES.length)
    assert.ok(report.marketingPriorities.length > 0)
    assert.ok(typeof report.site.score === 'number')
    assert.ok(report.pages.some((page) => page.page.title.includes('Updated Home Title')))
  })

  await test('scores homepage content analysis', () => {
    const home = SEO_PAGES[0]
    const content = analyzeContent({
      title: home.title,
      metaDescription: home.description,
      content: home.contentHtml,
      focusKeyphrase: home.focusKeyphrase,
    })
    assert.ok(content.maxScore > 0)
    assert.ok(Array.isArray(content.recommendations))
  })

  await test('keeps FAQ items aligned for schema', () => {
    assert.ok(FAQ_ITEMS.length >= 5)
    const audit = auditPage({
      url: `${SITE_URL}/faq`,
      title: 'FAQ',
      metaDescription: 'Common questions about EKLab services and how to contact the team.',
      headings: ['h2:Frequently Asked Questions'],
      wordCount: 180,
    })
    assert.ok(audit.score >= 0)
  })

  await test('marks seo-analytics metadata as noindex', () => {
    const meta = createPageMetadata({
      title: 'SEO Analytics',
      description: 'Internal report for marketing SEO analysis and prioritization work.',
      path: '/seo-analytics',
      noindex: true,
      nofollow: true,
    })
    assert.equal(meta.robots?.index, false)
    assert.equal(meta.robots?.follow, false)
  })

  try {
    fs.rmSync(tempDb)
    fs.rmSync(`${tempDb}-wal`, { force: true })
    fs.rmSync(`${tempDb}-shm`, { force: true })
  } catch {
    // ignore cleanup errors
  }

  console.log('All SEO integration tests passed')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
