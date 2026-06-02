import { scryptSync, timingSafeEqual } from "node:crypto";

export function verifyPassword(password: string, encodedHash: string) {
  const [algorithm, salt, hash] = encodedHash.split(":");

  if (algorithm !== "scrypt" || !salt || !hash) {
    throw new Error("ADMIN_PASSWORD_HASH format is invalid");
  }

  const expectedHash = Buffer.from(hash, "base64url");
  const actualHash = scryptSync(password, Buffer.from(salt, "base64url"), expectedHash.length);

  return timingSafeEqual(actualHash, expectedHash);
}
