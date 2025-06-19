import { Router } from "express";
import { login, signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", signUp);

authRouter.post("/login", login);

authRouter.post("/logout", (req, res) => res.send({ title: "Logout user" }));

export default authRouter;
