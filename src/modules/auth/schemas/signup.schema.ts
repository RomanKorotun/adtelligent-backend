import { FromSchema } from "json-schema-to-ts";

export const signupSchema = {
  tags: ["auth"],
  summary: "User registration",
  description: "Register a new user",
  body: {
    type: "object",
    required: ["username", "email", "password"],
    additionalProperties: false,
    properties: {
      username: {
        type: "string",
        minLength: 3,
        maxLength: 20,
        description: "Username must be between 3 and 20 characters",
        example: "John",
      },
      email: {
        type: "string",
        format: "email",
        description: "Valid email address",
        example: "john@example.com",
      },
      password: {
        type: "string",
        minLength: 6,
        pattern: "^(?=.*[A-Z])(?=.*\\d).+$",
        description:
          "Password must include at least one digit and one uppercase letter",
        example: "J1234567",
      },
    },
  },
  response: {
    201: {
      description: "User created successfully",
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
    409: {
      description: "Conflict",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              statusCode: { type: "number", example: 409 },
              error: { type: "string", example: "Conflict" },
              message: { type: "string", example: "Email already registered" },
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

export type SignupBody = FromSchema<typeof signupSchema.body>;
