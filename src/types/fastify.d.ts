import { PrismaClient } from "@prisma/client";
import { Config } from "../config/schema";
import "fastify";
import { TokenPayload } from "../modules/auth/types/auth.type";
import { ClickHouseClient } from "@clickhouse/client";

declare module "fastify" {
  interface FastifyInstance {
    config: Config;
    pluginLoaded: (pluginName: string) => void;
    prisma: PrismaClient;
    generateToken: (payload: TokenPayload) => string;
    validateObjectId(id: string): boolean;
    clickhouse: ClickHouseClient;
  }
}
