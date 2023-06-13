import express from "express";
import { resetPassEmail, setPassword, verifyLink } from "../controllers/resetPassword.controller.js";

export const resetPassRouter = express.Router();

resetPassRouter.post("/send",resetPassEmail);
resetPassRouter.get("/verify/:id/:token",verifyLink);
resetPassRouter.post("/reset/:id/:token",setPassword);

