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

// Modelos base
db.estudiante = require("./estudiante.model.js")(sequelize, Sequelize);
db.docente = require("./docente.model.js")(sequelize, Sequelize);
db.carrera = require("./carrera.model.js")(sequelize, Sequelize);
db.estudianteCarrera = require("./estudianteCarrera.model.js")(sequelize, Sequelize);
// Relación: un estudiante puede estar en muchas carreras
db.estudiante.belongsToMany(db.carrera, {
  through: db.estudianteCarrera,     // Modelo intermedio que representa la relación
  foreignKey: 'estudianteId',        // Clave que conecta al estudiante
  otherKey: 'carreraId'              // Clave que conecta a la carrera
});

// Relación inversa: una carrera puede tener muchos estudiantes
db.carrera.belongsToMany(db.estudiante, {
  through: db.estudianteCarrera,     // Usamos el mismo modelo intermedio
  foreignKey: 'carreraId',           // Clave que conecta a la carrera
  otherKey: 'estudianteId'           // Clave que conecta al estudiante
});


// Relación carrera → docente (coordinador)
db.carrera.belongsTo(db.docente, {
  foreignKey: 'docenteId',
  as: 'coordinador'
});

module.exports = db;