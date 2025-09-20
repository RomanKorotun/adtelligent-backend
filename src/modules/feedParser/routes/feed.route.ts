import { FastifyInstance } from "fastify";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { FeedQuery } from "../types/feed-query.types";

export async function feedRoute(fastify: FastifyInstance) {
  const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  route.get("/feed", {}, async (request, reply) => {
    const { url, force } = request.query as FeedQuery;
    reply.send({ hello: "feed" });
  });
}
