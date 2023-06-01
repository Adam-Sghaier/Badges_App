import { create, findAll, findOne, _delete, update } from "../controllers/etablissement.controller.js";
import express from "express";
export const etablissementRouter = express.Router();

// Create a new Establishment
etablissementRouter.post("/", create);

// Retrieve all Establishment
etablissementRouter.get("/", findAll);

// Retrieve a single Establishment with id
etablissementRouter.get("/:id", findOne);

// Update a Establishment with id
etablissementRouter.put("/:id", update);

// Delete a Establishment with id
etablissementRouter.delete("/:id", _delete);


