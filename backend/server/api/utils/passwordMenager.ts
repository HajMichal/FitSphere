import { TRPCError } from "@trpc/server";

export async function comparePasswords(hash: string, password: string) {
  const checkPwd = await Bun.password.verify(hash, password);
  if (!checkPwd) {
    setTimeout(() => {}, 300);
    throw new TRPCError({
      message: "INCORRECT CREDENTIALS",
      code: "NOT_FOUND",
    });
  }
}

const cost = 10;
export async function hashPassword(password: string) {
  return await Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: cost,
  });
}
