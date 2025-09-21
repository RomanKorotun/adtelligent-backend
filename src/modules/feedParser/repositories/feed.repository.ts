import { PrismaClient } from "@prisma/client";

export const createOrUpdateFeed = async (prisma: PrismaClient, url: string) => {
  return prisma.feed.upsert({
    where: { url },
    update: { url },
    create: { url },
  });
};

export const findFeedByUrl = async (prisma: PrismaClient, url: string) => {
  return prisma.feed.findUnique({ where: { url } });
};
