export interface Bid {
  bidId: string;
  korotunId: number;
  adUnitCode: string;
  sizes: number[][];
  cpm: number;
  currency: string;
  adType: string;
}
