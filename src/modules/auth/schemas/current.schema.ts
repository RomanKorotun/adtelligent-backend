export const currentUserSchema = {
  tags: ["auth"],
  summary: "Get current user",
  description: "Get the current authenticated user's username and email",
  security: [{ cookieAuth: [] }],
  response: {
    200: {
      description: "Current user info",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              username: { type: "string", example: "john_doe" },
              email: { type: "string", example: "john@example.com" },
            },
            required: ["username", "email"],
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
