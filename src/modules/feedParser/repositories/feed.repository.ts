import { PrismaClient } from "@prisma/client";

export const createFeed = async (prisma: PrismaClient, url: string) => {
  return prisma.feed.create({ data: { url } });
};

export const findFeedByUrl = async (prisma: PrismaClient, url: string) => {
  return prisma.feed.findUnique({ where: { url } });
};
