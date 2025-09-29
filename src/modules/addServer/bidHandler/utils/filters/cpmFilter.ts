import { Bid } from "../../services/bidHandler.service";
import { LineItem } from "@prisma/client";

export const cpmFilter = (bid: Bid, items: LineItem[]) => {
  return items.filter(
    (item) => bid.cpm >= item.minCPM && bid.cpm <= item.maxCPM
  );
};
