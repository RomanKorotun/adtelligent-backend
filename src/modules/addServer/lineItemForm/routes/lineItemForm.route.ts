import { FastifyPluginAsync } from "fastify";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { authenticate } from "../../../../middlewares/authenticate";
import { addLineItem } from "../services/lineItem.service";
import { readFormHtml } from "../services/form.service";
import { formPageSchema } from "../schemas/formPage.schema";
import { submitLineItemSchema } from "../schemas/submitLineItem.schema";

const lineItemFormRoute: FastifyPluginAsync = async (fastify) => {
  const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  route.get(
    "/form",
    {
      preHandler: authenticate(fastify),
      schema: formPageSchema,
    },
    async (_, reply) => {
      reply.type("text/html").send(await readFormHtml());
    }
  );

  route.post(
    "/submit",
    {
      preHandler: authenticate(fastify),
      schema: submitLineItemSchema,
    },
    async (request, reply) => {
      await addLineItem(fastify, request);
      reply.send({ status: "ok" });
    }
  );
};

export default lineItemFormRoute;
