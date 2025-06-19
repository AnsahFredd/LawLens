import express from "express";
import { questionController } from "../controllers/question.controller.js";
const questionRouter = express.Router();

// Ask a question about a document
questionRouter.post("/ask", questionController);

export default questionRouter;
