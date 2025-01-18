import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { verifyJWT } from "../services/jwt";
import { Env } from "../..";
import { Sessions } from "../../db/schema";

export async function getSession({
  opts,
}: {
  opts: FetchCreateContextFnOptions & { env: Env };
}): Promise<Sessions | null> {
  const cookies = opts.req.headers.get("cookie");
  if (!cookies) return null;

  const tokenCookie = cookies
    .split(";")
    .find((c) => c.trim().startsWith("token="));
  if (!tokenCookie) return null;

  const token = tokenCookie.split("=")[1];
  const decodedToken = verifyJWT(token, opts.env);

  if (decodedToken && typeof decodedToken !== "string") {
    return {
      id: decodedToken.id,
      userId: decodedToken.id,
      name: decodedToken.name,
      token: token,
      expiresAt: new Date(decodedToken.exp! * 1000).toISOString(),
    };
  }

  return null;
}
