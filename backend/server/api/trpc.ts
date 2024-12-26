import { initTRPC, TRPCError } from "@trpc/server";
import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { db } from "../db/index";
import SuperJSON from "superjson";
import { Sessions } from "../db/schema";
import { getSession } from "./utils/getSession";

/**
 *
 * 1. CONTEXT
 *
 */
interface CreateContextOptions extends Partial<CreateHTTPContextOptions> {
  session: Sessions | null;
}

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    drizzle: db,
    session: opts.session,
    req: opts.req,
    res: opts.res,
  };
};

export const createTRPCContext = (opts: CreateHTTPContextOptions) => {
  const session = getSession({ opts: opts });
  const innterCtx = createInnerTRPCContext({ session });
  return createInnerTRPCContext({
    ...innterCtx,
    req: opts.req,
    res: opts.res,
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
