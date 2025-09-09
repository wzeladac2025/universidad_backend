const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.estudiante = require("./estudiante.model.js")(sequelize, Sequelize);
db.boleta = require("./boleta.model.js")(sequelize, Sequelize);
db.factura = require("./factura.model.js")(sequelize, Sequelize);

//Definir relaciones entre modelos
db.estudiante.hasMany(db.boleta, {
  foreignKey: "id_estudiante",
  as: "boletas"
});

db.boleta.belongsTo(db.estudiante, {
  foreignKey: "id_estudiante",
  as: "estudiante"
});

module.exports = db;
