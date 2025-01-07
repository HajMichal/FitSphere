import { initTRPC, TRPCError } from "@trpc/server";
import { getDb } from "../db/index";
import SuperJSON from "superjson";
import { Sessions } from "../db/schema";
import { getSession } from "./utils/getSession";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { D1Database } from "@cloudflare/workers-types";

/**
 *
 * 1. CONTEXT
 *
 */
interface CreateContextOptions extends Partial<FetchCreateContextFnOptions> {
  session: Sessions | null;
  env: { DB: D1Database };
}

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    drizzle: getDb(opts.env),
    session: opts.session,
    req: opts.req,
  };
};

export const createTRPCContext = (
  opts: FetchCreateContextFnOptions & { env: { DB: D1Database } }
) => {
  const session = getSession({ opts: opts });
  const innterCtx = createInnerTRPCContext({ session, env: opts.env });
  return createInnerTRPCContext({
    ...innterCtx,
    req: opts.req,
    env: opts.env,
  });
};
export type Context = Awaited<ReturnType<typeof createInnerTRPCContext>>;

/**
 *
 * 2. INITIALIZATION | ROUTERS | PROCEDURES
 *
 */
// [TODO]
//  - add errorFormatter inside create options
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: SuperJSON,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({ ctx: { session: ctx.session } });
});
