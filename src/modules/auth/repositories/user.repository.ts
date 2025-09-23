import { PrismaClient, User } from "@prisma/client";
import { SignupBody } from "../schemas/signup.schema";

export const createUser = async (
  prisma: PrismaClient,
  data: SignupBody
): Promise<User> => {
  return prisma.user.create({ data });
};

export const findUserByEmail = async (
  prisma: PrismaClient,
  email: string
): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email } });
};

export const findUserById = async (
  prisma: PrismaClient,
  id: string
): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } });
};
