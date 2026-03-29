## ADDED Requirements

### Requirement: Global chatbot entry point

The system SHALL expose a chat entry control on all marketing site pages and SHALL identify the assistant as EKLAB’s site chatbot before any user message is sent.

#### Scenario: Visitor opens any page

- **WHEN** a visitor loads any page that uses the root application layout
- **THEN** a chatbot affordance is available without navigating away
- **AND** the chat surface shows a fixed welcome message that clearly states it is the EKLAB chatbot
- **AND** no upstream Vector Client request is made solely to render that welcome message

### Requirement: Client session identifier

The system SHALL maintain a `session_id` for the chat client and SHALL allow the visitor to start a new session.

#### Scenario: First visit

- **WHEN** the visitor opens the chat and no stored session id exists for that browser storage key
- **THEN** the client generates a new `session_id` (e.g. UUID) and persists it for later messages

#### Scenario: Clear session

- **WHEN** the visitor invokes a clear-session action
- **THEN** the stored `session_id` is removed
- **AND** a new `session_id` is generated for subsequent messages
- **AND** prior chat transcript shown in the UI is cleared
- **AND** the welcome message is shown again as the initial assistant content

### Requirement: Frontend request rate limit

The system SHALL limit how often the browser may call the marketing app’s chat API.

#### Scenario: Under the limit

- **WHEN** the visitor sends a chat message and fewer than ten such sends have occurred in the preceding rolling sixty-second window in that browser
- **THEN** the client proceeds to call the app’s chat API

#### Scenario: At the limit

- **WHEN** the visitor attempts to send a chat message and ten sends have already occurred in the preceding rolling sixty-second window in that browser
- **THEN** the client does not call the app’s chat API for that attempt
- **AND** the user sees a clear message that they must wait before sending again

### Requirement: Server-side chat proxy

The system SHALL implement a Next.js Route Handler that accepts chat requests from the browser and forwards them to the Vector Client invoke endpoint without exposing server-only secrets to the client.

#### Scenario: Valid chat request

- **WHEN** the client sends `POST` to the app’s chat route with JSON containing non-empty `session_id` and `chat_message`
- **AND** required server environment variables for base URL, endpoint id, user id, and API token are set
- **THEN** the handler requests `POST` to the configured Vector Client URL path `/api/v1/endpoints/{endpoint_id}/{user_id}` with the same `session_id` and `chat_message` in the JSON body
- **AND** the handler sends the `x-api-key` header using the configured API token
- **AND** the handler does not require or accept the API token from the request body or browser-supplied headers for authentication to the upstream API

#### Scenario: Missing or invalid client input

- **WHEN** the client sends a request without required fields or with empty `session_id` or `chat_message`
- **THEN** the handler responds with a 4xx status and does not call the upstream API

#### Scenario: Missing server configuration

- **WHEN** a chat request is received but a required server environment variable is unset
- **THEN** the handler responds with an error status suitable for a misconfigured server and does not leak secret values in the response body

### Requirement: Upstream success response mapping

The system SHALL interpret a successful Vector Client response that contains an `output` string and SHALL return a stable JSON shape to the client.

#### Scenario: Valid upstream body

- **WHEN** the upstream responds with a JSON body containing a non-empty string `output`
- **THEN** the Route Handler returns JSON to the browser including the assistant text in a stable field (e.g. `reply`) derived from `output`

#### Scenario: Invalid or missing output

- **WHEN** the upstream responds with success HTTP status but the body lacks a usable string `output`
- **THEN** the Route Handler responds with 502 (or equivalent) and a generic error message to the client
- **AND** diagnostic details are logged server-side only

### Requirement: Upstream and provider errors

The system SHALL treat failures from the Vector Client host, including provider-enforced rate limits or quotas, as upstream errors without implementing duplicate server-side rate limiting for the provider API.

#### Scenario: Upstream HTTP error

- **WHEN** the Vector Client returns a non-success HTTP status or the request fails at the network layer
- **THEN** the Route Handler returns an error response with a generic message to the client
- **AND** the response does not include the API token or other secrets

### Requirement: Configuration documentation

The system SHALL document required server environment variable names and SHALL not commit real secret values.

#### Scenario: Developer setup

- **WHEN** a developer clones the repository
- **THEN** `.env.example` lists the variables needed for the chat proxy (including base URL, endpoint id, user id, and API token) with placeholder values only

### Requirement: CI and Docker secret handling

The system SHALL avoid baking chat API secrets into container images at build time and SHALL document how operators supply runtime environment variables.

#### Scenario: Docker image build

- **WHEN** the published Docker image is built in GitHub Actions
- **THEN** the workflow does not pass the chat API token (or equivalent secrets) as Docker `build-arg` values used to embed secrets into image layers
- **AND** the workflow or repository documentation lists the secret or environment variable names operators must set at container **runtime** on the deployment platform
