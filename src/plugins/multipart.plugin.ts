import fp from "fastify-plugin";
import multipart from "@fastify/multipart";

const pluginName = "multipart-plugin";

export default fp(
  async (fastify) => {
    await fastify.register(multipart, {
      limits: {
        fileSize: 2 * 1024 * 1024,
      },
    });

    fastify.log.info("Multipart configured");
  },
  { name: pluginName }
);
