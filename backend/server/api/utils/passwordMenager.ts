import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";

export async function comparePasswords(hash: string, password: string) {
  const checkPwd = await bcrypt.compare(hash, password);
  if (!checkPwd) {
    setTimeout(() => {}, 300);
    throw new TRPCError({
      message: "INCORRECT CREDENTIALS",
      code: "NOT_FOUND",
    });
  }
}

const saltRounds = 10;
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, saltRounds);
}
