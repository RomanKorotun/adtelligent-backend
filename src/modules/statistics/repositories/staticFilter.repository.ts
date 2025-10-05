import { PrismaClient, StaticFilter } from "@prisma/client";

export const getStaticFilterByName = async (
  prisma: PrismaClient,
  name: string
): Promise<Pick<StaticFilter, "id" | "name" | "filters"> | null> => {
  return prisma.staticFilter.findFirst({
    where: { name },
  });
};
