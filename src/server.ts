import { fastifyCors } from "@fastify/cors"
import { fastify } from "fastify"
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider
} from "fastify-type-provider-zod"
import { env } from "./env.ts"
import { CreateQuestion } from "./routes/create-question.ts"
import { CreateRoom } from "./routes/create-room.ts"
import { GetRoomQuestions } from "./routes/get-room-questions.ts"
import { GetRooms } from "./routes/get-rooms.ts"

const server = fastify().withTypeProvider<ZodTypeProvider>()

server.register(fastifyCors, {
  origin: "*"
})
server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

server.get("/health", () => "ok")

server.register(GetRooms)
server.register(CreateRoom)
server.register(GetRoomQuestions)
server.register(CreateQuestion)

server.listen({ port: env.PORT })
