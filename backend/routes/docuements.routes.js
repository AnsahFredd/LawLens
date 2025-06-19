import { Router } from "express";
import {
  uploadDocument,
  getUserDocuementById,
  getUserDocuements,
} from "../controllers/document.controller.js";

const documentRouter = Router();

import upload from "../middleware/upload.middleware.js";
import authorize from "../middleware/auth.middleware.js";
documentRouter.post(
  "/upload",
  authorize,
  upload.single("file"),
  uploadDocument
);

// Get all documents
documentRouter.get("/", authorize, getUserDocuements);

documentRouter.get("/:id", authorize, getUserDocuementById);

// documentRouter.delete("/:id", (req, res) => res.send("Delete a document"));

documentRouter.put("/", (req, res) =>
  res.send("Update, extracts raw text using PDF/DOCX parsers")
);

export default documentRouter;
