import { FromSchema } from "json-schema-to-ts";

export const statisticsCollectorSchema = {
  tags: ["statistics"],
  summary: "Add an event to statistics",
  description: "Stores an event in the ClickHouse database",
  security: [{ cookieAuth: [] }],
  body: {
    type: "object",
    required: ["event", "data"],
    properties: {
      event: { type: "string", description: "Event name/type" },
      data: { type: "object", description: "Event payload" },
    },
  },
  response: {
    200: {
      description: "Event successfully cached",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string", example: "ok" },
            },
            required: ["status"],
          },
        },
      },
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
                example: "Request body is empty or invalid",
              },
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
                example: "Failed to write event to ClickHouse",
              },
            },
            required: ["statusCode", "error", "message"],
          },
        },
      },
    },
  },
} as const;

export type StatisticsCollectorBody = FromSchema<
  typeof statisticsCollectorSchema.body
>;
