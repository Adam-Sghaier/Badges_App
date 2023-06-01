import { db } from "../models/index.js";
const Op = db.Sequelize.Op;
// Create and Save a new Tutorial
export const create = (req, res) => {
    // Validate request
    if (!req.body.denomination_sociale) {
        res.status(400).send({
            message: "Name required !"
        });
        return;
    }
    if (!req.body.logo) {
        res.status(400).send({
            message: "Logo required !"
        });
        return;
    }

    // Create an establishment
    const etablissement = {
        denomination_sociale: req.body.denomination_sociale,
        logo: req.body.logo,
    }

    // Save establishment in the database
    db.etablissement.create(etablissement)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Establishment."
            });
        });
}

// Retrieve all Establishments from the database.
export const findAll = (req, res) => {

    db.etablissement.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving establishments."
            });
        });

}

// Find a single Establishment with an id
export const findOne = (req, res) => {
    const id = req.params.id;

    db.etablissement.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Establishment with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Establishment with id=" + id
            });
        });
}

// Update a Tutorial by the id in the request
export const update = (req, res) => {
    const id = req.params.id;

    db.etablissement.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Etablissement was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Etablissement with id=${id}. Maybe Etablissement was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Etablissement with id=" + id
            });
        });
}

// Delete a Tutorial with the specified id in the request
export const _delete = (req, res) => {
    const id = req.params.id;

    db.etablissement.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Etablishment was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Etablishment with id=${id}. Maybe Etablishment was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Etablishment with id=" + id
            });
        });
};

