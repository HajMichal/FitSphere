import { Context } from "../trpc";
import cookie from "cookie";

export function setCookie(ctx: Context, name: string, value: string) {
  const serializedCookie = cookie.serialize(name, value, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 15 * 24 * 60 * 60, // 15 days
  });
  ctx.res?.append("Set-Cookie", serializedCookie);
}

export function deleteCookie(ctx: Context, name: string) {
  // ctx.res?.delete(name);
  ctx.res?.append(
    "Set-Cookie",
    cookie.serialize(name, "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 0,
    })
  );
}
