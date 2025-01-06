import jwt from "jsonwebtoken";
import { stringify } from "superjson";

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
  const { token, exp } = generateJWTToken(user.id, user.name);
  const currentSession = await ctx.drizzle
    .insert(sessions)
    .values({
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
  if (ctx.req)
    ctx.req.headers.set("authorization", stringify(currentSession[0]));
  return currentSession[0];
}

function generateJWTToken(id: string, name: string) {
  const exp = new Date(
    Math.floor(Date.now() / 1000) + 60 * 60 * 24
  ).toISOString();
  const token = jwt.sign({ id, name, exp }, process.env.SECRET_TOKEN_KEY!, {
    algorithm: "RS256",
    expiresIn: exp,
  });
  return { token, exp };
}
