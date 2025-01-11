import { twoFactorAuth } from "../../db/schema";
import { Context } from "../trpc";
import { generate2FACode } from "../utils/generate2FACode";
import { send2FACode } from "../utils/send2FACode";

export async function generateAndSendCode(email: string, ctx: Context) {
  const { code, expiresAt } = generate2FACode();

  await ctx.drizzle
    .insert(twoFactorAuth)
    .values({ email, code, expiresAt })
    .onConflictDoUpdate({
      target: twoFactorAuth.email,
      set: { code, expiresAt },
    });

  await send2FACode(email, code, ctx.env);

  return { success: true, message: "2FA code sent to your email." };
}
