import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJECT_KEY, NODE_ENV } from "./env.js";

const aj = arcjet({
  key: ARCJECT_KEY,
  characteristics: ["ip.src"],
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),

    // Create a bot detection rule
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Allow search engines to access the site
        "CATEGORY:MONITOR",
        "CATEGORY:PREVIEW",
      ],
    }),

    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // No token per interval
      interval: 10, // Refill bucket after 10 seconds
      capacity: 10,
    }),
  ],
});

export default aj;
