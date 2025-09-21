import { PrismaClient } from "@prisma/client";
import { ParsedArticle } from "../types/article.types";

export const createArticles = async (
  prisma: PrismaClient,
  feedId: string,
  items: ParsedArticle[]
) => {
  return prisma.article.createMany({
    data: items.map((item) => ({
      feedId,
      title: item.title,
      description: item.description,
      link: item.link,
      isoDate: item.isoDate,
    })),
  });
};

export const getArticlesByFeedId = async (
  prisma: PrismaClient,
  feedId: string
) => {
  return prisma.article.findMany({
    where: { feedId },
    orderBy: { isoDate: "desc" },
    select: {
      title: true,
      description: true,
      link: true,
      isoDate: true,
    },
  });
};
