import { FastifyInstance } from "fastify";
import { parseFeed } from "../utils/rssParser";
import {
  createOrUpdateFeed,
  findFeedByUrl,
} from "../repositories/feed.repository";
import {
  createArticles,
  deleteArticlesByFeedId,
} from "../../articleParser/repositories/article.repository";

export const updateFeed = async (fastify: FastifyInstance) => {
  const prisma = fastify.prisma;
  const feedUrl = "https://rss.unian.net/site/news_ukr.rss";

  const existingFeed = await findFeedByUrl(prisma, feedUrl);
  const parsedItems = await parseFeed(feedUrl);

  if (existingFeed) {
    await deleteArticlesByFeedId(prisma, existingFeed.id);
    await createArticles(prisma, existingFeed.id, parsedItems);
  } else {
    const feed = await createOrUpdateFeed(prisma, feedUrl);
    await createArticles(prisma, feed.id, parsedItems);
  }
};
