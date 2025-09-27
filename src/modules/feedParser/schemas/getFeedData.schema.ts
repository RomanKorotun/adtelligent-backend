export const feedDataSchema = {
  tags: ["feed"],
  summary: "Get feed articles",
  description: "Returns parsed or cached articles from RSS feed",
  security: [{ cookieAuth: [] }],
  querystring: {
    type: "object",
    additionalProperties: false,
    properties: {
      url: { type: "string", format: "uri" },
      force: { type: "number", enum: [0, 1] },
    },
  },
  response: {
    200: {
      description: "Success",
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          link: { type: "string", format: "uri" },
          isoDate: { type: "string", format: "date-time" },
        },
        required: ["id", "title", "description", "link", "isoDate"],
        example: {
          id: "68d7fbf1b715f5025845e74c",
          title:
            "Радбез ООН збирається на екстренне засідання через витівки Росії",
          description:
            "Засідання ініціювала Естонія, воно відбудеться вже завтра.",
          link: "https://www.unian.net/politics/radbez-oon-zasidannya-rosiya.html",
          isoDate: "2025-09-27T18:45:00.000Z",
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
              message: { type: "string", example: "Invalid query parameters" },
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
              message: { type: "string", example: "Missing or invalid token" },
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
