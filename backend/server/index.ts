import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { exampleRouter } from "./api/routers/example";
import { createTRPCContext, createTRPCRouter } from "./api/trpc";
import { loginRouter } from "./api/routers/auth";
import { D1Database } from "@cloudflare/workers-types";
import { userRouter } from "./api/routers/user";
import { trainingRouter } from "./api/routers/trainings";
import { excercisesRouter } from "./api/routers/excercises";
import { trainingDayRouter } from "./api/routers/trainingDay";

const appRouter = createTRPCRouter({
  example: exampleRouter,
  auth: loginRouter,
  user: userRouter,
  training: trainingRouter,
  trainingDay: trainingDayRouter,
  excercises: excercisesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://gymwibe.online",
  "https://fitsphere.pages.dev",
];

function handleCors(request: Request): Response | null {
  if (request.method === "OPTIONS") {
    const headers = getCorsHeaders(request);
    return new Response(null, {
      status: 204,
      headers,
    });
  }
  return null;
}

function getCorsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("Origin");

  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400", // Cache preflight for 24h
    };
  }

  // Default headers if origin is not in the whitelist
  return {
    "Access-Control-Allow-Origin": "null", // Block the request if origin is not allowed
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export interface Env {
  RESEND_API_KEY: string;
  SECRET_TOKEN_KEY: string;
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsResponse = handleCors(request);
    if (corsResponse) return corsResponse;
    const response = await fetchRequestHandler({
      endpoint: "/trpc",
      req: request,
      router: appRouter,
      createContext: (opts) => createTRPCContext({ ...opts, env }),
    });

    const headers = new Headers(response.headers);
    const corsHeaders = getCorsHeaders(request);
    for (const [key, value] of Object.entries(corsHeaders)) {
      headers.set(key, value);
    }

    return new Response(response.body, {
      status: response.status,
      headers,
    });
  },
};
