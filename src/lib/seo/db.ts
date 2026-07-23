import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'
import { SEO_PAGES } from './pages'

export interface PageMetadataRow {
  id: string
  path: string
  title: string
  description: string
  focus_keyphrase: string
  noindex: number
  updated_at: string
}

declare global {
  // eslint-disable-next-line no-var
  var __eklabSeoDb: Database.Database | undefined
}

function resolveDbPath(): string {
  return (
    process.env.SQLITE_PATH ||
    path.join(process.cwd(), 'data', 'seo.db')
  )
}

function seedDefaults(db: Database.Database) {
  const insert = db.prepare(`
    INSERT OR IGNORE INTO page_metadata
      (id, path, title, description, focus_keyphrase, noindex, updated_at)
    VALUES
      (@id, @path, @title, @description, @focus_keyphrase, @noindex, @updated_at)
  `)

  const now = new Date().toISOString()
  const tx = db.transaction(() => {
    for (const page of SEO_PAGES) {
      insert.run({
        id: page.id,
        path: page.path,
        title: page.title,
        description: page.description,
        focus_keyphrase: page.focusKeyphrase,
        noindex: 0,
        updated_at: now,
      })
    }
  })
  tx()
}

export function getDb(): Database.Database {
  if (globalThis.__eklabSeoDb) {
    return globalThis.__eklabSeoDb
  }

  const dbPath = resolveDbPath()
  fs.mkdirSync(path.dirname(dbPath), { recursive: true })

  const db = new Database(dbPath)
  db.pragma('journal_mode = WAL')
  db.exec(`
    CREATE TABLE IF NOT EXISTS page_metadata (
      id TEXT PRIMARY KEY,
      path TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      focus_keyphrase TEXT NOT NULL DEFAULT '',
      noindex INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL
    );
  `)
  seedDefaults(db)

  globalThis.__eklabSeoDb = db
  return db
}
