## Why

The marketing site should offer an on-site assistant so visitors can ask questions about EKLAB without leaving the page. Integrating the existing Vector Client invoke API (`POST /api/v1/endpoints/:endpoint_id/:user_id`) makes that possible with a consistent backend and clear configuration via environment variables and CI secrets.

## What Changes

- Add an embedded chatbot UI to the company marketing site (Next.js) with a short **welcome message** that identifies it as the EKLAB chatbot.
- Send each user message to `https://vectorclientapi.eklab.xyz/api/v1/endpoints/:endpoint_id/:user_id` with JSON body `{ "session_id", "chat_message" }` and authenticate using the **`x-api-key`** header (API token).
- **Session handling**: Maintain a `session_id` per browser session (or equivalent client-side persistence). Provide a **clear session** action that discards the current session and generates a new `session_id` for subsequent API calls.
- **Configuration**: Support `endpoint_id`, `user_id`, and API token via **`.env`** for local/dev (and document expected variable names). **Do not** commit secrets; wire **GitHub Actions** (e.g. Docker build/push workflow) to inject these values from repository secrets at build or deploy time as appropriate for how the app is run.
- Use a **server-side API route** proxy for the chat request so the API token is not exposed in the browser (see `design.md`).
- **Upstream success response** (observed): JSON body includes an **`output`** string with the assistant reply; the proxy should parse this and expose a stable shape to the UI.
- **Rate limiting (frontend)**: At most **10 chat requests per rolling 60 seconds** per browser (enforce in the client before calling the app’s chat API); show a clear message when the user hits the limit.

## Capabilities

### New Capabilities

- `marketing-site-chatbot`: Embedded marketing-site chat UI, EKLAB-branded welcome copy, session lifecycle (persisted `session_id`, user-initiated clear → new `session_id`), integration with Vector Client invoke API (including `output`-shaped responses), client-side rate limit (10 requests / minute), and configuration via env + GitHub workflow secrets.

### Modified Capabilities

- _None._ There are no existing capability specs under `openspec/specs/` to amend.

## Impact

- **Application**: Next.js marketing app (pages/components, possible API routes or server actions).
- **Operations**: `.env` / `.env.example` documentation; `.github/workflows` (e.g. `docker-publish.yml`) extended with secrets for `endpoint_id`, `user_id`, and API token (exact secret names to align with implementation).
- **External**: `vectorclientapi.eklab.xyz` — contract matches `vendorapi/vectorclient-openapi.yml` path `/api/v1/endpoints/{endpoint_id}/{user_id}` and `x-api-key` security scheme. **Server-side rate limiting** of that API is owned by the **provider**; out of scope for the marketing app (aside from handling errors the provider returns).
- **Repository**: `vendorapi/vectorclient-openapi.yml` remains the reference OpenAPI; no requirement to change it for this feature unless the invoke body schema is tightened later.
