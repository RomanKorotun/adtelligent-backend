import { FastifyPluginAsync } from "fastify";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { authenticate } from "../../../middlewares/authenticate";
import { addEvent } from "../services/statisticsCollector.service";
import { statisticsCollectorSchema } from "../schemas/statisticsCollector.schema";

const statisticsCollectorRoute: FastifyPluginAsync = async (fastify) => {
  const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  route.post(
    "/statistics",
    {
      preHandler: authenticate(fastify),
      schema: statisticsCollectorSchema,
    },
    async (request, reply) => {
      await addEvent(fastify, request);
      reply.send({ status: "ok" });
    }
  );
};

export default statisticsCollectorRoute;
