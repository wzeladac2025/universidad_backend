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
      rejectUnauthorized: false,
    },
  },
  logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

try {
  db.usuario = require("./usuario.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'usuario' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'usuario':", err.message);
}

try {
  db.estudiante = require("./estudiante.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'estudiante' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'estudiante':", err.message);
}

try {
  db.docente = require("./docente.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'docente' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'docente':", err.message);
}

try {
  db.carrera = require("./carrera.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'carrera' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'carrera':", err.message);
}

try {
  db.materia = require("./materia.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'materia' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'materia':", err.message);
}

try {
  db.curso = require("./curso.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'curso' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'curso':", err.message);
}

module.exports = db;
