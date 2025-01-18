import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  session: protectedProcedure.query(async ({ ctx }) => {
    const session = await ctx.drizzle.query.sessions.findFirst({
      where: (fields, { eq }) => eq(fields.id, ctx.session.id),
      columns: {
        id: true,
        userId: true,
        name: true,
        expiresAt: true,
      },
    });
    if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });

    return session;
  }),
  getUserWithTraining: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.drizzle.query.users.findFirst({
      where: (fields, { eq }) => eq(fields.id, ctx.session.userId),
      with: {
        trainings: {
          with: {
            trainingDay: true,
          },
        },
      },
    });
  }),
  getUserFriends: protectedProcedure.query(async ({}) => {}),
});
