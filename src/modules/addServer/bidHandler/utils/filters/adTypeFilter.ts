import { LineItem } from "@prisma/client";
import { Bid } from "../../types/bidHandler.types";

export const adTypeFilter = (bid: Bid, items: LineItem[]): LineItem[] => {
  const type = bid.adType;
  return items.filter(
    (item) => item.adType.toLowerCase() === type.toLowerCase()
  );
};
