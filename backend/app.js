import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import connectToDB from "./database/db.js";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";
import documentRouter from "./routes/docuements.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

// Process form data sent via HTML forms in a simple formate
app.use(express.urlencoded({ extends: false }));

// Reads cookies from incoming requests so that app can store user data
app.use(cookieParser());

app.use(arcjetMiddleware);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/questions", q);
app.use("/api/v1/documents", documentRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to lawlens backend");
});

app.listen(PORT, async () => {
  console.log(`Server is running at port on http://localhost:${PORT} port`);

  await connectToDB();
});
