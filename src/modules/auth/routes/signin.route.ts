import { FastifyPluginAsync } from "fastify";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { signinUser } from "../services/signin.service";
import { signinSchema } from "../schemas/signin.schema";

const signinRoute: FastifyPluginAsync = async (fastify) => {
  const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  route.post(
    "/auth/signin",
    { schema: signinSchema },
    async (request, reply) => {
      const body = request.body;
      const user = await signinUser(fastify, reply, body);
      reply.send(user);
    }
  );
};

export default signinRoute;
