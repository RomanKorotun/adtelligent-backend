export const feedDataSchema = {
  tags: ["feed"],
  summary: "Get feed articles",
  description: "Returns parsed or cached articles from RSS feed",
  querystring: {
    type: "object",
    additionalProperties: false,
    required: ["url"],
    properties: {
      url: { type: "string", format: "uri" },
      force: { type: "string", enum: ["0", "1"], default: "1" },
    },
  },
  response: {
    200: {
      description: "Successfully retrieved articles",
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          link: { type: "string", format: "uri" },
          isoDate: { type: "string", format: "date-time" },
        },
        required: ["title", "description", "link", "isoDate"],
      },
    },
    400: {
      description: "Bad request - invalid query parameters",
      type: "object",
      properties: {
        statusCode: { type: "number" },
        error: { type: "string" },
        message: { type: "string" },
      },
      required: ["statusCode", "error", "message"],
    },
    500: {
      description: "Internal server error",
      type: "object",
      properties: {
        statusCode: { type: "number" },
        error: { type: "string" },
        message: { type: "string" },
      },
      required: ["statusCode", "error", "message"],
    },
  },
} as const;
