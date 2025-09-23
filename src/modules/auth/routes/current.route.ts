import { FastifyPluginAsync } from "fastify";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { authenticate } from "../../../middlewares/authenticate";
import { currentUserSchema } from "../schemas/current.schema";

const currentRoute: FastifyPluginAsync = async (fastify) => {
  const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  route.get(
    "/auth/current",
    {
      schema: currentUserSchema,
      preHandler: authenticate(fastify),
    },
    async (request, reply) => {
      const user = request.user;
      reply.send({
        username: user.username,
        email: user.email,
      });
    }
  );
};

export default currentRoute;
