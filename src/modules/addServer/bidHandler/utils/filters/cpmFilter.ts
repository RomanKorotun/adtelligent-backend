import { LineItem } from "@prisma/client";
import { Bid } from "../../services/bidHandler.service";

export const cpmFilter = (bid: Bid, items: LineItem[]) => {
  return items.filter(
    (item) => bid.cpm >= item.minCPM && bid.cpm <= item.maxCPM
  );
};
