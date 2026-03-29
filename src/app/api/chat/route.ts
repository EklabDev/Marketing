import { NextResponse } from 'next/server'

function getConfig() {
  const baseRaw =
    process.env.CHATBOT_VECTOR_API_URL?.trim() ||
    'https://vectorclientapi.eklab.xyz'
  const base = baseRaw.replace(/\/+$/, '')
  return {
    base,
    endpointId: process.env.CHATBOT_ENDPOINT_ID?.trim(),
    userId: process.env.CHATBOT_USER_ID?.trim(),
    token: process.env.CHATBOT_API_TOKEN?.trim(),
  }
}

export async function POST(request: Request) {
  const { base, endpointId, userId, token } = getConfig()
  if (!endpointId || !userId || !token) {
    console.error('Chat proxy: missing CHATBOT_ENDPOINT_ID, CHATBOT_USER_ID, or CHATBOT_API_TOKEN')
    return NextResponse.json(
      { error: 'Chat is temporarily unavailable.' },
      { status: 503 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { session_id: sessionId, chat_message: chatMessage } = body as Record<
    string,
    unknown
  >

  if (typeof sessionId !== 'string' || sessionId.trim() === '') {
    return NextResponse.json({ error: 'session_id is required.' }, { status: 400 })
  }
  if (typeof chatMessage !== 'string' || chatMessage.trim() === '') {
    return NextResponse.json({ error: 'chat_message is required.' }, { status: 400 })
  }

  const url = `${base}/api/v1/endpoints/${encodeURIComponent(endpointId)}/${encodeURIComponent(userId)}`

  let upstream: Response
  try {
    upstream = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': token,
      },
      body: JSON.stringify({
        session_id: sessionId.trim(),
        chat_message: chatMessage.trim(),
      }),
    })
  } catch (err) {
    console.error('Chat proxy: upstream fetch failed', err)
    return NextResponse.json(
      { error: 'Could not reach the assistant. Please try again later.' },
      { status: 502 }
    )
  }

  const text = await upstream.text()
  let data: unknown
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    console.error('Chat proxy: upstream returned non-JSON', text.slice(0, 500))
    return NextResponse.json(
      { error: 'The assistant returned an unexpected response.' },
      { status: 502 }
    )
  }

  if (!upstream.ok) {
    console.error('Chat proxy: upstream HTTP', upstream.status, text.slice(0, 500))
    return NextResponse.json(
      { error: 'The assistant could not complete your request. Please try again later.' },
      { status: 502 }
    )
  }

  if (!data || typeof data !== 'object') {
    console.error('Chat proxy: missing JSON object', text.slice(0, 500))
    return NextResponse.json(
      { error: 'The assistant returned an unexpected response.' },
      { status: 502 }
    )
  }

  const output = (data as Record<string, unknown>).output
  if (typeof output !== 'string' || output.trim() === '') {
    console.error('Chat proxy: missing or invalid output field', text.slice(0, 500))
    return NextResponse.json(
      { error: 'The assistant returned an unexpected response.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ reply: output })
}
