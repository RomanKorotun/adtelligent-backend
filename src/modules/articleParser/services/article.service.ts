import { FastifyInstance } from "fastify";
import { parseUnianArticle } from "../utils/parsers/unianParser";
import { parseHtmlArticle } from "../utils/parsers";

export const getParsedArticleById = async (
  fastify: FastifyInstance,
  articleId: string
) => {
  const prisma = fastify.prisma;

  const article = await prisma.article.findUnique({
    where: { id: articleId },
  });

  if (!article) {
    throw fastify.httpErrors.badRequest("Article not found or ID is invalid");
  }

  return await parseHtmlArticle(article.link);
};
