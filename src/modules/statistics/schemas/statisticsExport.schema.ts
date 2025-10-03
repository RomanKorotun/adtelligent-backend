import { FromSchema } from "json-schema-to-ts";

export const statisticsExportSchema = {
  tags: ["statistics"],
  summary: "Export statistics from ClickHouse",
  description: "Returns filtered statistics as CSV or XLSX file",
  security: [{ cookieAuth: [] }],
  body: {
    type: "object",
    required: ["date", "filters", "format"],
    properties: {
      date: { type: "string", format: "date" },
      filters: {
        type: "object",
        patternProperties: {
          ".*": { type: "array", items: { type: "string" } },
        },
        additionalProperties: false,
      },
      format: { type: "string", enum: ["csv", "xlsx"] },
    },
    additionalProperties: false,
  },
} as const;

export type StatisticsExportBody = FromSchema<
  typeof statisticsExportSchema.body
>;
