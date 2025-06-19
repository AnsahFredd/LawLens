import express from "express";
const summaryRouter = express.Router();

// Generate a summary
summaryRouter.post("/", (req, res) => {
  // TODO: Call summarization service
  res.send("Generate summary endpoint");
});
