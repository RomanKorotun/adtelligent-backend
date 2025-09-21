import Parser from "rss-parser";
import { ParsedArticle } from "../types/article.types";

const parser = new Parser();

export const parseFeed = async (url: string): Promise<ParsedArticle[]> => {
  const feed = await parser.parseURL(url);
  return feed.items.map((item) => ({
    title: item.title || "",
    description: item.contentSnippet || "",
    link: item.link || "",
    isoDate: item.isoDate || new Date().toISOString(),
  }));
};
