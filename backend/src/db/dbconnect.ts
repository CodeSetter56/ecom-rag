import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres"; // driver
import * as schema from "./schema"; 

const connString = process.env.DATABASE_URL;

if (!connString) {
  throw new Error("DATABASE_URL not set in env");
}

const client = postgres(connString);
export const db = drizzle(client, { schema }); // db instance with schema
