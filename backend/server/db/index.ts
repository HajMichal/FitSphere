import { drizzle } from "drizzle-orm/d1";
import { D1Database } from "@cloudflare/workers-types";
import * as schema from "./schema";

let db: ReturnType<typeof drizzle<typeof schema>>;

export function getDb(env: { DB: D1Database }) {
  if (!db) db = drizzle(env.DB, { schema });

  return db;
}
