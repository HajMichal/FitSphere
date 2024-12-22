import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const exampleRouter = createTRPCRouter({
  test: publicProcedure.query(async ({}) => {
    return { Hello: "There" };
  }),
  users: publicProcedure.query(async ({ ctx }) => {
    const user = await ctx.drizzle.query.users.findFirst({
      where: (fields, { eq }) =>
        eq(fields.id, "918e72cd-7599-40f5-801a-a138a40f701f"),
      with: {
        trainings: {
          with: {
            trainingDay: true,
          },
        },
      },
    });
    return user;
  }),
  exercises: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const exercises = await ctx.drizzle.query.exercises.findMany({
      where: (fields, { eq }) => eq(fields.trainingDayId, input),
    });
    return exercises;
  }),
});
