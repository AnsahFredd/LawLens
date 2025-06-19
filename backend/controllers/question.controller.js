// import axios from "axios";

// import DocumentModel from "../models/docuement.model.js";
// import { HUGGINGFACE_API_KEY } from "../config/env.js";

// const HF_TOKEN = HUGGINGFACE_API_KEY;
// /**
//  * @desc Ask a question based on specific document
//  * @route POST /api/v1/questions/:documentId
//  * @access Private
//  **/

// export const questionController = async (req, res) => {
//   const { question } = req.body;
//   const { documentId } = req.params;

//   try {
//     // Fetch document content from DB
//     const doc = await DocumentModel.findById(documentId);
//     if (!doc) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Dcoument not found." });
//     }

//     // Send question + context (document text) to QA model (eg: Hugging face)
//     const hfResponse = await axios.post(
//       "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
//       {
//         inputs: {
//           question: question,
//           context: doc.content,
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${HF_TOKEN}`,
//         },
//       }
//     );
//   } catch (error) {}
// };

// export default questionController;
