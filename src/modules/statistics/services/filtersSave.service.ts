import { FastifyInstance, FastifyRequest } from "fastify";
import { AuthenticatedRequest } from "../../auth/types/auth.type";
import {
  getDynamicFilterByUserAndName,
  createDynamicFilter,
} from "../repositories/dynamicFilter.repository";
import { FilterSaveBody } from "../schemas/filtersSave.schema";

export const filterSaveService = async (
  fastify: FastifyInstance,
  request: FastifyRequest
) => {
  const { name, filters } = request.body as FilterSaveBody;
  const userId = (request as AuthenticatedRequest).user.id;

  const existing = await getDynamicFilterByUserAndName(
    fastify.prisma,
    userId,
    name
  );

  if (existing) {
    throw fastify.httpErrors.conflict("Filter with this name already exists");
  }

  const newFilter = await createDynamicFilter(
    fastify.prisma,
    userId,
    name,
    filters
  );

  return newFilter;
};
