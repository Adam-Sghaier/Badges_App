import { readFileSync, writeFileSync } from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from "../models/index.js";
import { deleteFile } from '../utils/multerFileHandler.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const create = async (req, res) => {
    try {

        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }


        db.image.create({
            image_emp: {
                type: req.file.mimetype,
                name: req.file.originalname,
                data: readFileSync(
                    __dirname + "/../resources/static/assets/uploads/" + req.file.filename
                ),
            }
        }).then((image) => {
            deleteFile(__dirname + "/../resources/static/assets/uploads/" + req.file.filename);
            return res.send(`File has been uploaded.`);
        });
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
    }
};



// Find a single image with an id
export const findOne = (req, res) => {
    const id = req.params.id;

    db.image.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find image with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving image with id=" + id
            });
        });
}

// Update a image by the id in the request
export const update = (req, res) => {
    const id = req.params.id;
    let image = {
        type: req.file.mimetype,
        name: req.file.originalname,
        data: readFileSync(
            __dirname + "/../resources/static/assets/uploads/" + req.file.filename
        ) 
    };
    switch (req.params.type) {
        case "image_emp":
            image = {
                imageEmp: {
                    ...image
                }
            }
            break;
        case "cin":
            image = {
                cin: {
                    ...image
                }
            }
            break;
        case "passeport":
            image = {
                cin: {
                    ...image
                }
            }
        case "permis":
            image = {
                permis: {
                    ...image
                }
            }
            break;
        case "carteGrise":
            image = {
                cin: {
                    ...image
                }
            }
        default:
            res.send("no photo type received");
    }
    // res.send(image);
    //upload image condition 
    db.image.update(image, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                deleteFile(__dirname + "/../resources/static/assets/uploads/" + req.file.filename);

                res.send({
                    message: "image was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update image with id=${id}. Maybe image was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating image with id=" + id
            });
        });
}

// Delete a image with the specified id in the request
export const _delete = (req, res) => {
    const id = req.params.id;

    db.image.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "image was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete image with id=${id}. Maybe image was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete image with id=" + id
            });
        });
};

