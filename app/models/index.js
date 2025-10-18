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
try {
  db.tipo_notificacion = require("./tipo_notificacion.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'tipo_notificacion' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'tipo_notificacion':", err.message);
}

try {
  db.notificacion = require("./notificacion_pago.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'notificacion_pago' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'notificacion_pago':", err.message);
}

module.exports = db;