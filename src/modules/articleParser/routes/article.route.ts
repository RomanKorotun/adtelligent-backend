import { FastifyPluginAsync } from "fastify";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { articleParseSchema } from "../schemas/articleParse.schema";
import { getParsedArticleById } from "../services/article.service";

const articleRoute: FastifyPluginAsync = async (fastify) => {
  const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  route.get(
    "/article/:id/parse",
    { schema: articleParseSchema },
    async (request, reply) => {
      const { id } = request.params;

      if (!fastify.validateObjectId(id)) {
        throw fastify.httpErrors.badRequest("Некоректний формат id");
      }

      const parsedArticle = await getParsedArticleById(fastify, id);

      reply.send(parsedArticle);
    }
  );
};

export default articleRoute;
