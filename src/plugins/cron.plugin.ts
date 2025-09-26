import { FastifyPluginAsync } from "fastify";
import fastifyCron from "fastify-cron";
import { updateFeed } from "../modules/feedParser/services/updateFeed.service";

const cronPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.register(fastifyCron, {
    jobs: [
      {
        name: "update-feed",
        cronTime: "0 * * * *",
        start: true,
        onTick: async () => {
          try {
            const startTime = Date.now();
            await updateFeed(fastify);
            const duration = Date.now() - startTime;
            fastify.log.info(`Cron: фід успішно оновлено за ${duration} мс`);
          } catch (err) {
            fastify.log.error("Cron помилка при оновленні фіду:", err);
          }
        },
      },
    ],
  });
};

export default cronPlugin;
