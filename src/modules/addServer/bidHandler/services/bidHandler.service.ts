import { FastifyInstance, FastifyRequest } from "fastify";
import geoip from "geoip-lite";
import { getAllLineItems } from "../repositories/bidHandler.repository";
import { cpmFilter } from "../utils/filters/cpmFilter";
import { sizeFilter } from "../utils/filters/sizeFilter";
import { geoFilter } from "../utils/filters/geoFilter";
import { adTypeFilter } from "../utils/filters/adTypeFilter";

export interface Bid {
  bidId: string;
  korotunId: number;
  adUnitCode: string;
  sizes: number[][];
  cpm: number;
  currency: string;
  adType: string;
}

interface Payload {
  auctionId: string | null;
  referer: string;
  bids: Bid[];
}

const rotationCache = new Map<string, number>();

export const getAd = async (
  fastify: FastifyInstance,
  request: FastifyRequest
) => {
  const lineItems = await getAllLineItems(fastify.prisma);
  const ip = request.ip;
  const geoData = geoip.lookup(ip);

  const country = geoData?.country;

  const payload: Payload =
    typeof request.body === "string"
      ? JSON.parse(request.body)
      : (request.body as Payload);

  const response = payload.bids.map((bid) => {
    let items = lineItems;

    items = cpmFilter(bid, items);
    if (items.length === 0) return null;
    console.log("items cpmFilter", items);

    items = sizeFilter(bid, items);
    if (items.length === 0) return null;
    console.log("items sizeFilter", items);

    items = geoFilter(country, items);
    if (items.length === 0) return null;

    items = adTypeFilter(bid, items);
    if (items.length === 0) return null;
    console.log("items adTypeFilter", items);

    const cacheKey = `${payload.referer}_${bid.korotunId}_${bid.adUnitCode}`;
    const currentIndex = rotationCache.get(cacheKey) || 0;
    const selected = items[currentIndex % items.length];
    rotationCache.set(cacheKey, currentIndex + 1);

    return {
      requestId: bid.bidId,
      cpm: bid.cpm,
      width: selected.width,
      height: selected.height,
      creativeId: selected.id,
      dealId: null,
      currency: bid.currency,
      netRevenue: true,
      ttl: 360,
      ad: `
        <div style="width:${selected.width}px;height:${
        selected.height
      }px;overflow:hidden;">
        <img src="${`${fastify.config.BACKEND_URL}${selected.creativePath}`}"
               width="${selected.width}"
               height="${selected.height}"
               style="display:block;border:0;"
               alt="ad_${selected.id}" />
        </div>
      `,
    };
  });

  return response;
};
