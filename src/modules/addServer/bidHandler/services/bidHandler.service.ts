import { FastifyInstance, FastifyRequest } from "fastify";
import geoip from "geoip-lite";
import { getAllLineItems } from "../repositories/bidHandler.repository";
import { cpmFilter } from "../utils/filters/cpmFilter";
import { sizeFilter } from "../utils/filters/sizeFilter";
import { geoFilter } from "../utils/filters/geoFilter";
import { adTypeFilter } from "../utils/filters/adTypeFilter";
import {
  frequencyFilter,
  updateFrequencyCache,
} from "../utils/filters/frequencyFilter";
import { Payload } from "../types/bidHandler.types";

const rotationCache = new Map<string, number>();
const rotationCountCache = new Map<string, number>();
const userFrequencyCache = new Map<string, { [lineItemId: string]: Date }>();

export const getAd = async (
  fastify: FastifyInstance,
  request: FastifyRequest
) => {
  const ip = request.ip;
  const geoData = geoip.lookup(ip);
  const country = geoData?.country;

  const payload: Payload =
    typeof request.body === "string"
      ? JSON.parse(request.body)
      : (request.body as Payload);

  const userAgent = request.headers["user-agent"] || "unknown";
  const userIdentifier =
    request.headers["x-user-id"]?.toString() || `${ip}_${userAgent}`;

  const lineItems = await getAllLineItems(fastify.prisma);

  const response = payload.bids.map((bid) => {
    let items = lineItems;

    items = cpmFilter(bid, items);
    if (!items.length) return null;

    items = sizeFilter(bid, items);
    if (!items.length) return null;

    items = geoFilter(country, items);
    if (!items.length) return null;

    items = adTypeFilter(bid, items);
    if (!items.length) return null;

    items = frequencyFilter(userIdentifier, items, userFrequencyCache);
    if (!items.length) return null;

    const cacheKey = `${payload.referer}_${bid.korotunId}_${bid.adUnitCode}`;
    let currentIndex = rotationCache.get(cacheKey) || 0;
    const previousCount = rotationCountCache.get(cacheKey) || 0;

    if (items.length !== previousCount) {
      currentIndex = 0;
      rotationCountCache.set(cacheKey, items.length);
    }

    const selected = items[currentIndex % items.length];
    rotationCache.set(cacheKey, currentIndex + 1);

    updateFrequencyCache(
      userIdentifier,
      selected.id.toString(),
      userFrequencyCache
    );

    return {
      requestId: bid.bidId,
      cpm: bid.cpm,
      width: selected.width,
      height: selected.height,
      creativeId: selected.id.toString(),
      dealId: null,
      currency: bid.currency,
      netRevenue: true,
      ttl: 360,
      ad: `
        <div style="width:${selected.width}px;height:${selected.height}px;overflow:hidden;">
          <a href="https://github.com/RomanKorotun" target="_blank" rel="noopener noreferrer">
            <img src="${fastify.config.BACKEND_URL}${selected.creativePath}"
                 width="${selected.width}"
                 height="${selected.height}"
                 style="display:block;border:0;"
                 alt="ad_${selected.id}" />
          </a>
        </div>
      `,
    };
  });

  return response;
};
