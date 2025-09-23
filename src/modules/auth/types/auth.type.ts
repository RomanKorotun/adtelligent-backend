import { User } from "@prisma/client";
import { FastifyRequest } from "fastify";

export interface TokenPayload {
  userId: string;
}

export interface AuthenticatedRequest extends FastifyRequest {
  user: User;
}
