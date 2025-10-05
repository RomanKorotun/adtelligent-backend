import { FromSchema } from "json-schema-to-ts";

export const statisticsQuerySchema = {
  tags: ["statistics"],
  summary: "Query statistics",
  description: "Returns filtered statistics from the database",
  security: [{ cookieAuth: [] }],
  body: {
    type: "object",
    required: ["date", "filters", "timezone"], // 👈 додаємо timezone як обов’язкове
    properties: {
      date: {
        type: "string",
        format: "date",
        description: "Date of events (YYYY-MM-DD)",
        example: "2025-10-04",
      },
      filters: {
        type: "object",
        description: "Filter conditions by field",
        patternProperties: {
          ".*": {
            type: "array",
            items: { type: "string" },
          },
        },
        additionalProperties: false,
        example: {
          Hour: ["all"],
          Bidders: ["adtelligent", "bidmatic"],
        },
      },
      timezone: {
        type: "string",
        description: "IANA timezone string, e.g. 'Europe/Kyiv'",
        example: "Europe/Kyiv",
      },
    },
    additionalProperties: false,
  },
} as const;

export type StatisticsQueryBody = FromSchema<typeof statisticsQuerySchema.body>;
