## 1. Configuration and documentation

- [x] 1.1 Add `.env.example` with `CHATBOT_VECTOR_API_URL`, `CHATBOT_ENDPOINT_ID`, `CHATBOT_USER_ID`, and `CHATBOT_API_TOKEN` (placeholder values only; document defaults for URL per `design.md`).
- [x] 1.2 Update `.github/workflows/docker-publish.yml` with comments listing runtime env vars / secret names operators must set when running the container (no `build-arg` for API token).

## 2. Chat API route (server proxy)

- [x] 2.1 Add `POST` Route Handler (e.g. `src/app/api/chat/route.ts`) that validates JSON body `session_id` and `chat_message` (both non-empty strings).
- [x] 2.2 Implement upstream `fetch` to `{CHATBOT_VECTOR_API_URL}/api/v1/endpoints/{CHATBOT_ENDPOINT_ID}/{CHATBOT_USER_ID}` with body `{ session_id, chat_message }` and header `x-api-key: CHATBOT_API_TOKEN`.
- [x] 2.3 Parse successful JSON for string `output`; return `{ "reply": output }` to the client; on missing/invalid `output` return 502 with generic message and log server-side.
- [x] 2.4 Map upstream/network failures to generic client errors without leaking secrets.

## 3. Chatbot UI (client)

- [x] 3.1 Create a client chat widget with floating open/close control, message list, and input; show fixed EKLAB welcome copy as first assistant content (no API call for welcome).
- [x] 3.2 Persist `session_id` in `localStorage` (generate with `crypto.randomUUID()` when absent).
- [x] 3.3 Implement **Clear session**: remove storage key, new UUID, clear transcript, restore welcome message.
- [x] 3.4 Enforce rolling **60-second** window: at most **10** POSTs to the app chat route; on block, show clear user-facing throttle message.
- [x] 3.5 On send, call the chat route and append assistant `reply` to the transcript; handle loading and error states.

## 4. Integration

- [x] 4.1 Mount the chat widget from `src/app/layout.tsx` so it appears on all pages under the root layout.
- [x] 4.2 Align styling with existing Tailwind patterns (navigation/footer) for a cohesive look.

## 5. Verification

- [x] 5.1 Run `npm run lint` and fix any new issues. _(Next 16 CLI: `next lint` is not available as a subcommand in this version; verified with `npx tsc --noEmit` and `npm run build`.)_
- [ ] 5.2 Manually verify: welcome only, send message, `reply` displays, clear session resets id and UI, eleventh send within a minute is blocked with message, misconfigured env returns safe error.
