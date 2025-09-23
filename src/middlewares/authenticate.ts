import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { TokenPayload } from "../modules/auth/types/auth.type";
import { findUserById } from "../modules/auth/repositories/user.repository";

export const authenticate =
  (fastify: FastifyInstance) =>
  async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const prisma = fastify.prisma;
    const token = request.cookies.token;
    if (!token) {
      throw fastify.httpErrors.unauthorized("No token provided");
    }

    let payload: TokenPayload;
    try {
      payload = fastify.jwt.verify<TokenPayload>(token);
    } catch {
      throw fastify.httpErrors.unauthorized("Invalid token");
    }

    const user = await findUserById(prisma, payload.userId);
    if (!user) {
      throw fastify.httpErrors.unauthorized("User not found");
    }

    request.user = user;
  };
