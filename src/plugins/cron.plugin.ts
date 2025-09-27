import { FastifyPluginAsync } from "fastify";
import fastifyCron from "fastify-cron";
import { updateFeed } from "../modules/feedParser/services/updateFeed.service";

const cronPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.register(fastifyCron, {
    jobs: [
      {
        name: "update-feed",
        cronTime: fastify.config.CRON_UPDATE_FEED,
        start: true,
        onTick: async () => {
          try {
            const startTime = Date.now();
            await updateFeed(fastify);
            const duration = Date.now() - startTime;
            fastify.log.info(
              `Cron: feed updated successfully in ${duration} ms`
            );
          } catch (err) {
            fastify.log.error("Cron error while updating feed:", err);
          }
        },
      },
    ],
  });
};

export default cronPlugin;
