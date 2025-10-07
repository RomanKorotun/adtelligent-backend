import { FromSchema } from "json-schema-to-ts";

export const EnvSchema = {
  type: "object",
  properties: {
    PORT: { type: "number" },
    HOST: { type: "string" },
    JWT_SECRET: { type: "string" },
    JWT_TIME: { type: "number" },
    CRON_UPDATE_FEED: { type: "string" },
    BACKEND_URL: { type: "string" },
    CLICKHOUSE_DB: { type: "string" },
    CLICKHOUSE_TABLE_NAME: { type: "string" },
    CLICKHOUSE_USER: { type: "string" },
    CLICKHOUSE_PASSWORD: { type: "string" },
    CLICKHOUSE_PROTOCOL: { type: "string" },
    CLICKHOUSE_HOST: { type: "string" },
    CLICKHOUSE_PORT: { type: "number" },
  },
  required: [
    "PORT",
    "HOST",
    "JWT_SECRET",
    "JWT_TIME",
    "CRON_UPDATE_FEED",
    "BACKEND_URL",
    "CLICKHOUSE_DB",
    "CLICKHOUSE_TABLE_NAME",
    "CLICKHOUSE_USER",
    "CLICKHOUSE_PASSWORD",
    "CLICKHOUSE_PROTOCOL",
    "CLICKHOUSE_HOST",
    "CLICKHOUSE_PORT",
  ],
  additionalProperties: false,
} as const;

export type Config = FromSchema<typeof EnvSchema>;
