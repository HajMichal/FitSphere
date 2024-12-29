import crypto from "crypto";

export function generate2FACode() {
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toDateString();
  const code = crypto.randomInt(100000, 999999).toString();
  return { code, expiresAt };
}
