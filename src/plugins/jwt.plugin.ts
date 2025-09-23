import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import jwt from "@fastify/jwt";
import { TokenPayload } from "../modules/auth/types/auth.type";

const pluginName = "jwt-plugin";

export default fp(
  async (fastify: FastifyInstance) => {
    const secret = fastify.config.JWT_SECRET;
    const expiresIn = fastify.config.JWT_TIME;

    await fastify.register(jwt, {
      secret,
      sign: { expiresIn },
    });

    fastify.decorate("generateToken", (payload: TokenPayload) => {
      return fastify.jwt.sign(payload);
    });
  },
  { name: pluginName }
);
