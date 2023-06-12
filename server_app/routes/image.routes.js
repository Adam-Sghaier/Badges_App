import express from "express";
import { create, findOne, update, _delete } from "../controllers/image.controller.js";
import { fileCheck } from "../utils/multerFileHandler.js";

export const imageRouter = express.Router();

// Create a new e Employe 
imageRouter.post("/", fileCheck.single('img'), create);

// Retrieve a single employe with id
imageRouter.get("/:id", findOne);

// Update employe with id
imageRouter.put("/:id/:type", fileCheck.single('img') , update);

// Delete employe with id
imageRouter.delete("/:id", _delete);


