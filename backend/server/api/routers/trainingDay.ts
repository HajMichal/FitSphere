import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { trainingDay } from "../../db/schema";
import { v4 as uuidV4 } from "uuid";

export const trainingDayRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        trainings: z
          .object({
            name: z.string(),
            description: z.string().optional(),
          })
          .array(),
        trainingId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const trainings = input.trainings.map(
        async ({ name, description }, index) => {
          const id = uuidV4();
          await ctx.drizzle.insert(trainingDay).values({
            id,
            name,
            description,
            trainingNumber: index,
            trainingId: input.trainingId,
          });
        }
      );
      return trainings;
    }),
});
