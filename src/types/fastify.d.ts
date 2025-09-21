import { PrismaClient } from "@prisma/client";
import { Config } from "../config/schema";
import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    config: Config;
    pluginLoaded: (pluginName: string) => void;
    prisma: PrismaClient;
  }
}
