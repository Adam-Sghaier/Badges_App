import { dbConfig } from "../config/db.config.js";
import Sequelize from "sequelize";
import { employeModel } from "./employe.model.js";
import { agentModel } from "./agent.model.js";
import { demandeModel } from "./demande.model.js";
import { etablissementModel } from "./etablissement.model.js";
import { imageModel } from "./image.model.js";
import { rapportModel } from "./rapport.model.js";
import { badgeModel } from "./badge.model.js";
import { tokenModel } from "./token.model.js";
import { ipModel } from "./ip.model.js";


const Op = Sequelize.Op;
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: Op,

  pool: { 
    max: dbConfig.pool.max, 
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

export const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.etablissement = etablissementModel(sequelize, Sequelize);
db.employe = employeModel(sequelize, Sequelize);
db.demande = demandeModel(sequelize, Sequelize);
db.agent = agentModel(sequelize, Sequelize);
db.rapport = rapportModel(sequelize, Sequelize);
db.badge = badgeModel(sequelize, Sequelize);
db.token = tokenModel(sequelize, Sequelize);
db.image = imageModel(sequelize, Sequelize);
db.ip = ipModel(sequelize, Sequelize);

db.etablissement.hasMany(db.employe, { as: "employes" });
db.employe.belongsTo(db.etablissement, {
  foreignKey: "etablissementId",
  as: "etablissement"
});

db.employe.hasMany(db.demande, {
  as: "demandes"
});
db.demande.belongsTo(db.employe, {
  foreignKey: "employeId",
  as: "employe"
});

db.agent.belongsToMany(db.demande, { through: 'AgentDemandes', foreignKey: "agent_id", as: "demandes" });
db.demande.belongsToMany(db.agent, { through: 'AgentDemandes', foreignKey: "demande_id", as: "agents" });

db.agent.belongsToMany(db.rapport, { through: 'AgentRapports', foreignKey: "agent_id", as: "rapports" });
db.rapport.belongsToMany(db.agent, { through: 'AgentRapports', foreignKey: "rapport_id", as: "agents" });

db.agent.hasMany(db.badge, { as: "badges" });
db.badge.belongsTo(db.agent, {
  foreignKey: "agentId",
  as: "agent"
});

db.employe.hasMany(db.badge, { as: "badges" });
db.badge.belongsTo(db.employe, {
  foreignKey: "employeId",
  as: "employe"
});

db.badge.belongsTo(db.demande, { foreignKey: "demandeId" });
db.token.belongsTo(db.employe, { foreignKey: "employeId" });
db.token.belongsTo(db.etablissement, { foreignKey: "etablissementId" });

db.token.belongsTo(db.agent, { foreignKey: "agentId" });
db.image.belongsTo(db.employe,{ foreignKey: "employeId"});
db.ip.belongsTo(db.employe, { foreignKey: "employeId" });
db.ip.belongsTo(db.agent, { foreignKey: "agentId" });

