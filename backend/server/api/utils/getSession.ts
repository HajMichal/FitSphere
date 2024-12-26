import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { parse } from "superjson";

import { Sessions } from "../../db/schema";

export function getSession({
  opts,
}: {
  opts: CreateHTTPContextOptions;
}): Sessions | null {
  const sessionHeader = opts.req.headers.authorization;
  if (!sessionHeader) return null;

  const session: Sessions = parse(sessionHeader);
  return session;
}
