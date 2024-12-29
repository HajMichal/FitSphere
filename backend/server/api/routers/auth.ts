import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

import { twoFactorAuth, users } from "../../db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { signTokenAndCreateSession } from "../services/jwt";
import { comparePasswords, hashPassword } from "../utils/passwordMenager";

export const loginRouter = createTRPCRouter({
  createAccount: publicProcedure
    .input(
      z.object({
        name: z.string(),
        surname: z.string(),
        email: z.string().email(),
        password: z.string(),
        repeatPassword: z.string(),
        age: z.number(),
        phone: z.string().optional(),
        city: z.string().optional(),
        gymName: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.password !== input.repeatPassword)
        throw new TRPCError({
          message: "INCORRECT CREDENTIALS",
          code: "NOT_FOUND",
        });

      const hashedPwd = await hashPassword(input.password);
      // Check if user already exists with this email
      //    if yes ==> check if email is already verified
      //        if yes ==> throw error this email is already in use
      //        if no  ==> create new token and move user to next step which is email verification
      //    if no  ==> let create new user
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
          isEmailVerified: true,
        },
        where: eq(users.email, input.login),
      });

      if (!user?.isEmailVerified) {
        // This delay makes BAD requests a little bit longer, so bruteforce/dictionary/stuffing attacks will be slowed.
        setTimeout(() => {}, 300);
        throw new TRPCError({
          message: "INCORRECT CREDENTIALS",
          code: "NOT_FOUND",
        });
      }

      await comparePasswords(user.password, input.password);

      const currentSession = await signTokenAndCreateSession({ user, ctx });
      return { msg: "logged in", body: currentSession };
    }),
  verify2FACode: publicProcedure
    .input(
      z.object({
        code: z.string().length(6),
        email: z.string().email(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const isToken = await ctx.drizzle.query.twoFactorAuth.findFirst({
        where: and(
          eq(twoFactorAuth.code, input.code),
          eq(twoFactorAuth.email, input.email)
        ),
      });

      // Check token expiration time

      if (isToken) {
        await ctx.drizzle
          .delete(twoFactorAuth)
          .where(eq(twoFactorAuth.email, input.email));

        // mark email as verified
        await ctx.drizzle
          .update(users)
          .set({ isEmailVerified: true })
          .where(eq(users.email, input.email));
      }

      return { msg: "Success Verification" };
    }),
});
