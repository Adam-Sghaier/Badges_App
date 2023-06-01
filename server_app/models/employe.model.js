export const employeModel = (sequelize, Sequelize) => {
    const Employe = sequelize.define("employe", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        nom: { 
            type: Sequelize.STRING,
            allowNull: false
        },
        prenom: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                msg: " that email exists !"
            }
        },
        password: {
            type: Sequelize.STRING,

        },
        fonction: {
            type: Sequelize.STRING,
            allowNull: false
        },
        voiture: {
            type: Sequelize.JSON,
        },
        naissance: {
            type: Sequelize.JSON
        },
        famille: {
            type: Sequelize.JSON,
        },
        adresse: {
            type: Sequelize.STRING,
        },
        identification: {
            type: Sequelize.JSON,
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        verified :{
            type: Sequelize.BOOLEAN,
            defaultValue :false
        }
    });

    return Employe;
}; 