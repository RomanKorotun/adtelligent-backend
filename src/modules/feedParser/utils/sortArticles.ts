import { ParsedArticle } from "../types/article.types";

export const sortArticlesByDateDesc = (
  articles: ParsedArticle[]
): ParsedArticle[] => {
  return articles.sort(
    (a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime()
  );
};
