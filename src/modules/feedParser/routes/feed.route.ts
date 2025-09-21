import { FastifyPluginAsync } from "fastify";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { FeedQuery } from "../types/feed-query.types";
import { getFeed } from "../services/feed.service";
import { getFeedDataSchema } from "../schemas/getFeedData.schema";

const feedRoute: FastifyPluginAsync = async (fastify) => {
  const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  route.get("/feed", { schema: getFeedDataSchema }, async (request, reply) => {
    const { url, force } = request.query as FeedQuery;
    const data = await getFeed(fastify.prisma, url, force);
    reply.send(data);
  });
};

export default feedRoute;
