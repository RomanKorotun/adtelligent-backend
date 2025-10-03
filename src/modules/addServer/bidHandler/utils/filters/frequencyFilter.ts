import { LineItem } from "@prisma/client";

export const frequencyFilter = (
  userIdentifier: string,
  items: LineItem[],
  userFrequencyCache: Map<string, { [lineItemId: string]: Date }>
): LineItem[] => {
  const now = new Date();
  const userData = userFrequencyCache.get(userIdentifier) || {};

  return items.filter((item) => {
    const lastShown = userData[item.id.toString()];
    if (!lastShown) return true;

    switch (item.frequency?.toLowerCase()) {
      case "always":
        return true;
      case "hourly":
        return now.getTime() - lastShown.getTime() >= 60 * 60 * 1000;
      case "daily":
        return now.getTime() - lastShown.getTime() >= 24 * 60 * 60 * 1000;
      default:
        return true;
    }
  });
};

export const updateFrequencyCache = (
  userIdentifier: string,
  lineItemId: string,
  userFrequencyCache: Map<string, { [lineItemId: string]: Date }>
) => {
  if (!userFrequencyCache.has(userIdentifier)) {
    userFrequencyCache.set(userIdentifier, {});
  }
  userFrequencyCache.get(userIdentifier)![lineItemId] = new Date();
};
