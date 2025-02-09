import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { trainings } from "../../db/schema";
import { v4 as uuidV4 } from "uuid";

export const trainingRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        declaredWeekDays: z.array(z.number()),
        period: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const id = uuidV4();
      return await ctx.drizzle
        .insert(trainings)
        .values({
          id,
          ...input,
          userId: ctx.session.userId,
          weeklyFrequency: input.declaredWeekDays.length,
          declaredWeekDays: JSON.stringify(input.declaredWeekDays),
        })
        .returning({
          id: trainings.id,
        });
    }),
});
