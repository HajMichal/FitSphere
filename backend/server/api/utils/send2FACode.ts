import { TRPCError } from "@trpc/server";
import { Resend } from "resend";
import { Env } from "../..";

export async function send2FACode(email: string, code: string, env: Env) {
  console.log(env.RESEND_API_KEY);
  const resend = new Resend(env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "FitSphere <noreply@gymwibe.online>",
    to: email,
    subject: "Your 2FA Verification Code",
    text: `Your verification code is: ${code}`,
  });

  if (error)
    throw new TRPCError({
      message: error.message,
      code: "BAD_REQUEST",
    });
}
