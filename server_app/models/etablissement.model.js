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
            unique:{
                msg:"le nom d'établissment déjà existe"
            } 
        },
        logo: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Etablissement;
};