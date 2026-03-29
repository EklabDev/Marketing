## Context

The marketing site is **Next.js** (`src/app/`), with an existing **Route Handler** pattern (`src/app/api/contact/route.ts`). Production runs as a **Docker** image built with a multi-stage Dockerfile that outputs the **Next.js standalone** server (`node server.js`). The Vector Client invoke contract is documented in `vendorapi/vectorclient-openapi.yml` (`POST /api/v1/endpoints/{endpoint_id}/{user_id}`, body JSON with `session_id` and `chat_message`, `x-api-key` header).

The **proposal** requires a server-side proxy so the API token is not shipped to browsers.

## Goals / Non-Goals

**Goals:**

- Ship a floating **EKLAB-branded chatbot** on the marketing site with a fixed **welcome message** before the user sends anything.
- Proxy chat traffic through a **Next.js API route** so `endpoint_id`, `user_id`, and **API token** exist only in **server** environment variables.
- Enforce **client-side rate limiting**: at most **10** outbound chat requests to the app’s API per **rolling 60-second** window per browser; surface a friendly error when throttled.
- Persist **`session_id`** in the browser across visits (same device/profile), with a **Clear session** control that generates a new `session_id` and clears visible chat history.
- Document **`.env`** variables and align **GitHub Actions** so operators know which **repository/org secrets** to set for deployment (without baking secrets into the image at build time).

**Non-Goals:**

- Authenticating site visitors as distinct humans (anonymous chat is enough; `user_id` is a configured integration id, not end-user identity).
- Admin UI for prompts or endpoint configuration inside the marketing app.
- Changing the Vector Client OpenAPI file or backend behavior.
- **Server-side rate limiting** of calls to the Vector Client API beyond what the **API provider** already enforces — provider quotas/throttles are **out of scope** for this project.

## Decisions

1. **Proxy: Next.js Route Handler**  
   - **Choice:** `POST /api/...` (e.g. `src/app/api/chat/route.ts`) accepts `{ session_id, chat_message }` from the client, validates input, then `fetch`es the upstream URL server-side with `x-api-key`.  
   - **Rationale:** Matches existing `api/contact` style; keeps secrets off the client; works with standalone Docker as long as runtime env is set.  
   - **Alternative considered:** Call Vector Client directly from the browser with token in env — **rejected** (exposes token; proposal forbids).

2. **Environment variables (server-only)**  
   - **Choice:** Use namespaced, explicit names (exact strings finalized in implementation, documented in `.env.example`):  
     - Base URL: e.g. `CHATBOT_VECTOR_API_URL` defaulting to `https://vectorclientapi.eklab.xyz` (override for staging).  
     - `CHATBOT_ENDPOINT_ID`, `CHATBOT_USER_ID`, `CHATBOT_API_TOKEN` (or `VECTOR_CLIENT_*` — pick one prefix and use consistently).  
   - **Rationale:** No `NEXT_PUBLIC_*` for token or path segments; avoids accidental client bundling.  
   - **Alternative considered:** `NEXT_PUBLIC_ENDPOINT_ID` — **rejected** (unnecessary exposure; proxy hides all three).

3. **Session id lifecycle**  
   - **Choice:** Client generates a **UUID** (e.g. `crypto.randomUUID()`); store in **`localStorage`** under a stable key. **Clear session** removes the key, generates a new UUID, and resets UI message list (welcome shown again).  
   - **Rationale:** Satisfies “per session” with user-controlled reset; survives refresh; simple.  
   - **Alternative considered:** `sessionStorage` — **deferred** (loses session on tab close; acceptable variant if product prefers stricter “session”).

4. **Welcome message**  
   - **Choice:** Render as **initial assistant content in the UI only** (no upstream request until the user sends a message). Copy states clearly that this is **EKLAB’s** site chatbot.  
   - **Rationale:** Avoids fake/empty API calls; predictable UX.

5. **Layout placement**  
   - **Choice:** Mount a small **client** chat shell from **`src/app/layout.tsx`** (e.g. `<ChatbotWidget />`) so the bot is available on all marketing pages.  
   - **Rationale:** Global assistant; one integration point.

6. **GitHub Actions / Docker**  
   - **Choice:** Do **not** pass `CHATBOT_API_TOKEN` (or other secrets) as Docker **`build-arg`** into the image in `docker-publish.yml`. Treat secrets as **runtime** environment for whatever runs the container (host, platform, or a future deploy job).  
   - **Rationale:** Layers can leak build args; image is pushed to a registry.  
   - **Complement:** Add workflow **documentation** (comment or small job doc) listing required secret **names** for operators, and/or a **sample** `docker run -e` for internal use. If a later workflow deploys the same image, that job should inject env from GitHub Secrets at deploy time—not at build time.

7. **Upstream response handling**  
   - **Choice:** Vector Client returns a JSON object with an **`output`** string (assistant text), for example:
     ```json
     { "output": "…assistant message…" }
     ```
     The Route Handler parses `output`, validates it is a non-empty string, and returns a **stable** JSON shape to the browser (e.g. `{ "reply": "<value of output>" }`). On missing/invalid `output`, return 502 with a generic client message and log the body server-side.  
   - **Rationale:** Matches observed production behavior; keeps the UI decoupled if the proxy later adds fields or renames externally.

8. **Rate limiting (frontend only)**  
   - **Choice:** In the chat **client component**, before `fetch`ing the app’s `POST /api/...` route, enforce **maximum 10 requests per rolling 60 seconds** (track timestamps in memory or `sessionStorage`; sliding window is fine). Block the send, show inline copy such as a cooldown message, and do not call the API until a slot is available.  
   - **Rationale:** Product asked for a lightweight guard without requiring server-side state; reduces accidental abuse and noisy traffic.  
   - **Out of scope:** **Server-side / upstream** rate limiting is enforced by the **API provider** (Vector Client host). The marketing app does not implement additional server-side rate limits for the provider; handle provider error responses in the proxy as generic failures when they occur.

## Risks / Trade-offs

- **[Risk]** Upstream adds fields or changes error shape → **Mitigation:** Keep parsing isolated in the Route Handler; treat unknown success shapes as errors until updated.  
- **[Risk]** Missing env in production → chat returns 503/500 → **Mitigation:** Startup or first-request check optional; clear log line; `.env.example` and workflow comments.  
- **[Risk]** Abuse of public `/api/chat` → **Mitigation:** Frontend 10/min cap per browser; upstream throttling is the **provider’s** responsibility (out of scope to duplicate here).  
- **[Trade-off]** `localStorage` ties “session” to browser profile, not legal session — acceptable for marketing FAQ use.

## Migration Plan

1. Add `.env.example` with placeholder variable names (no real secrets).  
2. Implement route + UI; verify locally with real `.env`.  
3. Configure **runtime** environment on the deployment target (or future CD job) using GitHub-stored secrets where applicable.  
4. Build and push image as today; **no** secret embedded in image.  
5. **Rollback:** Remove widget from layout and disable route; no DB migrations.

## Open Questions

- None. Provider-side rate limiting is **out of scope**; no duplicate limiter in the marketing app.
