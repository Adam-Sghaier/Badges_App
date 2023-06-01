export const imageModel = (sequelize, Sequelize) => {
    const Image = sequelize.define("image", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        imageEmp: {
            type: Sequelize.JSON,
            allowNull:false
        },
        cin: {
            type: Sequelize.JSON
        },
        passeport: {
            type: Sequelize.JSON
        },
        carteGrise: {
            type: Sequelize.JSON
        }
    });

    return Image;
};