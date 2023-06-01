export const rapportModel = (sequelize, Sequelize) => {
    const Rapport = sequelize.define("rapport", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        descision: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Rapport;
};