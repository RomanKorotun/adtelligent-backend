import { FastifyPluginAsync } from "fastify";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { getAd } from "../services/bidHandler.service";

const bidHandlerRoute: FastifyPluginAsync = async (fastify) => {
  const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  route.post("/korotunAuction", {}, async (request, reply) => {
    reply.send(await getAd(fastify, request));
  });
};

export default bidHandlerRoute;
