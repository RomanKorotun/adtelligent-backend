import fp from "fastify-plugin";
import fastifyCors from "@fastify/cors";

const pluginName = "cors-plugin";

export default fp(
  async (fastify) => {
    await fastify.register(fastifyCors, {
      origin: [
        "http://localhost:5173",
        "https://adtelligent-backend-production.up.railway.app",
      ],
      credentials: true,
    });

    fastify.log.info("CORS configured");
  },
  {
    name: pluginName,
  }
);
