import { FastifyPluginAsync } from "fastify";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { getAd } from "../services/bidHandler.service";
import { korotunAuctionResponseSchema } from "../schemas/korotunAuction.schema";

const bidHandlerRoute: FastifyPluginAsync = async (fastify) => {
  const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  route.post(
    "/korotunAuction",
    { schema: korotunAuctionResponseSchema },
    async (request, reply) => {
      reply.send(await getAd(fastify, request));
    }
  );
};

export default bidHandlerRoute;
