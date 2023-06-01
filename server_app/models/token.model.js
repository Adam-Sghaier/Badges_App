export const tokenModel = (sequelize, Sequelize) => {
    const Token = sequelize.define("token", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        token: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Token;
}