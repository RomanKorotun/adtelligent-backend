import { PrismaClient } from "@prisma/client";
import { ParsedArticle } from "../types/article.types";
import {
  createOrUpdateFeed,
  findFeedByUrl,
} from "../repositories/feed.repository";
import {
  createArticles,
  getArticlesByFeedId,
} from "../repositories/article.repository";
import { parseFeed } from "../utils/rssParser";
import { sortArticlesByDateDesc } from "../utils/sortArticles";

const DEFAULT_URL = "https://feeds.bbci.co.uk/news/rss.xml";

export const getFeed = async (
  prisma: PrismaClient,
  url?: string,
  force?: string
): Promise<ParsedArticle[]> => {
  const feedUrl = url || DEFAULT_URL;
  const forceFlag = force === "1";

  if (forceFlag) {
    const parsedItems = await parseFeed(feedUrl);
    const sortedItems = sortArticlesByDateDesc(parsedItems);
    const feed = await createOrUpdateFeed(prisma, feedUrl);
    await prisma.article.deleteMany({ where: { feedId: feed.id } });
    await createArticles(prisma, feed.id, parsedItems);
    return sortedItems;
  }

  const existingFeed = await findFeedByUrl(prisma, feedUrl);

  if (existingFeed) {
    const articles = await getArticlesByFeedId(prisma, existingFeed.id);
    if (articles.length > 0) {
      return articles;
    }

    const parsedItems = await parseFeed(feedUrl);
    await createArticles(prisma, existingFeed.id, parsedItems);
    return parsedItems;
  }

  const parsedItems = await parseFeed(feedUrl);
  const sortedItems = sortArticlesByDateDesc(parsedItems);
  const feed = await createOrUpdateFeed(prisma, feedUrl);
  await createArticles(prisma, feed.id, parsedItems);
  return sortedItems;
};
