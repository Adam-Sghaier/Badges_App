import { db } from "../models/index.js";
const Op = db.Sequelize.Op;
// Create and Save a new Tutorial
export const create = async (req, res) => {

    // Save establishment in the database
    try {
        const [results, metadata] = await db.sequelize.query(`INSERT INTO ip_addresses (ip_address) VALUES(INET6_ATON('${req.body.ip}'))`, {
            type: db.Sequelize.QueryTypes.INSERT
        });
        
        
        res.status(200).json(results);
    } catch (error) {
        if (error.message === "Validation error")
            res.status(500).send({
                message:
                    "ip address should be unique"
            });
        else
            res.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving establishments."
            });
    }

}


// Find a single Establishment with an id
export const findOne = async (req, res) => {

    try {
        const ip = await db.sequelize.query(`SELECT id, INET6_NTOA(ip_address) as ip FROM ip_addresses WHERE INET6_NTOA(ip_address) = '${req.body.ip}'`, {
            type: db.Sequelize.QueryTypes.SELECT
        })
        res.status(200).json(ip);
    } catch (error) {

        res.status(500).send({
            message:
                error.message || "Some error occurred while retrieving establishments."
        });
    }
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



