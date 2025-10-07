import Fastify, { FastifyServerOptions } from "fastify";
import AutoLoad from "@fastify/autoload";
import { join } from "node:path";
import configPlugin from "./config";
import { initOpenTelemetry } from "./openTelemetry";

export type AppOptions = Partial<FastifyServerOptions>;

const buildApp = async (options: AppOptions = {}) => {
  const { sdk, meter } = await initOpenTelemetry();

  const fastify = Fastify({
    logger: {
      level: "info",
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      },
    },
    trustProxy: true,
  });

  const requestCounter = meter.createCounter("http_requests_total", {
    description: "Total HTTP requests",
  });

  fastify.addHook("onResponse", (request, reply, done) => {
    requestCounter.add(1, { route: request.url });
    done();
  });

  fastify.addHook("onClose", async () => {
    fastify.log.info("Closing OpenTelemetry SDK...");
    await sdk.shutdown();
  });

  process.on("SIGINT", async () => {
    await fastify.close();
  });

  process.on("SIGTERM", async () => {
    await fastify.close();
  });

  await fastify.register(configPlugin);

  try {
    fastify.decorate("pluginLoaded", (pluginName: string) => {
      fastify.log.info(`Plugin loaded: ${pluginName}`);
    });

    fastify.log.info("Starting to load plugins");
    await fastify.register(AutoLoad, {
      dir: join(__dirname, "plugins"),
      options: options,
      ignorePattern: /^((?!plugin).)*$/,
    });
    fastify.log.info("Plugins loaded successfully");

    await fastify.register(AutoLoad, {
      dir: join(__dirname, "modules"),
      options,
      dirNameRoutePrefix: false,
    });
    fastify.log.info("Routes loaded successfully");
  } catch (error) {
    fastify.log.error("Error in autoload:", error);
    throw error;
  }

  return fastify;
};

export default buildApp;
