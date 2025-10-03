export interface Bid {
  bidId: string;
  korotunId: number;
  adUnitCode: string;
  sizes: number[][];
  cpm: number;
  currency: string;
  adType: string;
}

export interface Payload {
  auctionId: string | null;
  referer: string;
  bids: Bid[];
}
