// export const korotunAuctionResponseSchema = {
//   tags: ["bids"],
//   summary: "Get ads from auction",
//   description:
//     "Receives bids from Prebid-adapter and returns the selected ads with creative HTML",
//   response: {
//     200: {
//       description: "Selected ads from auction",
//       type: "array",
//       items: {
//         type: "object",
//         required: [
//           "requestId",
//           "cpm",
//           "width",
//           "height",
//           "creativeId",
//           "dealId",
//           "currency",
//           "netRevenue",
//           "ttl",
//           "ad",
//         ],
//         properties: {
//           requestId: { type: "string", example: "bid123" },
//           cpm: { type: "number", example: 1.23 },
//           width: { type: "number", example: 300 },
//           height: { type: "number", example: 250 },
//           creativeId: {
//             type: "string",
//             example: "68daef23e942f9ea7ab857cb",
//           },
//           dealId: { type: ["number", "null"], example: null },
//           currency: { type: "string", example: "USD" },
//           netRevenue: { type: "boolean", example: true },
//           ttl: { type: "number", example: 360 },
//           ad: { type: "string", example: "<div>Ad HTML here</div>" },
//         },
//       },
//     },
//   },
// };

import { FromSchema } from "json-schema-to-ts";

export const korotunAuctionResponseSchema = {
  tags: ["bids"],
  summary: "Get ads from auction",
  description:
    "Receives bids from Prebid adapter and returns the selected ads with creative HTML",

  body: {
    type: "object",
    required: ["auctionId", "referer", "bids"],
    properties: {
      auctionId: { type: ["string", "null"], example: null },
      referer: { type: "string", example: "https://news.example.com" },
      bids: {
        type: "array",
        items: {
          type: "object",
          required: [
            "bidId",
            "korotunId",
            "adUnitCode",
            "sizes",
            "cpm",
            "currency",
            "adType",
          ],
          properties: {
            bidId: {
              type: "string",
              example: "2a9c2d28-4c6f-46b3-b832-bbc32a78cfac",
            },
            korotunId: { type: "number", example: 123456 },
            adUnitCode: { type: "string", example: "ad-frame-newslist" },
            sizes: {
              type: "array",
              items: {
                type: "array",
                items: { type: "number" },
                example: [300, 250],
              },
              example: [[300, 250]],
            },
            cpm: { type: "number", example: 10 },
            currency: { type: "string", example: "USD" },
            adType: { type: "string", example: "banner" },
          },
        },
      },
    },
    additionalProperties: false,
    example: {
      auctionId: null,
      referer: "https://news.example.com",
      bids: [
        {
          bidId: "2a9c2d28-4c6f-46b3-b832-bbc32a78cfac",
          korotunId: 123456,
          adUnitCode: "ad-frame-newslist",
          sizes: [[300, 250]],
          cpm: 10,
          currency: "USD",
          adType: "banner",
        },
      ],
    },
  },

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
          requestId: {
            type: "string",
            example: "2a9c2d28-4c6f-46b3-b832-bbc32a78cfac",
          },
          cpm: { type: "number", example: 10 },
          width: { type: "number", example: 300 },
          height: { type: "number", example: 250 },
          creativeId: { type: "string", example: "68daef23e942f9ea7ab857cb" },
          dealId: { type: ["number", "null"], example: null },
          currency: { type: "string", example: "USD" },
          netRevenue: { type: "boolean", example: true },
          ttl: { type: "number", example: 360 },
          ad: {
            type: "string",
            example:
              '<div style="width:300px;height:250px;"><img src="https://cdn.example.com/ad.jpg" /></div>',
          },
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              statusCode: { type: "number", example: 401 },
              error: { type: "string", example: "Unauthorized" },
              message: { type: "string", example: "Invalid or missing token" },
            },
            required: ["statusCode", "error", "message"],
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              statusCode: { type: "number", example: 500 },
              error: { type: "string", example: "Internal Server Error" },
              message: {
                type: "string",
                example: "Failed to query ClickHouse or process data",
              },
            },
            required: ["statusCode", "error", "message"],
          },
        },
      },
    },
  },
} as const;

export type KorotunAuctionBody = FromSchema<
  typeof korotunAuctionResponseSchema.body
>;
