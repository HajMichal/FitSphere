import { initTRPC } from "@trpc/server";
import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { db } from "../db/index";
import SuperJSON from "superjson";

/**
 *
 * 1. CONTEXT
 *
 */
interface CreateContextOptions extends Partial<CreateHTTPContextOptions> {
  session: "SESSION TYPE" | null;
}

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    drizzle: db,
    session: opts.session,
  };
};

export const createTRPCContext = (opts: CreateHTTPContextOptions) => {
  const session = "SESSION TYPE";
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
