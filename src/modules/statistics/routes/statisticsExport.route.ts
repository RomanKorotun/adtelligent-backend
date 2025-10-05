import { FastifyPluginAsync } from "fastify";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { authenticate } from "../../../middlewares/authenticate";
import { exportStatisticsService } from "../services/statisticsExport.service";
import { statisticsExportSchema } from "../schemas/statisticsExport.schema";
import { getFileHeaders } from "../utils/fileHeaders";

const statisticsExportRoute: FastifyPluginAsync = async (fastify) => {
  const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  route.post(
    "/statExport",
    {
      preHandler: authenticate(fastify),
      schema: statisticsExportSchema,
    },
    async (request, reply) => {
      const { format } = request.body;
      const result = await exportStatisticsService(fastify, request);
      if (!result) {
        return reply.status(204).send();
      }
      return reply.headers(getFileHeaders(format)).send(result);
    }
  );
};

export default statisticsExportRoute;
