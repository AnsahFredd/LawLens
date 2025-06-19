import mongoose from "mongoose";

import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Please define database URI in the environment vairables inside .env<development/production>.local"
  );
}

const connectToDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected`);
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1);
  }
};

export default connectToDB;
