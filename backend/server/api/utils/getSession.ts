import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { parse } from "superjson";

import { Sessions } from "../../db/schema";

export function getSession({
  opts,
}: {
  opts: FetchCreateContextFnOptions;
}): Sessions | null {
  const sessionHeader = opts.req.headers.get("authorization");
  if (!sessionHeader) return null;

  const session: Sessions = parse(sessionHeader);
  return session;
}
