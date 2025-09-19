import buildApp from "./app";
import type {} from "./types/fastify";

const start = async () => {
  let fastify;

  try {
    fastify = await buildApp();
  } catch (error) {
    console.error("Error while building Fastify app:", error);
    process.exit(1);
  }

  const port = fastify.config.PORT;
  const host = fastify.config.HOST;

  try {
    const address = await fastify.listen({ port, host });
    console.log(`Server running at ${address}`);
  } catch (error) {
    console.error("Error while starting server:", error);
    process.exit(1);
  }
};

void start();
