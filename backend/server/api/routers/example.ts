import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const exampleRouter = createTRPCRouter({
  test: publicProcedure.query(async ({}) => {
    console.log("test");
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
  exercises: publicProcedure
    .input(z.string().optional())
    .query(async ({ ctx, input }) => {
      return await ctx.drizzle.query.exercises.findMany({
        where: (fields) =>
          eq(
            fields.trainingDayId,
            input ? input : "0b8fbec8-4348-4096-a1dc-6d4e9e7ecd97"
          ),
      });
    }),
  protectedTest: protectedProcedure.query(async ({}) => {
    console.log("test");
    return { Hello: "There" };
  }),
  // import {
  //   friendships,
  //   exercises,
  //   sessions,
  //   trainingDay,
  //   trainings,
  //   users,
  // } from "../../db/seed";
  // seed: publicProcedure.query(async ({ ctx }) => {
  //   // await ctx.drizzle.delete(friendshipsSchema);
  //   // await ctx.drizzle.delete(exercisesSchema);
  //   // await ctx.drizzle.delete(trainingDaySchema);
  //   // await ctx.drizzle.delete(trainingsSchema);
  //   // await ctx.drizzle.delete(sessionsSchema);
  //   // await ctx.drizzle.delete(usersSchema);

  //   // await ctx.drizzle.insert(friendshipsSchema).values(friendships);
  //   // await ctx.drizzle.insert(usersSchema).values(users);
  //   await ctx.drizzle.insert(trainingsSchema).values(trainings);
  //   await ctx.drizzle.insert(trainingDaySchema).values(trainingDay);
  //   await ctx.drizzle.insert(exercisesSchema).values(exercises);
  //   await ctx.drizzle.insert(sessionsSchema).values(sessions);
  //   return "SUCCESS";
  // }),
});
