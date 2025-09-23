import { FastifyInstance, FastifyReply } from "fastify";
import bcrypt from "bcrypt";
import { SigninBody } from "../schemas/signin.schema";
import { findUserByEmail } from "../repositories/user.repository";
import { setTokenCookie } from "./cookie.service";
import { User } from "@prisma/client";

export const signinUser = async (
  fastify: FastifyInstance,
  reply: FastifyReply,
  body: SigninBody
): Promise<Pick<User, "username" | "email">> => {
  const { email, password } = body;

  const prisma = fastify.prisma;

  const user = await findUserByEmail(prisma, email);
  if (!user) {
    throw fastify.httpErrors.unauthorized("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw fastify.httpErrors.unauthorized("Invalid email or password");
  }

  const token = fastify.generateToken({ userId: user.id });

  setTokenCookie(fastify, reply, token);

  return {
    email: user.email,
    username: user.username,
  };
};
