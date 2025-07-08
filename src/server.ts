import { fastifyCors } from "@fastify/cors"
import { fastify } from "fastify"
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider
} from "fastify-type-provider-zod"
import { env } from "./env.ts"
import { RoomsRoutes } from "./routes/rooms.ts"

const server = fastify().withTypeProvider<ZodTypeProvider>()

server.register(fastifyCors, {
  origin: "*"
})

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

server.get("/health", () => {
  return "ok"
})

server.register(RoomsRoutes)

server.listen({ port: env.PORT })
