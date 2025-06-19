import axios from "axios";
import { HUGGINGFACE_API_KEY } from "../config/env.js";
const HF_API_KEY = HUGGINGFACE_API_KEY;

export const askQuestion = async (question, context) => {
  const response = await axios.post(
    "https://api-inference.huggingface.com/models/deepset/roberta-base-squad2",
    {
      inputs: {
        question,
        context,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
      },
    }
  );

  return response.data.answer;
};
