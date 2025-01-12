import { compare, hash } from "bcryptjs";
import { throwTrpcError } from "../routers/auth";

export async function comparePasswords(hash: string, password: string) {
  const checkPwd = await compare(password, hash);
  if (!checkPwd) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    throwTrpcError();
  }
}

const saltRounds = 12;
export async function hashPassword(password: string) {
  return await hash(password, saltRounds);
}
