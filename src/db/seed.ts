import { reset, seed } from "drizzle-seed"
import { db, query } from "./connection.ts"
import { schema } from "./schema/index.ts"

await reset(db, schema)

await seed(db, schema).refine(f => {
  return {
    rooms: {
      count: 20,
      columns: {
        name: f.fullName(),
        description: f.loremIpsum()
      }
    }
  }
})

await query.end()
