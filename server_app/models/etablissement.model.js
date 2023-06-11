export const etablissementModel = (sequelize, Sequelize) => {
    const Etablissement = sequelize.define("etablissement", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        denominationSociale: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                msg: "Nom d'établissement déjà existant"
            }
        },
        logo: {
            type: Sequelize.JSON,
            allowNull:false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                msg: "Email d'établissement déja existant"
            }
        },
        verified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    return Etablissement;
};