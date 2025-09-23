import {
  createOrUpdateFeed,
  findFeedByUrl,
} from "../repositories/feed.repository";
import {
  createArticles,
  getArticlesByFeedId,
} from "../../articleParser/repositories/article.repository";
import { parseFeed } from "../utils/rssParser";

import { FastifyInstance } from "fastify";
import { Article } from "@prisma/client";

const DEFAULT_URL = "https://feeds.bbci.co.uk/news/rss.xml";

export const getFeed = async (
  fastify: FastifyInstance,
  url: string,
  force: string
): Promise<
  Pick<Article, "id" | "title" | "description" | "link" | "isoDate">[]
> => {
  const prisma = fastify.prisma;

  const feedUrl = url || DEFAULT_URL;
  const forceFlag = force === "1";

  if (forceFlag) {
    const parsedItems = await parseFeed(feedUrl);
    const feed = await createOrUpdateFeed(prisma, feedUrl);
    await prisma.article.deleteMany({ where: { feedId: feed.id } });
    await createArticles(prisma, feed.id, parsedItems);
    const articlesFromDb = await getArticlesByFeedId(prisma, feed.id);
    return articlesFromDb;
  }

  const existingFeed = await findFeedByUrl(prisma, feedUrl);

  if (existingFeed) {
    const articles = await getArticlesByFeedId(prisma, existingFeed.id);

    if (articles.length > 0) {
      return articles;
    }

    const parsedItems = await parseFeed(feedUrl);
    await createArticles(prisma, existingFeed.id, parsedItems);
    const articlesFromDb = await getArticlesByFeedId(prisma, existingFeed.id);
    return articlesFromDb;
  }

  const parsedItems = await parseFeed(feedUrl);
  const feed = await createOrUpdateFeed(prisma, feedUrl);
  await createArticles(prisma, feed.id, parsedItems);
  const articlesFromDb = await getArticlesByFeedId(prisma, feed.id);
  return articlesFromDb;
};
