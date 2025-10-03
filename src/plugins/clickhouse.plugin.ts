import fp from "fastify-plugin";
import { createClient, ClickHouseClient } from "@clickhouse/client";
import { FastifyInstance } from "fastify";

export default fp(
  async (fastify: FastifyInstance) => {
    const ch: ClickHouseClient = createClient({
      url: `http://${fastify.config.CLICKHOUSE_HOST}:${fastify.config.CLICKHOUSE_PORT}`,
      username: fastify.config.CLICKHOUSE_USER,
      password: fastify.config.CLICKHOUSE_PASSWORD,
      database: fastify.config.CLICKHOUSE_DB,
    });

    try {
      await ch.exec({
        query: `CREATE DATABASE IF NOT EXISTS ${fastify.config.CLICKHOUSE_DB}`,
      });

      await ch.exec({
        query: `
          CREATE TABLE IF NOT EXISTS ${fastify.config.CLICKHOUSE_DB}.${fastify.config.CLICKHOUSE_TABLE_NAME} (
            id UUID DEFAULT generateUUIDv4(),
            eventType String,
            message String,
            time DateTime DEFAULT now()
          ) ENGINE = MergeTree()
          ORDER BY (time, id)
        `,
      });

      fastify.log.info("ClickHouse database and table initialized");
    } catch (error) {
      fastify.log.error(error, "Failed to initialize ClickHouse");
      throw error;
    }

    fastify.decorate("clickhouse", ch);

    fastify.addHook("onClose", async () => {
      await ch.close();
      fastify.log.info("ClickHouse connection closed");
    });
  },
  {
    name: "clickhouse-plugin",
  }
);
