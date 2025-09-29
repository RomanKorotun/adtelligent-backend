import { PrismaClient } from "@prisma/client";
import { LineItem } from "../types/lineItem.types";

export const createLineItem = async (prisma: PrismaClient, data: LineItem) => {
  return prisma.lineItem.create({ data });
};
