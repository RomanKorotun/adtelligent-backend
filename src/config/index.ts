import fastifyEnv from "@fastify/env";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import Ajv from "ajv";
import type { Options } from "ajv";
import ajvFormats from "ajv-formats";
import { EnvSchema } from "./schema";

const ajvOptions: Options = {
  allErrors: true,
  removeAdditional: "all",
  coerceTypes: true,
  useDefaults: true,
};

export default fp(
  async (fastify: FastifyInstance) => {
    try {
      await fastify.register(fastifyEnv, {
        confKey: "config",
        schema: EnvSchema,
        dotenv: true,
        data: process.env as any,
        ajv: {
          customOptions: () => {
            const ajv = new Ajv(ajvOptions);
            ajvFormats(ajv);
            return ajv;
          },
        },
      });
      fastify.log.info("Environment variables loaded successfully");

      const ajv = new Ajv({
        ...ajvOptions,
        strict: false,
      });
      ajvFormats(ajv);
      fastify.setValidatorCompiler(({ schema }) => ajv.compile(schema));
    } catch (error) {
      fastify.log.error("Error in config plugin:", error);
      throw error;
    }
  },
  {
    name: "config-plugin",
  }
);
