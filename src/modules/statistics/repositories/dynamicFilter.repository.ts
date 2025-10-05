import { DynamicFilter, PrismaClient } from "@prisma/client";

export const createDynamicFilter = async (
  prisma: PrismaClient,
  userId: string,
  name: string,
  filters: Array<{ name: string; value: string }>
): Promise<DynamicFilter> => {
  return prisma.dynamicFilter.create({
    data: {
      userId,
      name,
      filters,
    },
  });
};

export const getDynamicFilterByUserAndName = async (
  prisma: PrismaClient,
  userId: string,
  name: string
): Promise<Pick<DynamicFilter, "id" | "name" | "filters"> | null> => {
  return prisma.dynamicFilter.findFirst({
    where: { userId, name },
  });
};

export const getDynamicFilterNameListByUserId = async (
  prisma: PrismaClient,
  userId: string
): Promise<Pick<DynamicFilter, "id" | "name">[]> => {
  return prisma.dynamicFilter.findMany({
    where: { userId },
    select: { id: true, name: true },
  });
};
