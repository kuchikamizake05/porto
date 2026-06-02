export const ADMIN_COOKIE_NAME = "admin_session";

type JwtPayload = {
  sub: string;
  iat: number;
  exp: number;
};

const encoder = new TextEncoder();

function base64UrlEncode(input: Uint8Array | string) {
  const bytes = typeof input === "string" ? encoder.encode(input) : input;
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function base64UrlDecode(input: string) {
  const padded = input.replaceAll("-", "+").replaceAll("_", "/").padEnd(
    Math.ceil(input.length / 4) * 4,
    "="
  );
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

async function getKey(secret: string, usage: KeyUsage[]) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    usage
  );
}

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return secret;
}

export async function signAdminToken(username: string) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "HS256", typ: "JWT" };
  const payload: JwtPayload = {
    sub: username,
    iat: now,
    exp: now + 60 * 60 * 24,
  };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const key = await getKey(getJwtSecret(), ["sign"]);
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(signingInput)
  );

  return `${signingInput}.${base64UrlEncode(new Uint8Array(signature))}`;
}

export async function verifyAdminToken(token?: string) {
  if (!token) {
    return false;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return false;
  }

  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const key = await getKey(getJwtSecret(), ["verify"]);
  const isValidSignature = await crypto.subtle.verify(
    "HMAC",
    key,
    base64UrlDecode(encodedSignature),
    encoder.encode(signingInput)
  );

  if (!isValidSignature) {
    return false;
  }

  try {
    const header = JSON.parse(new TextDecoder().decode(base64UrlDecode(encodedHeader)));
    const payload = JSON.parse(
      new TextDecoder().decode(base64UrlDecode(encodedPayload))
    ) as JwtPayload;

    return header.alg === "HS256" && payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}
