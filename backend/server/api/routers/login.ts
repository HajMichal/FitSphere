import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import bcrypt from "bcrypt";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
const saltRounds = 10;

export const loginRouter = createTRPCRouter({
  createAccount: publicProcedure
    .input(
      z.object({
        name: z.string(),
        surname: z.string(),
        email: z.string(),
        password: z.string(),
        age: z.number(),
        phone: z.string().optional(),
        city: z.string().optional(),
        gymName: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const hashedPwd = await bcrypt.hash(input.password, saltRounds);
      const user = await ctx.drizzle
        .insert(users)
        .values({
          ...input,
          password: hashedPwd,
        })
        .returning({ id: users.id, name: users.name });
      return { msg: "created", body: { id: user[0].id, name: user[0].name } };
    }),

  signIn: publicProcedure
    .input(
      z.object({
        login: z.string(),
        hashedPwd: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      ctx.drizzle
        .select({ password: users.password })
        .from(users)
        .where(eq(users.email, input.login));
    }),
});
