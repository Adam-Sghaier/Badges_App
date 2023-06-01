import { db } from "../models/index.js";
import { createDemandeValidator } from "../utils/validator.js";
const Op = db.Sequelize.Op;
// Create and Save a demande
export const create = (req, res) => {

    //check employes required images
    db.image.findOne({ where: { employeId: req.params.employeId } }).then((image) => {

        if (!image.cin) {
            res.status(400).json({ message: "photo du cin(recto et verso) requise !" });
        } else {
            res.status(400).json({ message: "photo du passeport(2pages) requise !" });
        }

        if (req.body.type === "Vehicule" && !image.carteGrise) {
            res.status(400).json({ message: "photo du carte grise(recto et verso) requise !" });
        }
    })

    let dateExp = new Date();
    let idDirecteur;
    // set expiration date && etablishment id
    db.employe.findByPk(req.params.employeId).then((emp) => {
        db.etablissement().findOne({ where: { id: emp.etablissementId } }).then((etab) => {
            if (req.body.type == "Personnel") {
                if (etab.denominationSociale.toLowerCase() === "tunisair" || etab.denominationSociale.toLowerCase() === "oaca") {
                    dateExp.setFullYear(new Date().getFullYear() + 3);
                }
                else {
                    dateExp.setFullYear(new Date().getFullYear() + 2);
                }
            } else {
                dateExp.setFullYear(new Date().getFullYear() + 1);
            }
            // set director id
            db.employe.findOne({ where: { fonction: "directeur", etablissementId: etab.id } }).then((emp) => {
                idDirecteur = emp.id;
            })
        })
    })

    // set couleur depending on zone chosen
    let couleur;
    switch (req.body.zone) {
        case "Toute Zone":
            couleur = "Rouge";
            break;
        case "Sous Douane":
            couleur = "Bleu";
            break;
        case "Parking Avion":
            couleur = "Jaune";
            break;
        default:
            return res.status(400).send({ message: "aucune zone choisie" });

    }
    // Create an demande
    const demande = {
        employeId: req.params.employeId,
        type: req.body.type,
        status: "En cours de validation par directeur",
        zone: { demande: req.body.zoneDemande },
        couleur: req.body.couleur,
        dateExp,
        idDirecteur,
        sommaireTache: req.body.sommaireTache
    }

    // Validate request
    const { error } = createDemandeValidator(req.body);
    if (error)
        return res.status(400).send({ message: error.details[0].message });

    // Save demande in the database

    db.demande.create(demande)
        .then((demande) => {
            res.send(demande);
        })
        .catch(err => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the demande."
            });
        });
}


// Retrieve all demande from the database.
export const findAll = (req, res) => {

    db.demande.findAll({ where: { status: { admin: req.body.admin } } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving demandes."
            });
        });

}

// Find a single demande with an id
export const findOne = (req, res) => {
    const id = req.params.id;

    db.demande.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find demande with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving demande with id=" + id
            });
        });
}

// Update a demande by the id in the request
export const update = (req, res) => {
    const id = req.params.id;
    const agentId = req.query.agentId;
    const demande = db.demande.findOne({ where: { id: id } });
    let couleur;
    if (req.body.zone) {

        switch (req.body.zone.retenue) {
            case "Toute Zone":
                couleur = "Rouge";
                break;
            case "Sous Douane":
                couleur = "Bleu";
                break;
            case "Parking Avion":
                couleur = "Jaune";
                break;
        }
    }

    if (req.body.status) {
        switch (req.body.status) {
            case "En attente de vérification par la Police":
                db.agent.findOne({where:{id:agentId,direction:"Police"}}).addDemande(demande);
            default:
                break;
        }
    }
    
    if (req.body)
        db.demande.update({ ...req.body, couleur }, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "demande was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update demande with id=${id}. Maybe Etablidemande was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating demande with id=" + id
                });
            });
}

// Delete a Tutorial with the specified id in the request
export const _delete = (req, res) => {
    const id = req.params.id;

    db.employe.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "demande was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete demande with id=${id}. Maybe demande was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete demande with id=" + id
            });
        });
};

