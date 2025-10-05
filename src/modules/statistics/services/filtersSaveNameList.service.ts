import { FastifyInstance, FastifyRequest } from "fastify";
import { AuthenticatedRequest } from "../../auth/types/auth.type";
import { getDynamicFilterNameListByUserId } from "../repositories/dynamicFilter.repository";
import { DynamicFilter } from "@prisma/client";

export const filtersSaveNameListService = async (
  fastify: FastifyInstance,
  request: FastifyRequest
): Promise<Pick<DynamicFilter, "id" | "name">[]> => {
  const userId = (request as AuthenticatedRequest).user.id;
  return await getDynamicFilterNameListByUserId(fastify.prisma, userId);
};
