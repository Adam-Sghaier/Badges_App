export const ipModel = (sequelize, Sequelize) => {
    const Ip = sequelize.define("ip", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        ip_address: {
            type: Sequelize.INTEGER(4).UNSIGNED,
            allowNull: false,
            unique: {
                msg: "address ip must be unique"
            }
        },
        
    });

    return Ip;
};