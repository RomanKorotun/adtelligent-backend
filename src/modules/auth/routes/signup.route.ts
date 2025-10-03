import { FastifyPluginAsync } from "fastify";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { signupSchema } from "../schemas/signup.schema";
import { signupUser } from "../services/signup.service";

const signupRoute: FastifyPluginAsync = async (fastify) => {
  const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  route.post(
    "/auth/signup",
    { schema: signupSchema },
    async (request, reply) => {
      const body = request.body;
      const user = await signupUser(fastify, reply, body);
      reply.status(201).send(user);
    }
  );
};

export default signupRoute;
