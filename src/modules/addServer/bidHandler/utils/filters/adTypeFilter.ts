import { Bid } from "../../services/bidHandler.service";
import { LineItem } from "@prisma/client";

export const adTypeFilter = (bid: Bid, items: LineItem[]): LineItem[] => {
  const type = bid.adType;
  return items.filter(
    (item) => item.adType.toLowerCase() === type.toLowerCase()
  );
};
