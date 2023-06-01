import express from "express";
import { create, findOne, update, _delete } from "../controllers/image.controller.js";
import { fileCheck } from "../utils/multerFileHandler.js";

export const imageRouter = express.Router();

// Create a new e Employe 
imageRouter.post("/", fileCheck.single('photos'), create);

// Retrieve a single employe with id
imageRouter.get("/:id", findOne);

// Update employe with id
imageRouter.put("/:id/:type", fileCheck.single('photos') , update);

// Delete employe with id
imageRouter.delete("/:id", _delete);




// Var imageURL = 'data:image/png;base64,' + new Buffer(res.data.data.profile_pic, 'binary').toString('base64')