import { TRPCError } from "@trpc/server";
import { Resend } from "resend";

export async function send2FACode(email: string, code: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "FitSphere <onboarding@resend.dev>",
    to: email,
    subject: "Your 2FA Verification Code",
    text: `Your verification code is: ${code}`,
  });
  if (error)
    throw new TRPCError({
      message: "TOKEN NOT SENT",
      code: "BAD_REQUEST",
    });
}
