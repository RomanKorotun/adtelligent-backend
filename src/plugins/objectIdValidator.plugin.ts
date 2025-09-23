import fp from "fastify-plugin";
import { ObjectId } from "bson";

export default fp(async (fastify) => {
  fastify.decorate("validateObjectId", (id: string): boolean => {
    return ObjectId.isValid(id);
  });
});
