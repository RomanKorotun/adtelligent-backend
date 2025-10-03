import { LineItem, PrismaClient } from "@prisma/client";

export const getAllLineItems = async (
  prisma: PrismaClient
): Promise<LineItem[]> => {
  return prisma.lineItem.findMany();
};
