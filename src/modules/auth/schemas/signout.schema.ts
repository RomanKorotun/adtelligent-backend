export const signoutSchema = {
  tags: ["auth"],
  summary: "User logout",
  description: "Log out the current user",
  security: [{ cookieAuth: [] }],
  response: {
    200: {
      description: "User logged out successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "Logged out successfully" },
            },
            required: ["message"],
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
