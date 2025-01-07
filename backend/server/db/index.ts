import { drizzle } from "drizzle-orm/d1";
// import * as schema from "./schema";
// import Database from "bun:sqlite";
import { D1Database } from "@cloudflare/workers-types";

// const sqlite = new Database("server/db/DB/sqlite.db");
let db: ReturnType<typeof drizzle>;
// export const db = drizzle({ client: sqlite, schema: schema });
export function getDb(env: { DB: D1Database }) {
  if (!db) db = drizzle(env.DB);
  return db;
}
