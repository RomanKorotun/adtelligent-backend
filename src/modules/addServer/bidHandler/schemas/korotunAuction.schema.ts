export const korotunAuctionResponseSchema = {
  tags: ["bids"],
  summary: "Get ads from auction",
  description:
    "Receives bids from Prebid-adapter and returns the selected ads with creative HTML",
  response: {
    200: {
      description: "Selected ads from auction",
      type: "array",
      items: {
        type: "object",
        required: [
          "requestId",
          "cpm",
          "width",
          "height",
          "creativeId",
          "dealId",
          "currency",
          "netRevenue",
          "ttl",
          "ad",
        ],
        properties: {
          requestId: { type: "string", example: "bid123" },
          cpm: { type: "number", example: 1.23 },
          width: { type: "number", example: 300 },
          height: { type: "number", example: 250 },
          creativeId: {
            type: "string",
            example: "68daef23e942f9ea7ab857cb",
          },
          dealId: { type: ["number", "null"], example: null },
          currency: { type: "string", example: "USD" },
          netRevenue: { type: "boolean", example: true },
          ttl: { type: "number", example: 360 },
          ad: { type: "string", example: "<div>Ad HTML here</div>" },
        },
      },
    },
  },
};
