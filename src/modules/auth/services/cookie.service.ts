import { FastifyInstance, FastifyReply } from "fastify";

const isProd = process.env.NODE_ENV === "production";

export const setTokenCookie = (
  fastify: FastifyInstance,
  reply: FastifyReply,
  token: string
) => {
  const tokenTime = fastify.config.JWT_TIME;

  reply.setCookie("token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
    maxAge: tokenTime,
  });
};

export const clearTokenCookie = (reply: FastifyReply) => {
  const isProd = process.env.NODE_ENV === "production";

  reply.clearCookie("token", {
    path: "/",
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
  });
};
