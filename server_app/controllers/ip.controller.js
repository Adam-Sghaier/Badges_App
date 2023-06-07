import { db } from "../models/index.js";
import { aton, ntoa } from "inet_ipv4";
const Op = db.Sequelize.Op;
// Create and Save a new Tutorial
export const create = async (req, res) => {

    // Save establishment in the database
    console.log(aton(req.body.ip));
    db.ip.create({ ip_address: aton(req.body.ip) })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the ip_address."
            });
        });

}


// Find a single Establishment with an id
export const findOne = async (req, res) => {

    const ip = req.body.ip;
    db.ip.findOne({ where: { ip_address: aton(req.body.ip) } })
        .then((data) => {
            if (data) {
                const { id, ip_address } = data;
                res.send({ ip: ntoa(ip_address) });
            } else {
                res.status(404).send({
                    message: `Cannot find ip`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving ip"
            });
        });
}

// Update a Tutorial by the id in the request
export const update = (req, res) => {
    const ipId = req.params.ipId;

    db.ip.update({ ip_address: aton(req.body.ip) }, {
        where: { id: req.params.ipId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "ip_address was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update ip_address with id=${ipId}. Maybe ip_address was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating ip_address with id=" + ipId
            });
        });
}

// Delete a Tutorial with the specified id in the request
// export const _delete = (req, res) => {
//     const id = req.params.id;

//     db.ip.destroy({
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "Etablishment was deleted successfully!"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete Etablishment with id=${id}. Maybe Etablishment was not found!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Could not delete Etablishment with id=" + id
//             });
//         });
// };



