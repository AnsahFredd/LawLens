import { fileURLToPath } from "url";
import path from "path";
import mammoth from "mammoth";
import fs from "fs";
import pdfParse from "pdf-parse";
import DocumentModel from "../models/docuement.model.js";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload a document, extract its text, and save it to MongoDB
export const uploadDocument = async (req, res, next) => {
  const session = await mongoose.startSession();
  let transactionStarted = false;
  let filePath = null;

  try {
    if (!req.file) {
      console.log("[DEBUG] req.file is undefined");
      return res.status(400).json({ message: "No file uploaded" });
    }

    filePath = path.join(__dirname, "../uploads", req.file.filename);

    if (!fs.existsSync(filePath)) {
      return res.status(400).json({ error: "Uploaded file not found" });
    }

    const fileType = path.extname(req.file.originalname).toLowerCase().slice(1);
    let extractedText = "";

    if (fileType === "pdf") {
      const fileBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(fileBuffer); // ✅ New pdf parsing logic
      extractedText = data.text;
    } else if (fileType === "docx") {
      const data = await mammoth.extractRawText({ path: filePath });
      extractedText = data.value;
    } else if (fileType === "txt") {
      extractedText = fs.readFileSync(filePath, "utf-8");
    } else {
      return res.status(400).json({ error: "Unsupported file type." });
    }

    const summary =
      req.body.summary?.trim() || extractedText.slice(0, 300) + "...";

    session.startTransaction();
    transactionStarted = true;

    const newDocs = await DocumentModel.create(
      [
        {
          user: req.user.id,
          filename: req.file.originalname,
          fileType,
          fileSize: req.file.size,
          content: extractedText,
          summary,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({ success: true, document: newDocs[0] });
  } catch (error) {
    if (transactionStarted) {
      await session.abortTransaction();
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Deleted uploaded file ${filePath}`);
    }
    session.endSession();

    if (!res.headersSent) {
      return next(error);
    } else {
      console.error("Upload error after response sent:", error);
    }
  }
};

// Get all user documents
export const getUserDocuements = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id)
      return res.status(401).json({ message: "Unauthorized" });

    const documents = await DocumentModel.find({ user: req.user.id }).sort({
      uploadedDate: -1,
    });
    res.status(200).json({ success: true, documents });
  } catch (error) {
    next(error);
  }
};

// Get document by ID
export const getUserDocuementById = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidObjectId) {
      return res.status(400).json({ error: "Invalid document ID format." });
    }

    const document = await DocumentModel.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!document)
      return res.status(404).json({ error: "Document not found." });
    res.status(200).json({ success: true, document });
  } catch (error) {
    if (!res.headersSent) {
      return next(error);
    } else {
      console.log("getUserDocumentId err after headers sent", error);
    }
  }
};
