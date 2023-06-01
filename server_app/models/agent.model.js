export const agentModel = (sequelize, Sequelize) => {
    const Agent = sequelize.define("agent", {
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
        direction: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fonction: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },verified:{
            type: Sequelize.BOOLEAN,
            defaultValue:false
        }
    });

    return Agent;
};