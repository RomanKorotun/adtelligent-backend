import { FastifyReply } from "fastify";
import { clearTokenCookie } from "./cookie.service";

export const signoutUser = async (
  reply: FastifyReply
): Promise<{ message: string }> => {
  clearTokenCookie(reply);
  return { message: "Logout successful" };
};
