export const articleParseSchema = {
  tags: ["article"],
  summary: "Parse article by ID",
  description:
    "Parses a static article from the database by its ID using Cheerio",
  security: [{ cookieAuth: [] }],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
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
              isoDate: { type: "string", format: "date-time" },
            },
            required: ["title", "mainImage", "description", "isoDate"],
            example: {
              title:
                "Радбез ООН збирається на екстренне засідання через витівки Росії",
              mainImage: "https://www.unian.net/images/article-main.jpg",
              description:
                "Засідання ініціювала Естонія, воно відбудеться вже завтра.",
              isoDate: "2025-09-27T18:45:00.000Z",
            },
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
                example: "Invalid article ID format",
              },
            },
            required: ["statusCode", "error", "message"],
          },
        },
      },
    },
    404: {
      description: "Not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              statusCode: { type: "number", example: 404 },
              error: { type: "string", example: "Not Found" },
              message: {
                type: "string",
                example: "Article not found",
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
              message: {
                type: "string",
                example: "Missing or invalid token",
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
                example: "Something went wrong while parsing the article",
              },
            },
            required: ["statusCode", "error", "message"],
          },
        },
      },
    },
  },
} as const;
