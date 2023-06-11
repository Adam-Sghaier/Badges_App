import { create, findAll, findOne, _delete, verifyLink } from "../controllers/etablissement.controller.js";
import express from "express";
import { fileCheck } from "../utils/multerFileHandler.js";
export const etablissementRouter = express.Router();

// Create a new Establishment
etablissementRouter.post("/", fileCheck.single("logo"), create);

// Verfy an Establishment
etablissementRouter.get("/verify/:id/:token", verifyLink);

// Retrieve all Establishment
etablissementRouter.get("/", findAll);

// Retrieve a single Establishment with id
etablissementRouter.get("/:id", findOne);

// Delete a Establishment with id
etablissementRouter.delete("/:id", _delete);


