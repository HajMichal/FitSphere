import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle/migration",
  schema: "./server/db/schema.ts",
  dialect: "sqlite",
});
