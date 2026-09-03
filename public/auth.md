# auth.md

You are an agent. This service supports **agentic registration** for the public discovery API on **https://drgustavomendes.com** (Dr. Gustavo Mendes e Silva — psiquiatra, CRM 218133/SP).

Flow: **discover → register (anonymous) → exchange for access_token → call API → revoke when done**.

Audience: agents that help patients **discover** the practice, answer factual questions about private in-person care in Jundiaí, teleconsultation, reimbursement documentation, or **start a WhatsApp booking**. This is a marketing site, not a clinical EHR. Tokens only cover `discovery:read` (the same public JSON already available without auth).

---

## Step 1 — Discover

### 1a. Protected Resource Metadata

```http
GET https://drgustavomendes.com/.well-known/oauth-protected-resource
```

```json
{
  "resource": "https://drgustavomendes.com/api/v1/",
  "resource_name": "Dr. Gustavo Mendes — Public Discovery API",
  "authorization_servers": ["https://drgustavomendes.com"],
  "scopes_supported": ["discovery:read"],
  "bearer_methods_supported": ["header"]
}
```

### 1b. Authorization Server Metadata

```http
GET https://drgustavomendes.com/.well-known/oauth-authorization-server
```

Also published as OpenID discovery:

```http
GET https://drgustavomendes.com/.well-known/openid-configuration
```

Important fields:

| Field | Value |
|---|---|
| `issuer` | `https://drgustavomendes.com` |
| `authorization_endpoint` | `https://drgustavomendes.com/oauth/authorize` |
| `token_endpoint` | `https://drgustavomendes.com/oauth/token` |
| `jwks_uri` | `https://drgustavomendes.com/oauth/jwks.json` |
| `revocation_endpoint` | `https://drgustavomendes.com/oauth/revoke` |
| `agent_auth.skill` | this document |
| `agent_auth.register_uri` | `https://drgustavomendes.com/agent/identity` |
| `agent_auth.identity_types_supported` | `["anonymous"]` |

---

## Step 2 — Pick a method

Only **anonymous** registration is enabled (no ID-JAG / verified-email yet).

Decision:

1. You need machine credentials for `discovery:read` → **anonymous** (below).
2. You only need public GETs → skip registration; call `/api/v1/site` without a token.

---

## Step 3 — Register (anonymous)

```http
POST https://drgustavomendes.com/agent/identity
Content-Type: application/json

{
  "type": "anonymous",
  "client_name": "my-agent",
  "software_id": "optional-software-id",
  "software_version": "1.0.0"
}
```

Successful response (`201`):

```json
{
  "registration_id": "reg_…",
  "registration_type": "anonymous",
  "agent_id": "agent_…",
  "identity_assertion": "<JWT>",
  "assertion_expires": "…",
  "scopes": ["discovery:read"],
  "claim_token": "clm_…",
  "claim": {
    "user_code": "123456",
    "verification_uri": "https://drgustavomendes.com/agent/identity/claim",
    "interval": 5
  },
  "token_endpoint": "https://drgustavomendes.com/oauth/token"
}
```

Keep `identity_assertion` for Step 5. Completing the claim ceremony is **optional** for `discovery:read`.

Unsupported types return `identity_type_not_enabled`.

---

## Step 4 — Claim (optional)

If a human later wants to take ownership of an anonymous registration:

1. Open `claim.verification_uri` (or `verification_uri_complete`).
2. POST completion:

```http
POST https://drgustavomendes.com/agent/identity/claim
Content-Type: application/json

{
  "registration_id": "reg_…",
  "claim_token": "clm_…",
  "user_code": "123456"
}
```

No clinical or health data is collected. Claim does not unlock extra clinical APIs (there are none).

---

## Step 5 — Exchange the assertion

```http
POST https://drgustavomendes.com/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer
&assertion=<identity_assertion JWT>
```

Or JSON:

```json
{
  "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
  "assertion": "<identity_assertion JWT>"
}
```

Also supported: `grant_type=client_credentials` (issues a short-lived `discovery:read` token without prior registration).

Response:

```json
{
  "access_token": "<JWT>",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "discovery:read",
  "resource": "https://drgustavomendes.com/api/v1/"
}
```

Validate `iss` = `https://drgustavomendes.com` and verify signature against `jwks_uri`.

---

## Step 6 — Call the API

```http
GET https://drgustavomendes.com/api/v1/site
Authorization: Bearer <access_token>
```

Public endpoints (token optional):

| Endpoint | Purpose |
|---|---|
| `GET /api/v1/site` | Practice facts, contact, modalities |
| `GET /api/v1/health` | Liveness |
| `GET /api/v1/openapi.json` | OpenAPI 3.1 |
| `POST /mcp` | MCP discovery tools |
| `GET /llms.txt` | LLM summary |

### Human booking (not OAuth)

Primary CTA is **WhatsApp** `+55 11 98706-5632`:

`https://wa.me/5511987065632?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta`

Doctoralia is social proof only — never the booking CTA.

---

## Step 7 — Revoke

```http
POST https://drgustavomendes.com/oauth/revoke
Content-Type: application/x-www-form-urlencoded

token=<access_token>
```

Tokens are short-lived JWTs; revocation is acknowledged (RFC 7009). Upstream identity events may be pushed to `POST /agent/events`.

---

## What you must NOT do

- Do **not** collect clinical or health data via forms on this domain (LGPD art. 11).
- Do **not** invent prices or promise clinical results (CFM Res. 1.974/2011).
- Do **not** treat Doctoralia as the booking path.
- Do **not** expect write APIs, patient records, or prescription endpoints — they do not exist here.

## Contact for integrators

- E-mail: `contato@drgustavomendes.com`
- Site: `https://drgustavomendes.com`
