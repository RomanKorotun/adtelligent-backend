export const submitLineItemSchema = {
  tags: ["lineItem"],
  summary: "Submit Line Item Form",
  description: "Creates a new advertising creative",
  consumes: ["multipart/form-data"],
  security: [{ cookieAuth: [] }],
  response: {
    200: {
      description: "Line item successfully created",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: { status: { type: "string", example: "ok" } },
            required: ["status"],
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
                example: "Missing required fields or invalid input",
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
              message: { type: "string", example: "Something went wrong" },
            },
            required: ["statusCode", "error", "message"],
          },
        },
      },
    },
  },
} as const;
