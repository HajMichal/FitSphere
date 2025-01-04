import cors from "cors";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { exampleRouter } from "./api/routers/example";
import { createTRPCContext, createTRPCRouter } from "./api/trpc";
import { loginRouter } from "./api/routers/auth";

const appRouter = createTRPCRouter({
  example: exampleRouter,
  auth: loginRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext: createTRPCContext,
});

server.listen(3000);
console.log(
  `🌿\x1b[32m [READY] Server is now listening:\x1b[0m http://localhost:${process.env.PORT} 🚀`
);
