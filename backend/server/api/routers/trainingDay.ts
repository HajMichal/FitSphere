import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { trainingDay } from "../../db/schema";
import { v4 as uuidV4 } from "uuid";

export const trainingDayRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        trainingNumber: z.number(),
        trainingId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const id = uuidV4();
      return await ctx.drizzle.insert(trainingDay).values({
        id,
        ...input,
      });
    }),
});
