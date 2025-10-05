import { FastifyInstance } from "fastify";
import { filterService } from "../services/filtersFetch.service";
import { authenticate } from "../../../middlewares/authenticate";
import { filterFetchSchema } from "../schemas/filtersFetch.schema";

const filtersRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    "/filters/:name",
    {
      preHandler: authenticate(fastify),
      schema: filterFetchSchema,
    },
    async (request, reply) => {
      return reply.send(await filterService(fastify, request));
    }
  );
};

export default filtersRoute;
