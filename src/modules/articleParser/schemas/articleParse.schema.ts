export const articleParseSchema = {
  tags: ["article"],
  summary: "Parse article by ID",
  description:
    "Parses a static article from the database by its ID using Cheerio (only for non-SPA sites)",
  security: [{ cookieAuth: [] }],
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: {
    200: {
      description: "Successfully parsed article content",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              mainImage: { type: "string", format: "uri" },
              description: { type: "string" },
              isoDate: { type: "string" },
            },
            required: ["title", "mainImage", "description", "isoDate"],
          },
        },
      },
    },
    400: {
      description: "Bad request — missing or invalid article ID",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              statusCode: { type: "number" },
              error: { type: "string" },
              message: { type: "string" },
            },
            required: ["statusCode", "error", "message"],
          },
        },
      },
    },
    401: {
      description: "Unauthorized — user is not authenticated",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              statusCode: { type: "number" },
              error: { type: "string" },
              message: { type: "string" },
            },
            required: ["statusCode", "error", "message"],
          },
        },
      },
    },
    500: {
      description: "Internal server error — failed to parse article content",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              statusCode: { type: "number" },
              error: { type: "string" },
              message: { type: "string" },
            },
            required: ["statusCode", "error", "message"],
          },
        },
      },
    },
  },
} as const;
