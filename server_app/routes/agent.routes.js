import { create, findAll, findOne, _delete, update } from "../controllers/agent.controller.js";
import express from "express";
export const agentRouter = express.Router();

// Create a new Establishment
agentRouter.post("/", create);
// Retrieve all Establishment
agentRouter.get("/", findAll);

// Retrieve a single Establishment with id
agentRouter.get("/:id", findOne);

// Update a Establishment with id
agentRouter.put("/:id", update);

// Delete a Establishment with id
agentRouter.delete("/:id", _delete);


