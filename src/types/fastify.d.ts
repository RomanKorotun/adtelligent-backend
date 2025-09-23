import { PrismaClient, User } from "@prisma/client";
import { Config } from "../config/schema";
import "fastify";
import { TokenPayload } from "../modules/auth/types/auth.type";

declare module "fastify" {
  interface FastifyInstance {
    config: Config;
    pluginLoaded: (pluginName: string) => void;
    prisma: PrismaClient;
    generateToken: (payload: TokenPayload) => string;
  }
}
