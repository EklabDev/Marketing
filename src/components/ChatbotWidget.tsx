'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const SESSION_STORAGE_KEY = 'eklab-chat-session-id'
const RATE_TIMES_KEY = 'eklab-chat-send-times'
const RATE_WINDOW_MS = 60_000
const MAX_SENDS_PER_WINDOW = 10

const WELCOME_MESSAGE =
  "Hi — I'm the EKLAB site chatbot. Ask me about our software development, 3D printing, STEAM education, or how we can help. How can I help you today?"

type ChatRole = 'user' | 'assistant'

type ChatLine = { role: ChatRole; content: string }

function readRateTimestamps(): number[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = sessionStorage.getItem(RATE_TIMES_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter((n): n is number => typeof n === 'number')
  } catch {
    return []
  }
}

function writeRateTimestamps(times: number[]) {
  sessionStorage.setItem(RATE_TIMES_KEY, JSON.stringify(times))
}

function pruneAndCount(times: number[], now: number): number[] {
  return times.filter((t) => now - t < RATE_WINDOW_MS)
}

function getOrCreateSessionId(): string {
  let id = localStorage.getItem(SESSION_STORAGE_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(SESSION_STORAGE_KEY, id)
  }
  return id
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatLine[]>([
    { role: 'assistant', content: WELCOME_MESSAGE },
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [throttleMessage, setThrottleMessage] = useState<string | null>(null)
  const sessionIdRef = useRef<string>('')

  useEffect(() => {
    sessionIdRef.current = getOrCreateSessionId()
  }, [])

  const clearSession = useCallback(() => {
    localStorage.removeItem(SESSION_STORAGE_KEY)
    sessionStorage.removeItem(RATE_TIMES_KEY)
    sessionIdRef.current = crypto.randomUUID()
    localStorage.setItem(SESSION_STORAGE_KEY, sessionIdRef.current)
    setMessages([{ role: 'assistant', content: WELCOME_MESSAGE }])
    setError(null)
    setThrottleMessage(null)
    setInput('')
  }, [])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return

    const now = Date.now()
    const pruned = pruneAndCount(readRateTimestamps(), now)
    if (pruned.length >= MAX_SENDS_PER_WINDOW) {
      setThrottleMessage(
        'You’ve sent several messages quickly. Please wait up to a minute before sending more.'
      )
      return
    }
    setThrottleMessage(null)

    const sid = sessionIdRef.current || getOrCreateSessionId()
    sessionIdRef.current = sid

    setInput('')
    setError(null)
    setMessages((m) => [...m, { role: 'user', content: text }])
    setLoading(true)

    const postAt = Date.now()
    const nextTimes = [...pruneAndCount(readRateTimestamps(), postAt), postAt]
    writeRateTimestamps(nextTimes)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sid,
          chat_message: text,
        }),
      })

      let data: { reply?: string; error?: string } = {}
      try {
        data = (await res.json()) as { reply?: string; error?: string }
      } catch {
        data = {}
      }

      if (!res.ok) {
        setMessages((m) => m.slice(0, -1))
        setError(data.error || 'Something went wrong. Please try again.')
        return
      }

      const reply = data.reply
      if (typeof reply !== 'string' || !reply.trim()) {
        setMessages((m) => m.slice(0, -1))
        setError('Something went wrong. Please try again.')
        return
      }

      setMessages((m) => [...m, { role: 'assistant', content: reply }])
    } catch {
      setMessages((m) => m.slice(0, -1))
      setError('Could not reach the server. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [input, loading])

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2">
      {open && (
        <div
          className="flex w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
          role="dialog"
          aria-label="EKLAB chat"
        >
          <div className="flex items-center justify-between border-b border-gray-100 bg-teal-600 px-3 py-2 text-white">
            <span className="text-sm font-semibold">EKLAB Chat</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={clearSession}
                className="rounded px-2 py-0.5 text-xs font-medium text-white/90 hover:bg-teal-700"
              >
                Clear session
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded px-2 py-0.5 text-sm hover:bg-teal-700"
                aria-label="Close chat"
              >
                ×
              </button>
            </div>
          </div>
          <div className="max-h-72 space-y-2 overflow-y-auto p-3 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.role === 'user'
                    ? 'ml-6 rounded-lg bg-gray-100 px-3 py-2 text-gray-900'
                    : 'mr-4 rounded-lg border border-teal-100 bg-teal-50/80 px-3 py-2 text-gray-800'
                }
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="mr-4 text-xs italic text-gray-500">Thinking…</div>
            )}
          </div>
          {error && (
            <div className="border-t border-red-100 bg-red-50 px-3 py-2 text-xs text-red-800">
              {error}
            </div>
          )}
          {throttleMessage && (
            <div className="border-t border-amber-100 bg-amber-50 px-3 py-2 text-xs text-amber-900">
              {throttleMessage}
            </div>
          )}
          <div className="border-t border-gray-100 p-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    void sendMessage()
                  }
                }}
                placeholder="Type a message…"
                className="min-w-0 flex-1 rounded border border-gray-300 px-2 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                disabled={loading}
                aria-label="Chat message"
              />
              <button
                type="button"
                onClick={() => void sendMessage()}
                disabled={loading || !input.trim()}
                className="rounded bg-teal-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-white shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        aria-expanded={open}
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.32 48.32 0 01-3.476.365.746.746 0 00-.64.028l-3.962 1.98A.75.75 0 018 18.25v-1.443a49.157 49.157 0 01-4.152-.386C2.055 16.356 1 14.796 1 13.07V7.004c0-1.726 1.055-3.286 2.848-3.233zM8 16.5c.93 0 1.804-.14 2.596-.396.456-.12.916-.27 1.378-.45L8 17.75v-1.25zm6.75-1.25v1.25l4.222-2.111c.458-.23.908-.42 1.348-.57a3.25 3.25 0 002.848-3.196V7.004c0-1.47-1.014-2.75-2.458-2.97A47.722 47.722 0 0012 4.5c-1.897 0-3.743.17-5.514.495-1.444.22-2.458 1.5-2.458 2.97v6.02c0 1.47 1.014 2.75 2.458 2.97.87.133 1.756.23 2.652.29V15z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}
