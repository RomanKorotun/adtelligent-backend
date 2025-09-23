import { FastifyPluginAsync } from "fastify";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { getFeed } from "../services/feed.service";
import { feedDataSchema } from "../schemas/getFeedData.schema";
import { authenticate } from "../../../middlewares/authenticate";

const feedRoute: FastifyPluginAsync = async (fastify) => {
  const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  route.get(
    "/feed",
    {
      schema: feedDataSchema,
      preHandler: authenticate(fastify),
    },
    async (request, reply) => {
      const { url, force } = request.query;
      const data = await getFeed(fastify, url, force);
      reply.send(data);
    }
  );
};

export default feedRoute;
