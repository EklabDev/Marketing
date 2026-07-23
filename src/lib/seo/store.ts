import { getDb, type PageMetadataRow } from './db'
import { SEO_PAGES, type SeoPageDefinition, type SeoPageId } from './pages'
import type { EditablePageMetadata } from './types'

export type { EditablePageMetadata } from './types'

function rowToEditable(row: PageMetadataRow): EditablePageMetadata {
  return {
    id: row.id as SeoPageId,
    path: row.path,
    title: row.title,
    description: row.description,
    focusKeyphrase: row.focus_keyphrase,
    noindex: row.noindex === 1,
    updatedAt: row.updated_at,
  }
}

export function listPageMetadata(): EditablePageMetadata[] {
  const rows = getDb()
    .prepare(
      `SELECT id, path, title, description, focus_keyphrase, noindex, updated_at
       FROM page_metadata
       ORDER BY path ASC`,
    )
    .all() as PageMetadataRow[]

  return rows.map(rowToEditable)
}

export function getPageMetadataById(id: SeoPageId): EditablePageMetadata | null {
  const row = getDb()
    .prepare(
      `SELECT id, path, title, description, focus_keyphrase, noindex, updated_at
       FROM page_metadata
       WHERE id = ?`,
    )
    .get(id) as PageMetadataRow | undefined

  return row ? rowToEditable(row) : null
}

export function getPageMetadataByPath(pagePath: string): EditablePageMetadata | null {
  const row = getDb()
    .prepare(
      `SELECT id, path, title, description, focus_keyphrase, noindex, updated_at
       FROM page_metadata
       WHERE path = ?`,
    )
    .get(pagePath) as PageMetadataRow | undefined

  return row ? rowToEditable(row) : null
}

export function updatePageMetadata(input: {
  id: SeoPageId
  title: string
  description: string
  focusKeyphrase: string
  noindex: boolean
}): EditablePageMetadata {
  const title = input.title.trim()
  const description = input.description.trim()
  const focusKeyphrase = input.focusKeyphrase.trim()

  if (!title || title.length > 120) {
    throw new Error('Title is required and must be 120 characters or fewer.')
  }
  if (!description || description.length > 320) {
    throw new Error('Description is required and must be 320 characters or fewer.')
  }
  if (focusKeyphrase.length > 80) {
    throw new Error('Focus keyphrase must be 80 characters or fewer.')
  }

  const updatedAt = new Date().toISOString()
  const result = getDb()
    .prepare(
      `UPDATE page_metadata
       SET title = ?, description = ?, focus_keyphrase = ?, noindex = ?, updated_at = ?
       WHERE id = ?`,
    )
    .run(
      title,
      description,
      focusKeyphrase,
      input.noindex ? 1 : 0,
      updatedAt,
      input.id,
    )

  if (result.changes === 0) {
    throw new Error(`Unknown page id: ${input.id}`)
  }

  const updated = getPageMetadataById(input.id)
  if (!updated) throw new Error(`Failed to load updated page: ${input.id}`)
  return updated
}

/** Merge SQLite overrides onto the static SEO page inventory for audits. */
export function getSeoPagesWithOverrides(): SeoPageDefinition[] {
  const overrides = new Map(listPageMetadata().map((row) => [row.id, row]))

  return SEO_PAGES.map((page) => {
    const override = overrides.get(page.id)
    if (!override) return page
    return {
      ...page,
      title: override.title,
      description: override.description,
      focusKeyphrase: override.focusKeyphrase || page.focusKeyphrase,
    }
  })
}
