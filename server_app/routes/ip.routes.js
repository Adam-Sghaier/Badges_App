import { create, findOne, _delete, update } from "../controllers/ip.controller.js";
import express from "express";
export const ipRouter = express.Router();

// Create a new demande
ipRouter.post("/", create);

// Retrieve a single demande with id
ipRouter.get("/", findOne);

ipRouter.put("/:ipId", update);

// Delete a demande with id
ipRouter.delete("/", _delete);

