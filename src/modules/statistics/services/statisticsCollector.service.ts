import { FastifyInstance, FastifyRequest } from "fastify";
import { StatisticsCollectorBody } from "../schemas/statisticsCollector.schema";
import * as cacheUtils from "../utils/cache.utils";
import {
  MAX_CACHE_SIZE,
  FLUSH_INTERVAL_MS,
} from "../constants/statistics.constants";

const cache = new Set<StatisticsCollectorBody>();
let interval: ReturnType<typeof setInterval> | null = null;

export const initInterval = (fastify: FastifyInstance) => {
  if (interval) return;

  interval = setInterval(async () => {
    if (cache.size > 0) {
      fastify.log.info(
        `[interval] flushCache triggered with ${cache.size} items`
      );
      await flushCache(fastify);
    } else {
      fastify.log.info(`[interval] flushCache skipped (empty cache)`);
    }
  }, FLUSH_INTERVAL_MS);

  fastify.addHook("onClose", async () => {
    if (interval) clearInterval(interval);
    if (cache.size > 0) {
      fastify.log.info(
        `[onClose] flushCache triggered with ${cache.size} items`
      );
      await flushCache(fastify);
    }
  });

  fastify.log.info("StatisticsCollectorService interval initialized");
};

export const addEvent = async (
  fastify: FastifyInstance,
  request: FastifyRequest
) => {
  cache.add(request.body as StatisticsCollectorBody);

  if (cache.size >= MAX_CACHE_SIZE) {
    fastify.log.info(`[addEvent] cache full (${cache.size}), flushing`);
    await flushCache(fastify);
  } else {
    fastify.log.info(`[addEvent] cache size: ${cache.size}`);
  }
};

const flushCache = async (fastify: FastifyInstance) => {
  if (cache.size === 0) {
    fastify.log.info(`[flushCache] skipped (empty cache)`);
    return;
  }

  const rows = cacheUtils.prepareRowsForClickhouse(cache);

  fastify.log.info(`[flushCache] preparing to insert ${rows.length} rows`);

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

  fastify.log.info(`[flushCache] cache cleared`);
};
