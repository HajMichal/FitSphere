import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "../../../backend/server";

export const trpc = createTRPCReact<AppRouter>();
