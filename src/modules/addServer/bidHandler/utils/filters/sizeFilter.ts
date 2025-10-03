import { LineItem } from "@prisma/client";
import { Bid } from "../../types/bidHandler.types";

export const sizeFilter = (bid: Bid, items: LineItem[]) => {
  return items.filter((item) =>
    bid.sizes.some(([w, h]) => item.width === w && item.height === h)
  );
};
