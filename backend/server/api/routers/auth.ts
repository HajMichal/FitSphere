import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

import { pendingUsers, twoFactorAuth, users } from "../../db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { signTokenAndCreateSession } from "../services/jwt";
import { comparePasswords, hashPassword } from "../utils/passwordMenager";
import { generateAndSendCode } from "../services/generateAndSendCode";

const throwTrpcError = (message = "INCORRECT CREDENTIALS") => {
  throw new TRPCError({
    message,
    code: "BAD_REQUEST",
  });
};

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
      if (input.password !== input.repeatPassword) throwTrpcError();

      const isUserWithEmail = await ctx.drizzle.query.users.findFirst({
        where: eq(users.email, input.email),
      });

      if (isUserWithEmail?.email) throwTrpcError();

      const hashedPwd = await hashPassword(input.password);
      const pendingUser = await ctx.drizzle
        .insert(pendingUsers)
        .values({
          ...input,
          password: hashedPwd,
        })
        .onConflictDoUpdate({
          target: pendingUsers.email,
          set: {
            ...input,
            password: hashedPwd,
          },
        })
        .returning({ id: users.id, name: users.name });

      const { success } = await generateAndSendCode(input.email, ctx);
      if (!success) throwTrpcError("TOKEN NOT SENT");
      return { msg: "created", body: { pendingUserId: pendingUser[0].id } };
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

      if (!user) {
        // This delay makes BAD requests a little bit longer,
        // bruteforce/dictionary/stuffing attacks will be slowed.
        await new Promise((resolve) => setTimeout(resolve, 300));
        return throwTrpcError();
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
        pendingUserId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const token = await ctx.drizzle.query.twoFactorAuth.findFirst({
        where: and(
          eq(twoFactorAuth.code, input.code),
          eq(twoFactorAuth.email, input.email)
        ),
      });

      if (!token) return throwTrpcError();

      const currentTime = new Date();
      const expirationTime = new Date(token.expiresAt);

      if (currentTime > expirationTime) return throwTrpcError("TOKEN EXPIRED");

      const userData = await ctx.drizzle.query.pendingUsers.findFirst({
        where: eq(users.id, input.pendingUserId),
      });
      if (!userData) return throwTrpcError("SOMETHING WENT WRONG");

      await ctx.drizzle.insert(users).values(userData);
      await ctx.drizzle
        .delete(pendingUsers)
        .where(eq(pendingUsers.id, userData.id));
      await ctx.drizzle
        .delete(twoFactorAuth)
        .where(eq(twoFactorAuth.email, input.email));
      return { msg: "Success Verification" };
    }),
});
