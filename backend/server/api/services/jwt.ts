import jwt from "jsonwebtoken";
import { v4 as uuidV4 } from "uuid";

import { type Context } from "../trpc";
import { sessions, type Sessions } from "../../db/schema";
import { Env } from "../..";

interface SignTokenAndCreateSession {
  user: { id: string; name: string; password: string };
  ctx: Context;
}
export async function signTokenAndCreateSession({
  user,
  ctx,
}: SignTokenAndCreateSession): Promise<Sessions> {
  const id = uuidV4();
  const { token, exp } = generateJWTToken(id, user.id, user.name, ctx);
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

  return currentSession[0];
}

function generateJWTToken(
  id: string,
  userId: string,
  name: string,
  ctx: Context
) {
  const validTimeInSeconds = 15 * 24 * 60 * 60 * 1000; // 15days
  const exp = new Date(new Date().getTime() + validTimeInSeconds).toISOString();

  const token = jwt.sign(
    { id, userId, name, validTimeInSeconds },
    ctx.env.SECRET_TOKEN_KEY,
    {
      algorithm: "HS256",
      expiresIn: validTimeInSeconds,
    }
  );
  return { token, exp };
}

export function verifyJWT(token: string, env: Env) {
  try {
    return jwt.verify(token, env.SECRET_TOKEN_KEY);
  } catch (err) {
    return null;
  }
}
