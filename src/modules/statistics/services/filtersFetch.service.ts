import { FastifyInstance, FastifyRequest } from "fastify";
import { FilterFetchParams } from "../schemas/filtersFetch.schema";
import { getStaticFilterByName } from "../repositories/staticFilter.repository";
import { getDynamicFilterByUserAndName } from "../repositories/dynamicFilter.repository";
import { AuthenticatedRequest } from "../../auth/types/auth.type";
import { FilterName } from "../types/statistics.types";

export const filterService = async (
  fastify: FastifyInstance,
  request: FastifyRequest
) => {
  const { name } = request.params as FilterFetchParams;
  let filter;

  if (name === FilterName.DEFAULT) {
    filter = await getStaticFilterByName(fastify.prisma, name);
  } else {
    const userId = (request as AuthenticatedRequest).user.id;
    filter = await getDynamicFilterByUserAndName(fastify.prisma, userId, name);
  }

  if (!filter) {
    throw fastify.httpErrors.notFound("Filter not found");
  }

  return filter;
};
