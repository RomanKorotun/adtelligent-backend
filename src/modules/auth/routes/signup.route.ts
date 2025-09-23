import { FastifyPluginAsync } from "fastify";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { signupSchema } from "../schemas/signup.schema";

const signupRoute: FastifyPluginAsync = async (fastify) => {
  const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  route.post("/signup", { schema: signupSchema }, async (request, reply) => {});
};

export default signupRoute;
