import { FastifyInstance } from "fastify";
import { authenticate } from "../../../middlewares/authenticate";
import { filtersSaveNameListService } from "../services/filtersSaveNameList.service";
import { filtersSaveNameListShema } from "../schemas/filtersSaveNameList.shema";

const filtersRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    "/filters/saved/list",
    {
      preHandler: authenticate(fastify),
      schema: filtersSaveNameListShema,
    },
    async (request, reply) => {
      return reply.send(await filtersSaveNameListService(fastify, request));
    }
  );
};

export default filtersRoute;
