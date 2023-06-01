export const demandeModel = (sequelize, Sequelize) => {
    const Demande = sequelize.define("demande", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        approuvements: {
            type: Sequelize.JSON,
        },
        zone: {
            type: Sequelize.JSON,
            allowNull: false
        },
        couleur: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dateExp: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        idDirecteur: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        }, 
        sommaireTache: {
            type: Sequelize.STRING,
            allowNull: false
        }, 
        case_police: {
            type: Sequelize.STRING
        }
    });

    return Demande;
};