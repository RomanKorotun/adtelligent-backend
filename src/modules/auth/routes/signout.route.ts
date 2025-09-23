import { FastifyPluginAsync } from "fastify";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { signoutSchema } from "../schemas/signout.schema";
import { authenticate } from "../../../middlewares/authenticate";
import { signoutUser } from "../services/signout.service";

const signinRoute: FastifyPluginAsync = async (fastify) => {
  const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  route.post(
    "/auth/signout",
    {
      schema: signoutSchema,
      preHandler: authenticate(fastify),
    },
    async (request, reply) => {
      return signoutUser(reply);
    }
  );
};

export default signinRoute;
