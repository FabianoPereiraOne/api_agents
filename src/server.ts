import { fastifyCors } from "@fastify/cors"
import { fastifyMultipart } from "@fastify/multipart"
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
import { UploadAudio } from "./routes/upload-audio.ts"

const server = fastify().withTypeProvider<ZodTypeProvider>()

server.register(fastifyCors, {
  origin: "*"
})
server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

server.get("/health", () => "ok")
server.register(fastifyMultipart)
server.register(GetRooms)
server.register(CreateRoom)
server.register(GetRoomQuestions)
server.register(CreateQuestion)
server.register(UploadAudio)

server.listen({ port: env.PORT })
