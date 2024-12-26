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
  const { token, exp } = generateToken(user.id, user.name);
  const currentSession = await ctx.drizzle
    .insert(sessions)
    .values({
      userId: user.id,
      name: user.name,
      token: token,
      expirationIn: exp,
    })
    .onConflictDoUpdate({
      target: sessions.id,
      set: {
        expirationIn: exp,
        token: token,
      },
    })
    .returning();
  if (ctx.req) ctx.req.headers["authorization"] = stringify(currentSession[0]);
  return currentSession[0];
}

function generateToken(id: string, name: string) {
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
  const token = jwt.sign({ id, name, exp }, process.env.SECRET_TOKEN_KEY!, {
    algorithm: "RS256",
    expiresIn: exp,
  });
  return { token, exp };
}
