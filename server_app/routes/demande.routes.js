import { create, findAll, findOne, _delete, update } from "../controllers/demande.controller.js";
import express from "express";
export const demandeRouter = express.Router();

// Create a new demande
demandeRouter.post("/:employeId", create);

// Retrieve all demande
demandeRouter.get("/", findAll);

// Retrieve a single demande with id
demandeRouter.get("/:id", findOne);

// Update a demande with id
demandeRouter.put("/:id", update);

// Delete a demande with id
demandeRouter.delete("/:id", _delete);

