import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

const pluginName = "prisma-plugin";

export default fp(
  async (fastify) => {
    const prisma = new PrismaClient();

    try {
      await prisma.$connect();
      fastify.decorate("prisma", prisma);
      fastify.log.info("Prisma connected");
    } catch (error) {
      fastify.log.error("Prisma connection failed:", error);
      process.exit(1);
    }

    fastify.addHook("onClose", async () => {
      await prisma.$disconnect();
      fastify.log.info("Prisma disconnected");
    });
  },
  {
    name: pluginName,
  }
);
