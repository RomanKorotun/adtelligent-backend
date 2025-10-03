import { FastifyPluginAsync } from "fastify";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { authenticate } from "../../../middlewares/authenticate";
import { getStatistics } from "../services/statisticsQuery.service";
import { statisticsQuerySchema } from "../schemas/statisticsQuery.schema";

const statisticsCollectorRoute: FastifyPluginAsync = async (fastify) => {
  const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  route.post(
    "/statQuery",
    {
      preHandler: authenticate(fastify),
      schema: statisticsQuerySchema,
    },
    async (request, reply) => {
      reply.send(await getStatistics(fastify, request));
    }
  );
};

export default statisticsCollectorRoute;
