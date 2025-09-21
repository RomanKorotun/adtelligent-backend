import Fastify, { FastifyServerOptions } from "fastify";
import AutoLoad from "@fastify/autoload";
import { join } from "node:path";
import configPlugin from "./config";

export type AppOptions = Partial<FastifyServerOptions>;

const buildApp = async (options: AppOptions = {}) => {
  const fastify = Fastify({ logger: true });

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
