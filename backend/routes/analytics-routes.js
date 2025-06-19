// routes/analytics.routes.ts
import express from "express";
const analyticsRouter = express.Router();

// Get analytics data
analyticsRouter.get("/", (req, res) => {
  // TODO: Return analytics/statistics
  res.send("Get analytics data");
});
