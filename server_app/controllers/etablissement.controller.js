import { randomBytes } from "crypto";
import { db } from "../models/index.js";
import { createEtablissementValidator } from "../utils/validator.js";
import { sendVerification } from "../utils/email.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { deleteFile } from "../utils/multerFileHandler.js";
const Op = db.Sequelize.Op;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Create and Save a new Tutorial
export const create = (req, res) => {
    console.log(req.ip);
    if (req.file == undefined) {
        return res.status(400).json({ message: `You must select a file.` });
    }
    // form validation
    const { error } = createEtablissementValidator(req.body);
    if (error)
        return res.status(400).send({ message: error.details[0].message });

    const etablissement = {
        ...req.body,
        logo: {
            type: req.file.mimetype,
            name: req.file.originalname,
            data: readFileSync(
                __dirname + "/../resources/static/assets/uploads/" + req.file.filename
            ),
        }
    }
    // Save establishment in the database
    db.etablissement.create(etablissement)
        .then(
            async (data) => {
                const newToken = await db.token.create({
                    etablissementId: data.id,
                    token: randomBytes(32).toString("hex"),
                });
                const url = `${process.env.BASE_URL_C}etablissement/verify/${data.id}/${newToken.token}`;
                await sendVerification(
                    data.email,
                    "Email de Validation",
                    `<div><h1>Email de Validation d'établissement</h1>
                <h2>Bonjour</h2>
                <p>Pour Valider votre établissement ${data.denominationSociale} , cliquez le lien si dessus </p>
                <a href=${url}>Click Here</a>
                </div>`
                );
                deleteFile(__dirname + "/../resources/static/assets/uploads/" + req.file.filename);
                return res.status(200).send({ data, message: "un message de validation d'établissment à été envoyé,Veullez consulter votre boite mail" });
            })
        .catch(err => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Establishment."
            });
        });
}

export const verifyLink = async (req, res) => {
    try {
        const etablissement = await db.etablissement.findByPk(req.params.id);
        if (!etablissement)
            return res.status(400).json({ message: "etablissement non trouvé, veuillez reprendre de nouveau l'ajout de votre etablissement" });

        const token = await db.token.findOne({ where: { token: req.params.token, etablissementId: etablissement.id } });
        if (!token)
            return res.status(400).json({ message: "token invalide, veuillez reprendre de nouveau l'ajout de votre etablissement" });

        await db.etablissement.update({ verified: true }, { where: { id: etablissement.id } });
        await db.token.destroy({ where: { token: req.params.token } }).then(() => {
            return res.status(200).json({ message: "Etablissement verifié , veuillez ajouter un admin svp " });
        });
    } catch (error) {
        return res.status(500).send({
            message:
                error.message || "Un erreur apparu lors du validation d'établissement "
        });
    }
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
export const updateImg = (req, res) => {
    const id = req.params.id;

    if (req.file === undefined) {
        return res.status(400).json({ message: `You must select an image.` });
    }
    let image;
    if (req.file) {
        image = {
            logo: {
                type: req.file.mimetype,
                name: req.file.originalname,
                data: readFileSync(
                    __dirname + "/../resources/static/assets/uploads/" + req.file.filename
                )
            }
        }
    }

    db.etablissement.update(image, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Etablissement image was updated successfully."
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

