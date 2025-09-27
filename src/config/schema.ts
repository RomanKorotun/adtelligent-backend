import { FromSchema } from "json-schema-to-ts";

export const EnvSchema = {
  type: "object",
  properties: {
    PORT: { type: "number" },
    HOST: { type: "string" },
    JWT_SECRET: { type: "string" },
    JWT_TIME: { type: "number" },
    CRON_UPDATE_FEED: { type: "string" },
  },
  required: ["PORT", "HOST", "JWT_SECRET", "JWT_TIME", "CRON_UPDATE_FEED"],
  additionalProperties: false,
} as const;

export type Config = FromSchema<typeof EnvSchema>;
