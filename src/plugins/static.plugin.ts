import fp from "fastify-plugin";
import fastifyStatic from "@fastify/static";
import path from "path";

const pluginName = "static-plugin";

export default fp(
  async (fastify) => {
    await fastify.register(fastifyStatic, {
      root: path.join(process.cwd(), "upload"),
      prefix: "/upload/",
    });

    fastify.log.info("Static file serving configured");
  },
  { name: pluginName }
);
