// import { FromSchema } from "json-schema-to-ts";

// export const statisticsExportSchema = {
//   tags: ["statistics"],
//   summary: "Export statistics from ClickHouse",
//   description: "Returns filtered statistics as CSV or XLSX file",
//   security: [{ cookieAuth: [] }],
//   body: {
//     type: "object",
//     required: ["date", "filters", "format"],
//     properties: {
//       date: { type: "string", format: "date" },
//       filters: {
//         type: "object",
//         patternProperties: {
//           ".*": { type: "array", items: { type: "string" } },
//         },
//         additionalProperties: false,
//       },
//       format: { type: "string", enum: ["csv", "xlsx"] },
//     },
//     additionalProperties: false,
//   },
// } as const;

// export type StatisticsExportBody = FromSchema<
//   typeof statisticsExportSchema.body
// >;

import { FromSchema } from "json-schema-to-ts";

export const statisticsExportSchema = {
  tags: ["statistics"],
  summary: "Export statistics from ClickHouse",
  description: "Returns filtered statistics as CSV or XLSX file",
  security: [{ cookieAuth: [] }],
  body: {
    type: "object",
    required: ["date", "filters", "format", "timezone"],
    properties: {
      date: { type: "string", format: "date" },
      filters: {
        type: "object",
        patternProperties: {
          ".*": { type: "array", items: { type: "string" } },
        },
        additionalProperties: false,
      },
      timezone: { type: "string" },
      format: { type: "string", enum: ["csv", "xlsx"] },
    },
    example: {
      date: "2025-10-07",
      filters: { Hour: ["all"], Auctions: ["auctions"], Bidders: ["bidders"] },
      timezone: "Europe/Kyiv",
      format: "xlsx",
    },
  },
  response: {
    200: {
      description: "Statistics file successfully generated",
    },
    204: {
      description: "No content — no statistics found for the filters",
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              statusCode: { type: "number", example: 400 },
              error: { type: "string", example: "Bad Request" },
              message: {
                type: "string",
                example: "Missing required field 'date'",
              },
            },
            required: ["statusCode", "error", "message"],
          },
        },
      },
    },
    401: {
      description: "Unauthorized — invalid or missing authentication token",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              statusCode: { type: "number", example: 401 },
              error: { type: "string", example: "Unauthorized" },
              message: { type: "string", example: "Invalid or missing token" },
            },
            required: ["statusCode", "error", "message"],
          },
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              statusCode: { type: "number", example: 500 },
              error: { type: "string", example: "Internal Server Error" },
              message: {
                type: "string",
                example: "Failed to generate statistics file",
              },
            },
            required: ["statusCode", "error", "message"],
          },
        },
      },
    },
  },
} as const;

export type StatisticsExportBody = FromSchema<
  typeof statisticsExportSchema.body
>;
