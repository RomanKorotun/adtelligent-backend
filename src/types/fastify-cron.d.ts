declare module "fastify-cron" {
  import { FastifyPluginCallback } from "fastify";

  interface CronJob {
    name?: string;
    cronTime: string;
    onTick: (server: any) => void | Promise<void>;
    start?: boolean;
  }

  interface FastifyCronOptions {
    jobs: CronJob[];
  }

  const fastifyCron: FastifyPluginCallback<FastifyCronOptions>;
  export default fastifyCron;
}
