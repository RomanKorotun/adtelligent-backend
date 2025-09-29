import { FastifyPluginAsync } from "fastify";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { authenticate } from "../../../../middlewares/authenticate";
import { addLineItem } from "../services/lineItem.service";
import { readFormHtml } from "../services/form.service";

const lineItemFormRoute: FastifyPluginAsync = async (fastify) => {
  const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  route.get(
    "/form",
    { preHandler: authenticate(fastify) },
    async (_, reply) => {
      reply.type("text/html").send(await readFormHtml());
    }
  );

  route.post(
    "/submit",
    { preHandler: authenticate(fastify) },
    async (request, reply) => {
      await addLineItem(fastify, request);
      reply.send({ status: "ok" });
    }
  );
};

export default lineItemFormRoute;
