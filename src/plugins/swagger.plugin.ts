import fp from "fastify-plugin";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

export default fp(async (fastify) => {
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: "Документація API",
        description: "Swagger для Fastify",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          cookieAuth: {
            type: "apiKey",
            in: "cookie",
            name: "token",
          },
        },
        schemas: {
          FeedItem: {
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
          ErrorResponse: {
            type: "object",
            properties: {
              statusCode: { type: "number" },
              error: { type: "string" },
              message: { type: "string" },
            },
            required: ["statusCode", "error", "message"],
            example: {
              statusCode: 401,
              error: "Unauthorized",
              message: "Missing or invalid token",
            },
          },
        },
      },
      security: [{ cookieAuth: [] }],
    },
  });

  await fastify.register(swaggerUI, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
    staticCSP: true,
    transformSpecification: (swaggerObject) => swaggerObject,
    transformSpecificationClone: true,
  });

  fastify.pluginLoaded("swagger");
});
