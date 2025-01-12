import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { parse } from "cookie";

import { Sessions } from "../../db/schema";

export function getSession({
  opts,
}: {
  opts: FetchCreateContextFnOptions;
}): Sessions | null {
  const cookies = parse(opts.req.headers.get("Cookie") || "");
  const session = cookies?.session;
  console.log(cookies);
  if (!session) return null;
  // const session: Sessions = parse(sessionHeader);
  return {} as Sessions;
}
