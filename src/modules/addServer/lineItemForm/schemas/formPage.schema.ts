export const formPageSchema = {
  tags: ["lineItem"],
  summary: "Line Item Creation Form",
  description:
    "Returns an HTML page containing a form for creating a new advertising line item.",
  security: [{ cookieAuth: [] }],
  response: {
    200: {
      description: "HTML form page",
      content: {
        "text/html": {
          schema: {
            type: "string",
            example: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Line Item Form</title>
  </head>
  <body>
    <h1>Create Line Item</h1>
    <form>
      <input type="number" name="width" placeholder="Width" />
      <input type="number" name="height" placeholder="Height" />
      <button type="submit">Submit</button>
    </form>
  </body>
</html>`,
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
