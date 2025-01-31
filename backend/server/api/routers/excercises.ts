import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { exercises } from "../../db/schema";
import { v4 as uuidV4 } from "uuid";

export const excercisesRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        series: z.number(),
        reps: z.string(),
        kilograms: z.number().optional(),
        rpe: z.number().optional(),
        trainingDayId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const id = uuidV4();
      return await ctx.drizzle.insert(exercises).values({
        id,
        ...input,
      });
    }),
});
