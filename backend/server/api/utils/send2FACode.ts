import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function send2FACode(email: string, code: string) {
  await resend.emails.send({
    from: "no-reply@yourdomain.com",
    to: email,
    subject: "Your 2FA Verification Code",
    text: `Your verification code is: ${code}`,
  });
}
