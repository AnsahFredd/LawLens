import mongoose from "mongoose";

const docuementScghema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId, // Reference to user who uploaded
      ref: "User",
      required: true,
    },
    filename: {
      type: String,
      required: [true, "File name is required"],
    },
    content: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      enum: ["pdf", "docx", "txt"],
      required: true,
    },
    fileSize: {
      type: Number,
    },
    summary: {
      type: String,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    embeddings: {
      type: [Number], // array of numbers (for semantic search later)
      default: [],
    },
  },
  { timestamps: true }
);

const DocumentModel = mongoose.model("Document", docuementScghema);

export default DocumentModel;
