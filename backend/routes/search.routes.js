import express from "express";
const searchRouter = express.Router();

// Semantic search endpoint
searchRouter.post("/", (req, res) => {
  // TODO: Search embeddings in vector DB
  res.send("Search endpoint");
});
