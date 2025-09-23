import { FastifyInstance, FastifyReply } from "fastify";
import bcrypt from "bcrypt";
import { SignupBody } from "../schemas/signup.schema";
import { createUser, findUserByEmail } from "../repositories/user.repository";
import { setTokenCookie } from "./cookie.service";
import { User } from "@prisma/client";

export const signupUser = async (
  fastify: FastifyInstance,
  reply: FastifyReply,
  { username, email, password }: SignupBody
): Promise<Pick<User, "username" | "email">> => {
  const prisma = fastify.prisma;

  const existing = await findUserByEmail(prisma, email);
  if (existing) {
    throw fastify.httpErrors.conflict("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser(prisma, {
    username,
    email,
    password: hashedPassword,
  });

  const token = fastify.generateToken({ userId: user.id });

  setTokenCookie(fastify, reply, token);

  return {
    username: user.username,
    email: user.email,
  };
};
