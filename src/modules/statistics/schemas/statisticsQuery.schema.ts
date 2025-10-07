import { FromSchema } from "json-schema-to-ts";

export const statisticsQuerySchema = {
  tags: ["statistics"],
  summary: "Query statistics",
  description: "Returns filtered statistics from the database",
  security: [{ cookieAuth: [] }],
  body: {
    type: "object",
    required: ["date", "filters", "timezone"],
    properties: {
      date: {
        type: "string",
        format: "date",
        description: "Date of events (YYYY-MM-DD)",
        example: "2025-10-07",
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
          Auctions: ["auctions"],
          Bidders: ["bidders"],
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
  response: {
    200: {
      description: "Statistics successfully retrieved",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: true,
              example: {
                date: "2025-10-04",
                hour: "12:00",
                auctions: 126,
                bidders: 3,
                revenue: 56.78,
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              statusCode: { type: "number", example: 400 },
              error: { type: "string", example: "Bad Request" },
              message: {
                type: "string",
                example:
                  "Missing required field 'date' or invalid filter format",
              },
            },
            required: ["statusCode", "error", "message"],
          },
        },
      },
    },
    401: {
      description: "Unauthorized",
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
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              statusCode: { type: "number", example: 500 },
              error: { type: "string", example: "Internal Server Error" },
              message: {
                type: "string",
                example: "Failed to query ClickHouse or process data",
              },
            },
            required: ["statusCode", "error", "message"],
          },
        },
      },
    },
  },
} as const;

export type StatisticsQueryBody = FromSchema<typeof statisticsQuerySchema.body>;
