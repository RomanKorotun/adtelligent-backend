import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { authenticate } from "../../../middlewares/authenticate";
import { filterSaveSchema } from "../schemas/filtersSave.schema";
import { filterSaveService } from "../services/filtersSave.service";

const filtersSaveRoute: FastifyPluginAsync = async (
  fastify: FastifyInstance
) => {
  fastify.post(
    "/filters/save",
    {
      preHandler: authenticate(fastify),
      schema: filterSaveSchema,
    },
    async (request, reply) => {
      const savedFilter = await filterSaveService(fastify, request);
      return reply.status(201).send(savedFilter);
    }
  );
};

export default filtersSaveRoute;
