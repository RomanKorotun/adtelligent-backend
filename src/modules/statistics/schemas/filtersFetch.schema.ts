import { FromSchema } from "json-schema-to-ts";

export const filterFetchSchema = {
  tags: ["filters"],
  summary: "Get a filter set",
  description: "Returns a filter set (static or dynamic) from the database",
  security: [{ cookieAuth: [] }],
  params: {
    type: "object",
    required: ["name"],
    properties: {
      name: {
        type: "string",
        description: "Filter set name (e.g. 'default' or saved name)",
      },
    },
  },
  response: {
    200: {
      description: "Filter found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              filters: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    value: { type: "string" },
                  },
                  required: ["name", "value"],
                },
              },
            },
            required: ["id", "name", "filters"],
            example: {
              id: "68e0d2425afab618012fccb3",
              name: "default",
              filters: [
                { name: "Hour", value: "all" },
                { name: "Auctions", value: "auctionInit" },
                { name: "Bidders", value: "bidders" },
                { name: "Avg CPM", value: "avgCpm" },
              ],
            },
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
    404: {
      description: "Filter not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              statusCode: { type: "number", example: 404 },
              error: { type: "string", example: "Not Found" },
              message: { type: "string", example: "Filter not found" },
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
              message: { type: "string", example: "Something went wrong" },
            },
            required: ["statusCode", "error", "message"],
          },
        },
      },
    },
  },
} as const;

export type FilterFetchParams = FromSchema<typeof filterFetchSchema.params>;
