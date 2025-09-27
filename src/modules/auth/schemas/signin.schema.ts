import { FromSchema } from "json-schema-to-ts";

export const signinSchema = {
  tags: ["auth"],
  summary: "User login",
  description: "Logs in a user and returns username and email",
  body: {
    type: "object",
    required: ["email", "password"],
    additionalProperties: false,
    properties: {
      email: {
        type: "string",
        format: "email",
        description: "Valid email address",
        example: "john@example.com",
      },
      password: {
        type: "string",
        minLength: 6,
        description: "User password",
        example: "J1234567",
      },
    },
  },
  response: {
    200: {
      description: "User logged in successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              username: { type: "string", example: "John" },
              email: {
                type: "string",
                format: "email",
                example: "john@example.com",
              },
            },
            required: ["username", "email"],
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
              message: { type: "string", example: "Invalid email or password" },
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

export type SigninBody = FromSchema<typeof signinSchema.body>;
