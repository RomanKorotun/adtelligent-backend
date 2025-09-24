import { FastifyPluginAsync } from "fastify";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { articleParseSchema } from "../schemas/articleParse.schema";
import { getParsedArticleById } from "../services/article.service";
import { authenticate } from "../../../middlewares/authenticate";

const articleRoute: FastifyPluginAsync = async (fastify) => {
  const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  route.get(
    "/article/:id/parse",
    {
      schema: articleParseSchema,
      preHandler: authenticate(fastify),
    },
    async (request, reply) => {
      const { id } = request.params;

      if (!fastify.validateObjectId(id)) {
        throw fastify.httpErrors.badRequest("Некоректний формат id");
      }

      reply.send(await getParsedArticleById(fastify, id));
    }
  );
};

export default articleRoute;
