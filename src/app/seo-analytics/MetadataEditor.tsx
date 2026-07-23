'use client'

import { useActionState } from 'react'
import { saveMetadataAction, type ActionState } from './actions'
import type { EditablePageMetadata } from '@/lib/seo/types'

const initialState: ActionState = { ok: false, message: '' }

function MetadataRow({ page }: { page: EditablePageMetadata }) {
  const [state, formAction, pending] = useActionState(saveMetadataAction, initialState)

  return (
    <form
      action={formAction}
      className="rounded-lg border border-slate-200 bg-white p-5 space-y-3"
    >
      <input type="hidden" name="id" value={page.id} />
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h3 className="font-semibold text-slate-900">{page.path}</h3>
          <p className="text-xs text-slate-500">Updated {new Date(page.updatedAt).toLocaleString()}</p>
        </div>
        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            name="noindex"
            defaultChecked={page.noindex}
            className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
          />
          noindex
        </label>
      </div>

      <div>
        <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">
          Title
        </label>
        <input
          name="title"
          defaultValue={page.title}
          required
          maxLength={120}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
      </div>

      <div>
        <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">
          Meta description
        </label>
        <textarea
          name="description"
          defaultValue={page.description}
          required
          maxLength={320}
          rows={3}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
      </div>

      <div>
        <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">
          Focus keyphrase
        </label>
        <input
          name="focusKeyphrase"
          defaultValue={page.focusKeyphrase}
          maxLength={80}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        {state.message ? (
          <p className={`text-sm ${state.ok ? 'text-teal-700' : 'text-rose-600'}`}>
            {state.message}
          </p>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-60"
        >
          {pending ? 'Saving…' : 'Save'}
        </button>
      </div>
    </form>
  )
}

export default function MetadataEditor({ pages }: { pages: EditablePageMetadata[] }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Edits are stored in SQLite and applied on the next SSR render of each public page.
      </p>
      {pages.map((page) => (
        <MetadataRow key={page.id} page={page} />
      ))}
    </div>
  )
}
