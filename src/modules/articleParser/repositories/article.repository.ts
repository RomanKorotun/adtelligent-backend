import { Article, PrismaClient } from "@prisma/client";

export const createArticles = async (
  prisma: PrismaClient,
  feedId: string,
  items: Pick<Article, "title" | "description" | "link" | "isoDate">[]
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
      id: true,
      title: true,
      description: true,
      link: true,
      isoDate: true,
    },
  });
};
