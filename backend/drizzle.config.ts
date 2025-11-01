// drizzle.config used for migrations

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql", 
  schema: "./src/db/schema/index.ts", // look for schema through index.ts
  out: "./src/db/migrations", // create migrations in this folder
  dbCredentials: { 
    url: process.env.DATABASE_URL!, 
  },
  verbose: true, 
  strict: true,
});
