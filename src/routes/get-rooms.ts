import { count, eq } from "drizzle-orm"
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { db } from "../db/connection.ts"
import { schema } from "../db/schema/index.ts"

export const GetRooms: FastifyPluginCallbackZod = server => {
  server.get("/rooms", async () => {
    const listRooms = await db
      .select({
        id: schema.rooms.id,
        name: schema.rooms.name,
        questionsCount: count(schema.questions.id),
        createdAt: schema.rooms.createdAt
      })
      .from(schema.rooms)
      .leftJoin(schema.questions, eq(schema.questions.roomId, schema.rooms.id))
      .groupBy(schema.rooms.id, schema.rooms.name)
      .orderBy(schema.rooms.createdAt)
    return listRooms
  })
}
