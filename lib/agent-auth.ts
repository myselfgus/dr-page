/**
 * Minimal OAuth AS + anonymous agent registration for public discovery APIs.
 * Tokens only authorize scope discovery:read (same data already public without auth).
 * Signing key is dedicated to this use — not used for clinical or user data.
 */

import { SITE_ORIGIN } from "@/lib/agent-discovery"

export const ISSUER = SITE_ORIGIN
export const RESOURCE = `${SITE_ORIGIN}/api/v1/`
export const SCOPES = ["discovery:read"] as const

/** Public JWK (ES256 / P-256) — also served at /oauth/jwks.json */
export const PUBLIC_JWK = {
  kty: "EC",
  crv: "P-256",
  x: "wWP6TPshbsFW-ZZiEaXvzoTR9O1RCVeFrILWG4E8vUM",
  y: "jTfIB4ez7KkaSjLhxALQFTYBdibSzGf1uhaZLbA35Q4",
  kid: "agent-discovery-1",
  alg: "ES256",
  use: "sig",
} as const

/** Private JWK — discovery:read tokens only */
const PRIVATE_JWK = {
  kty: "EC",
  crv: "P-256",
  x: "wWP6TPshbsFW-ZZiEaXvzoTR9O1RCVeFrILWG4E8vUM",
  y: "jTfIB4ez7KkaSjLhxALQFTYBdibSzGf1uhaZLbA35Q4",
  d: "IrshUngfOJqh-O91of0xsEYKcBqzwpw0zs5q2O-YXN4",
  kid: "agent-discovery-1",
  alg: "ES256",
} as const

function b64url(data: ArrayBuffer | Uint8Array | string): string {
  const bytes =
    typeof data === "string"
      ? new TextEncoder().encode(data)
      : data instanceof Uint8Array
        ? data
        : new Uint8Array(data)
  let bin = ""
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]!)
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")
}

function b64urlJson(obj: unknown): string {
  return b64url(JSON.stringify(obj))
}

async function importPrivateKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "jwk",
    { ...PRIVATE_JWK },
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["sign"],
  )
}

async function importPublicKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "jwk",
    { ...PUBLIC_JWK },
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["verify"],
  )
}

/** Sign a compact JWT (ES256). */
export async function signJwt(
  payload: Record<string, unknown>,
  expiresInSec = 3600,
): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const header = { alg: "ES256", typ: "JWT", kid: PUBLIC_JWK.kid }
  const body = {
    iss: ISSUER,
    aud: RESOURCE,
    iat: now,
    exp: now + expiresInSec,
    ...payload,
  }
  const signingInput = `${b64urlJson(header)}.${b64urlJson(body)}`
  const key = await importPrivateKey()
  const sig = await crypto.subtle.sign(
    { name: "ECDSA", hash: "SHA-256" },
    key,
    new TextEncoder().encode(signingInput),
  )
  // WebCrypto returns IEEE P1363 (r||s); JWT wants that for ES256
  return `${signingInput}.${b64url(sig)}`
}

