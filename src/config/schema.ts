import { FromSchema } from "json-schema-to-ts";

export const EnvSchema = {
  type: "object",
  properties: {
    PORT: { type: "number" },
    HOST: { type: "string" },
    MONGO_USERNAME: { type: "string" },
    MONGO_PASSWORD: { type: "string" },
  },
  required: ["PORT", "HOST", "MONGO_USERNAME", "MONGO_PASSWORD"],
  additionalProperties: false,
} as const;

export type Config = FromSchema<typeof EnvSchema>;
