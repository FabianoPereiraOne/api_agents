import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { env } from "../env.ts"
import { schema } from "./schema/index.ts"

export const query = postgres(env.DATABASE_URL)

export const db = drizzle(query, {
  schema,
  casing: "snake_case"
})
