import { FromSchema } from "json-schema-to-ts";

export const filterSaveSchema = {
  tags: ["filters"],
  summary: "Save a dynamic filter set",
  description: "Saves a dynamic filter set for the authenticated user",
  security: [{ cookieAuth: [] }],
  body: {
    type: "object",
    required: ["name", "filters"],
    properties: {
      name: {
        type: "string",
        description: "Name of the filter set",
      },
      filters: {
        type: "array",
        description: "Array of filter items",
        items: {
          type: "object",
          required: ["name", "value"],
          properties: {
            name: {
              type: "string",
              description: "Filter name",
            },
            value: {
              type: "string",
              description: "Filter value",
            },
          },
        },
      },
    },
    example: {
      name: "custom-report",
      filters: [
        { name: "Hour", value: "all" },
        { name: "Auctions", value: "auctionInit" },
        { name: "Bidders", value: "bidders" },
        { name: "Avg CPM", value: "avgCpm" },
        { name: "Revenue", value: "revenue" },
      ],
    },
  },
  response: {
    201: {
      description: "Filter saved successfully",
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
              name: "custom-report",
              filters: [
                { name: "Hour", value: "all" },
                { name: "Auctions", value: "auctionInit" },
                { name: "Bidders", value: "bidders" },
                { name: "Avg CPM", value: "avgCpm" },
                { name: "Revenue", value: "revenue" },
              ],
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
              message: { type: "string", example: "Invalid input data" },
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
              message: { type: "string", example: "User not authenticated" },
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

export type FilterSaveBody = FromSchema<typeof filterSaveSchema.body>;