export async function verifyJwt(
  token: string,
): Promise<Record<string, unknown> | null> {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return null
    const [h, p, s] = parts
    const key = await importPublicKey()
    const sig = Uint8Array.from(
      atob(s!.replace(/-/g, "+").replace(/_/g, "/")),
      (c) => c.charCodeAt(0),
    )
    const ok = await crypto.subtle.verify(
      { name: "ECDSA", hash: "SHA-256" },
      key,
      sig,
      new TextEncoder().encode(`${h}.${p}`),
    )
    if (!ok) return null
    const payload = JSON.parse(
      atob(p!.replace(/-/g, "+").replace(/_/g, "/")),
    ) as Record<string, unknown>
    const exp = typeof payload.exp === "number" ? payload.exp : 0
    if (exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}

export function getAuthorizationServerMetadata() {
  return {
    issuer: ISSUER,
    authorization_endpoint: `${SITE_ORIGIN}/oauth/authorize`,
    token_endpoint: `${SITE_ORIGIN}/oauth/token`,
    jwks_uri: `${SITE_ORIGIN}/oauth/jwks.json`,
    revocation_endpoint: `${SITE_ORIGIN}/oauth/revoke`,
    registration_endpoint: `${SITE_ORIGIN}/agent/identity`,
    response_types_supported: ["token", "none"],
    grant_types_supported: [
      "urn:ietf:params:oauth:grant-type:jwt-bearer",
      "client_credentials",
      "urn:ietf:params:oauth:grant-type:token-exchange",
    ],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["ES256"],
    token_endpoint_auth_methods_supported: ["none", "client_secret_post"],
    scopes_supported: [...SCOPES],
    claims_supported: ["sub", "iss", "aud", "exp", "iat", "scope", "agent_id"],
    code_challenge_methods_supported: ["S256"],
    service_documentation: `${SITE_ORIGIN}/auth.md`,
    ui_locales_supported: ["pt-BR", "en"],
    // WorkOS Auth.md / agent registration extension
    agent_auth: {
      skill: `${SITE_ORIGIN}/auth.md`,
      register_uri: `${SITE_ORIGIN}/agent/identity`,
      identity_endpoint: `${SITE_ORIGIN}/agent/identity`,
      claim_endpoint: `${SITE_ORIGIN}/agent/identity/claim`,
      claim_uri: `${SITE_ORIGIN}/agent/identity/claim`,
      revocation_uri: `${SITE_ORIGIN}/oauth/revoke`,
      events_endpoint: `${SITE_ORIGIN}/agent/events`,
      identity_types_supported: ["anonymous"],
      anonymous: {
        credential_types_supported: ["access_token", "identity_assertion"],
        claim_uri: `${SITE_ORIGIN}/agent/identity/claim`,
      },
      events_supported: [
        "https://schemas.workos.com/events/agent/auth/identity/assertion/revoked",
      ],
    },
  }
}

export function getOpenIdConfiguration() {
  const as = getAuthorizationServerMetadata()
  return {
    ...as,
    userinfo_endpoint: `${SITE_ORIGIN}/oauth/userinfo`,
    end_session_endpoint: `${SITE_ORIGIN}/oauth/revoke`,
  }
}

export function getProtectedResourceMetadata() {
  return {
    resource: RESOURCE,
    resource_name: "Dr. Gustavo Mendes — Public Discovery API",
    resource_documentation: `${SITE_ORIGIN}/auth.md`,
    authorization_servers: [ISSUER],
    scopes_supported: [...SCOPES],
    bearer_methods_supported: ["header"],
    // Public GET still works without a token; token is optional for agents that prefer OAuth.
    unauthenticated_access: true,
  }
}

function randomId(prefix: string): string {
  const bytes = new Uint8Array(12)
  crypto.getRandomValues(bytes)
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")
  return `${prefix}_${hex}`
}

export type RegisterBody = {
  type?: string
  client_name?: string
  software_id?: string
  software_version?: string
  metadata?: Record<string, unknown>
}

export async function registerAnonymousAgent(body: RegisterBody) {
  const registrationId = randomId("reg")
  const agentId = randomId("agent")
  const claimToken = randomId("clm")

  const identityAssertion = await signJwt(
    {
      sub: agentId,
      registration_id: registrationId,
      registration_type: "anonymous",
      scope: SCOPES.join(" "),
      token_use: "identity_assertion",
      client_name: body.client_name ?? "anonymous-agent",
    },
    3600,
  )

  return {
    registration_id: registrationId,
    registration_type: "anonymous" as const,
    agent_id: agentId,
    identity_assertion: identityAssertion,
    assertion_expires: new Date(Date.now() + 3600_000).toISOString(),
    scopes: [...SCOPES],
    // Optional claim ceremony (ownership binding) — not required for discovery:read
    claim_token: claimToken,
    claim_token_expires: new Date(Date.now() + 600_000).toISOString(),
    claim: {
      user_code: String(Math.floor(100000 + Math.random() * 900000)),
      expires_in: 600,
      verification_uri: `${SITE_ORIGIN}/agent/identity/claim`,
      verification_uri_complete: `${SITE_ORIGIN}/agent/identity/claim?claim_token=${claimToken}`,
      interval: 5,
    },
    token_endpoint: `${SITE_ORIGIN}/oauth/token`,
    note: "Exchange identity_assertion at token_endpoint with grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer for a discovery:read access_token. Public GETs also work without a token.",
  }
}

export async function exchangeAssertionForAccessToken(assertion: string) {
  const payload = await verifyJwt(assertion)
  if (!payload) {
    return { error: "invalid_grant", error_description: "Invalid or expired assertion" }
  }
  if (payload.token_use && payload.token_use !== "identity_assertion") {
    return { error: "invalid_grant", error_description: "Expected identity_assertion" }
  }
  const sub = String(payload.sub ?? randomId("agent"))
  const accessToken = await signJwt(
    {
      sub,
      scope: SCOPES.join(" "),
      token_use: "access_token",
      agent_id: payload.agent_id ?? sub,
      registration_id: payload.registration_id,
    },
    3600,
  )
  return {
    access_token: accessToken,
    token_type: "Bearer",
    expires_in: 3600,
    scope: SCOPES.join(" "),
    resource: RESOURCE,
  }
}

export async function clientCredentialsToken(clientName?: string) {
  const sub = randomId("client")
  const accessToken = await signJwt(
    {
      sub,
      scope: SCOPES.join(" "),
      token_use: "access_token",
      client_name: clientName ?? "client_credentials",
    },
    3600,
  )
  return {
    access_token: accessToken,
    token_type: "Bearer",
    expires_in: 3600,
    scope: SCOPES.join(" "),
    resource: RESOURCE,
  }
}
