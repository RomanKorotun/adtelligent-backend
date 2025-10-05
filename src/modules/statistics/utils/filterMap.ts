export const filterMap: Record<string, () => string> = {
  Auctions: () =>
    "countDistinctIf(JSONExtractString(message, 'auctionId'), eventType = 'auctionInit') AS auctions",

  Bidders: () =>
    "countDistinctIf(JSONExtractString(message, 'bidderCode'), eventType = 'bidRequested') AS bidders",

  "Avg CPM": () =>
    "avgIf(JSONExtractFloat(message, 'cpm'), eventType = 'bidWon') AS avgCpm",

  "Max CPM": () =>
    "maxIf(JSONExtractFloat(message, 'cpm'), eventType = 'bidWon') AS maxCpm",

  Revenue: () =>
    "sumIf(JSONExtractFloat(message, 'cpm') / 1000, eventType = 'bidWon') AS revenue",

  "Revenue per slot": () => `
  round(
    sumIf(JSONExtractFloat(message, 'cpm') / 1000, eventType = 'bidWon')
    / nullIf(countDistinctIf(JSONExtractString(message, 'adUnitCode'), eventType = 'bidWon'), 0),
    8
  ) AS revenuePerSlot`,

  "Max CPM Winner": () =>
    "argMax(JSONExtractString(message, 'bidder'), JSONExtractFloat(message, 'cpm')) FILTER (WHERE eventType = 'bidWon') AS maxCpmWinner",

  "Top Winner by Count": () =>
    `arrayJoin(topK(1)(JSONExtractString(message, 'bidder')) 
    FILTER (WHERE eventType = 'bidWon')) AS topWinnerByCount`,

  "Fill Rate": () =>
    `round(
    countDistinctIf(JSONExtractString(message, 'adUnitCode'), eventType = 'rendered') * 100.0
    / nullIf(countDistinctIf(JSONExtractString(message, 'adUnitCode'), eventType = 'bidRequested'), 0),
    2
  ) AS fillRate`,

  "No Bid": () =>
    `round(
    100 - (
      countDistinctIf(JSONExtractString(message, 'adUnitCode'), eventType = 'rendered') * 100.0
      / nullIf(countDistinctIf(JSONExtractString(message, 'adUnitCode'), eventType = 'bidRequested'), 0)
    ),
    2
  ) AS noBid`,

  ECPM: () =>
    `round(
        sumIf(JSONExtractFloat(message, 'cpm') / 1000, eventType = 'bidWon') 
        / nullIf(countIf(eventType = 'rendered'), 0) 
        * 1000, 2
    ) AS "ECPM"`,

  "Total Bids": () => "countIf(eventType = 'bidResponse') AS totalBids",

  "Total Impressions": () =>
    "countIf(eventType = 'rendered') AS totalImpressions",
};

export const aliasMap: Record<string, string> = {
  Auctions: "auctions",
  Bidders: "bidders",
  "Avg CPM": "avgCpm",
  "Max CPM": "maxCpm",
  Revenue: "revenue",
  "Revenue per slot": "revenuePerSlot",
  "Max CPM Winner": "maxCpmWinner",
  "Top Winner by Count": "topWinnerByCount",
  "Fill Rate": "fillRate",
  "No Bid": "noBid",
  ECPM: "ECPM",
  "Total Bids": "totalBids",
  "Total Impressions": "totalImpressions",
};
