import { FastifyInstance, FastifyRequest } from "fastify";
import { StatisticsCollectorBody } from "../schemas/statisticsCollector.schema";
import * as cacheUtils from "../utils/cache.utils";

const cache = new Set<StatisticsCollectorBody>();
const MAX_CACHE_SIZE = 2000;
const FLUSH_INTERVAL_MS = 10000;
let interval: ReturnType<typeof setInterval> | null = null;

const initInterval = (fastify: FastifyInstance) => {
  interval = setInterval(async () => {
    if (cache.size > 0) await flushCache(fastify);
  }, FLUSH_INTERVAL_MS);

  fastify.addHook("onClose", async () => {
    if (interval) clearInterval(interval);
    if (cache.size > 0) await flushCache(fastify);
  });

  fastify.log.info("StatisticsCollectorService interval initialized");
};

export const addEvent = async (
  fastify: FastifyInstance,
  request: FastifyRequest
) => {
  if (!interval) initInterval(fastify);

  cache.add(request.body as StatisticsCollectorBody);

  if (cache.size >= MAX_CACHE_SIZE) {
    await flushCache(fastify);
  }
};

const flushCache = async (fastify: FastifyInstance) => {
  if (cache.size === 0) return;

  const rows = cacheUtils.prepareRowsForClickhouse(cache);

  try {
    await fastify.clickhouse.insert({
      table: `${fastify.config.CLICKHOUSE_DB}.${fastify.config.CLICKHOUSE_TABLE_NAME}`,
      values: rows,
      format: "JSONEachRow",
    });
    fastify.log.info(`Flushed ${rows.length} events`);
  } catch (err) {
    fastify.log.error(err, "Failed to flush events");
  }

  cache.clear();
};
