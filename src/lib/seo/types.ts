import type { SeoPageId } from './pages'

export type EditablePageMetadata = {
  id: SeoPageId
  path: string
  title: string
  description: string
  focusKeyphrase: string
  noindex: boolean
  updatedAt: string
}
