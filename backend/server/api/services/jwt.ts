import jwt from "jsonwebtoken";
import { v4 as uuidV4 } from "uuid";

import { type Context } from "../trpc";
import { sessions, type Sessions } from "../../db/schema";

interface SignTokenAndCreateSession {
  user: { id: string; name: string; password: string };
  ctx: Context;
}
export async function signTokenAndCreateSession({
  user,
  ctx,
}: SignTokenAndCreateSession): Promise<Sessions> {
  const { token, exp } = generateJWTToken(user.id, user.name, ctx);
  const id = uuidV4();
  const currentSession = await ctx.drizzle
    .insert(sessions)
    .values({
      id,
      userId: user.id,
      name: user.name,
      token: token,
      expiresAt: exp,
    })
    .onConflictDoUpdate({
      target: sessions.id,
      set: {
        expiresAt: exp,
        token: token,
      },
    })
    .returning();

  ctx.res?.append(
    "Set-Cookie",
    `session=${currentSession[0]}; HttpOnly; Secure; Path=/; Max-Age=${currentSession[0].expiresAt}`
  );

  return currentSession[0];
}

function generateJWTToken(id: string, name: string, ctx: Context) {
  const validTimeInSeconds = 15 * 24 * 60 * 60 * 1000;
  const exp = new Date(new Date().getTime() + validTimeInSeconds).toISOString();

  const token = jwt.sign(
    { id, name, validTimeInSeconds },
    ctx.env.SECRET_TOKEN_KEY,
    {
      algorithm: "HS256",
      expiresIn: validTimeInSeconds,
    }
  );

  return { token, exp };
}
