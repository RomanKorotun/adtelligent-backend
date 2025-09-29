import { LineItem } from "@prisma/client";
import { Bid } from "../../services/bidHandler.service";

export const sizeFilter = (bid: Bid, items: LineItem[]) => {
  return items.filter((item) =>
    bid.sizes.some(([w, h]) => item.width === w && item.height === h)
  );
};
