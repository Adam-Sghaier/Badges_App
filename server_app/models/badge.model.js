export const badgeModel = (sequelize, Sequelize) => {
    const Badge = sequelize.define("badge", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        }
    });

    return Badge;
};