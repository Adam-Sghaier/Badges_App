import { db } from "../models/index.js";
import { randomBytes } from "crypto";
import { sendVerification } from "../utils/email.js";
import { createEmployeValidator, updateEmployeValidator } from "../utils/validator.js";
import bcrypt from "bcryptjs";
const Op = db.Sequelize.Op;
// Create and Save a Employe
export const create = (req, res) => {
    // Validate request
    let body = req.body;

    if (req.body.isAdmin) {
        const { isAdmin, ...otherInfos } = req.body;
        body = otherInfos;
    }

    const { error } = createEmployeValidator(body);
    if (error)
        return res.status(400).send({ message: error.details[0].message });


    // Save Employe in the database
    db.employe.create(req.body)
        .then(async (data) => {
            const newToken = await db.token.create({
                employeId: data.id,
                token: randomBytes(32).toString("hex"),
            });
            let url;
            if (req.body.isAdmin) {
                url = `${process.env.BASE_URL_C}etablissment/addadmin/verify/${data.id}/${newToken.token}`;
                await sendVerification(
                    data.email,
                    "Email de confirmation",
                    `<div><h1>Email de confirmation de compte</h1>
                    <h2>Bonjour</h2>
                    <p>Pour vérifier votre compte Mr/Mdme ${req.body.nom} , cliquez le lien si dessus </p>
                    <a href=${url}>Click Here</a>
                    </div>`
                );
            }
            else {
                url = `${process.env.BASE_URL_C}employe/verify/${data.id}/${newToken.token}`;
                await sendVerification(
                    data.email,
                    "Email de confirmation",
                    `<div><h1>Email de confirmation de compte</h1>
                    <h2>Bonjour</h2>
                    <p>Pour vérifier votre compte Mr/Mdme ${req.body.nom} , cliquez le lien si dessus </p>
                    <a href=${url}>Click Here</a>
                    <b>Lors du création de votre demande du badge ,veuillez choisir cette zone : Toute Zone </b>
                    </div>`
                );
            }

            return res.status(200).json({ id: data.id, message: "une message de validation à été envoyé , veuillez vérifier votre boîte mail" });
        })
        .catch(err => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Employe."
            });
        });
}

export const verifyLink = async (req, res) => {
    try {
        const employe = await db.employe.findByPk(req.params.id);
        if (!employe)
            return res.status(400).json({ message: "employe invalide, veuillez contacter votre administrtation SVP" });

        const token = await db.token.findOne({ where: { token: req.params.tokenId, employeId: employe.id } });
        if (!token)
            return res.status(400).json({ message: "token invalide, veuillez contacter votre administrtation SVP" });

        await db.employe.update({ verified: true }, { where: { id: employe.id } });
        await db.token.destroy({ where: { token: req.params.tokenId } }).then(() => {
            res.send("lien verifié");
        });
    } catch (error) {
        return res.status(500).send({
            message:
                error.message || "Some error occurred while verifiying the link"
        });
    }
}


// Retrieve all Establishments from the database.
export const findAll = (req, res) => {

    db.employe.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Employes."
            });
        });

}

// Find a single Establishment with an id
export const findOne = (req, res) => {
    const id = req.params.id;

    db.employe.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Employe with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Employe with id=" + id
            });
        });
}

// Update a Employe by the id in the request
export const update = (req, res) => {
    const id = req.params.id;
    // const { error } = updateEmployeValidator(req.body);
    // if (error)
    //     return res.status(400).send({ message: error.details[0].message });

    const body = Object.entries(req.body);
    const properties = ["nom", "prenom", "email", "fonction", "voiture", "password",
        "naissance", "famille", "adresse", "identification", "isAdmin"];
    let employe = [];
    body.map(([k, v]) => {
        if (properties.includes(k.split("_")[0]) && k.includes("_")) {
            if (employe.length > 0) {
                for (let j = 0; j < employe.length; j++) {

                    if (employe[j][0] === k.split("_")[0]) {
                        const length = employe[j][1].length;
                        console.log(length);
                        employe[j][1][length] = [k.split("_")[1], v];
                        break;
                    }
                    else if (employe[j][0] !== k.split("_")[0]) {
                        let pFound = false;
                        for (let h = j + 1; h < employe.length; h++) {
                            if (employe[h][0] === k.split("_")[0])
                                pFound = true;
                            else pFound = false
                        }

                        if (pFound) {
                            continue;
                        } else {
                            employe.push([k.split("_")[0], [[k.split("_")[1], v]]]);
                            break;
                        }

                    }
                }
            } else {
                employe.push([k.split("_")[0], [[k.split("_")[1], v]]]);
            }

        }
        else if (properties.includes(k)) {
            if (k === "password") {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(v, salt);
                employe.push([k, hash]);
            }
            else {
                employe.push([k, v])
            }

        }

    })

    // res.send(Object.fromEntries(employe));

    db.employe.update(Object.fromEntries(employe), {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Employe was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Employe with id=${id}. Maybe Etablissement was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Employe with id=" + id
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
                    message: "Employe was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Employe with id=${id}. Maybe Employe was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Employe with id=" + id
            });
        });
};

