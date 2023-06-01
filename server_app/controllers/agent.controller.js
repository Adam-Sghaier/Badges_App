import { db } from "../models/index.js";
import { UpdateAgentValidator, createAgentValidator } from "../utils/validator.js";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

const Op = db.Sequelize.Op;
// Create and Save a new agent
export const create = (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const { password, ...otherInfos } = req.body;
    // Validate request
    const { error } = createAgentValidator(req.body);
    if (error)
        return res.status(400).send({ message: error.details[0].message });
    // Save establishment in the database
    db.agent.create({ password: hash, ...otherInfos })
        .then(async (data) => {
            const newToken = await db.token.create({
                agentId: data.id,
                token: randomBytes(32).toString("hex"),
            });
            const url = `${process.env.BASE_URL_C}agent/verify/${data.id}/${newToken.token}`;
            await sendVerification(
                data.email,
                "Email de confirmation",
                `<div><h1>Email de confirmation de compte</h1>
                <h2>Bonjour</h2>
                <p>Pour vérifier votre compte Mr/Mdme ${req.body.nom} , cliquez le lien si dessus </p>
                <a href=${url}>Click Here</a>
                </div>`
            );
            res.send(url);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the agent."
            });
        });
}

// Retrieve all agents from the database.
export const findAll = (req, res) => {

    db.agent.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving agents."
            });
        });

}

// Find a single agent with an id
export const findOne = (req, res) => {
    const id = req.params.id;

    db.agent.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find agent with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving agent with id=" + id
            });
        });
}

// Update a agent by the id in the request
export const update = (req, res) => {
    const id = req.params.id;

    // Validate request
    const { error } = UpdateAgentValidator(req.body);
    if (error)
        return res.status(400).send({ message: error.details[0].message });
    
    let body = req.body;
    if (req.body.password) {
        const { password, ...otherInfos } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        body = { ...otherInfos, password: hash };
    }
    
    db.agent.update(body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "agent was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update agent with id=${id}. Maybe agent was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating agent with id=" + id
            });
        });
}

// Delete a agent with the specified id in the request
export const _delete = (req, res) => {
    const id = req.params.id;

    db.agent.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "agent was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete agent with id=${id}. Maybe agent was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete agent with id=" + id
            });
        });
};

