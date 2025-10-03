import { FromSchema } from "json-schema-to-ts";

export const statisticsQuerySchema = {
  tags: ["statistics"],
  summary: "Query statistics",
  description: "Returns filtered statistics from the database",
  security: [{ cookieAuth: [] }],
  body: {
    type: "object",
    required: ["date", "filters"],
    properties: {
      date: {
        type: "string",
        format: "date",
        description: "Date of events (YYYY-MM-DD)",
      },
      filters: {
        type: "object",
        patternProperties: {
          ".*": {
            type: "array",
            items: { type: "string" },
          },
        },
        additionalProperties: false,
        description: "Filter conditions by field",
      },
    },
    additionalProperties: false,
  },
} as const;

export type StatisticsQueryBody = FromSchema<typeof statisticsQuerySchema.body>;
