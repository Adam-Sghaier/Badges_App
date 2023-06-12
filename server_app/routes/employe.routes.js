import express from "express";
import {create,findAll,findOne,update,_delete, verifyLink} from "../controllers/employe.controller.js";
export const employeRouter = express.Router();

// Create a new e Employe 
employeRouter.post("/", create);

//check verification link
employeRouter.get("/verify/:id/:token",verifyLink);

// Retrieve all e Employe 
employeRouter.get("/", findAll);

// Retrieve a single employe with id
employeRouter.get("/:id", findOne);

// Update employe with id
employeRouter.put("/:id", update);

// Delete employe with id
employeRouter.delete("/:id", _delete);



