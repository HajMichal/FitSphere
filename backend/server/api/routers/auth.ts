import { z } from "zod";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

import { users } from "../../db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { signTokenAndCreateSession } from "../utils/jwt";
import { comparePasswords, hashPassword } from "../utils/passwordMenager";

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
      const hashedPwd = await hashPassword(input.password);
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
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.drizzle.query.users.findFirst({
        columns: {
          id: true,
          name: true,
          password: true,
        },
        where: eq(users.email, input.login),
      });

      if (!user)
        throw new TRPCError({ message: "INCORRECT LOGIN", code: "NOT_FOUND" });

      await comparePasswords(user.password, input.password);

      const currentSession = await signTokenAndCreateSession({ user, ctx });
      return { msg: "logged in", body: currentSession };
    }),
});
