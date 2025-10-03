import { LineItem } from "@prisma/client";

export const geoFilter = (
  userCountry: string | undefined,
  items: LineItem[]
) => {
  return items.filter((item) => {
    if (item.geo === "ALL") return true;

    if (userCountry && item.geo === userCountry) return true;

    return false;
  });
};
