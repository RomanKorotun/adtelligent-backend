export const feedDataSchema = {
  tags: ["feed"],
  summary: "Get feed articles",
  description: "Returns parsed or cached articles from RSS feed",
  security: [{ cookieAuth: [] }],
  querystring: {
    type: "object",
    required: ["url"],
    additionalProperties: false,
    properties: {
      url: { type: "string", format: "uri" },
      force: { type: "string", enum: ["0", "1"], default: "1" },
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
          id: "507f1f77bcf86cd799439011",
          title: "Fastify 4 Released",
          description: "Fastify 4 brings major performance improvements.",
          link: "https://fastify.io/blog/fastify-4",
          isoDate: "2025-09-22T07:29:00.584Z",
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
