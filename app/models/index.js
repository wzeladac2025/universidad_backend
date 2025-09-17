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
// Relaciones muchos a muchos
db.estudiante.belongsToMany(db.carrera, {
  through: db.estudianteCarrera,
  foreignKey: 'estudianteId',
  otherKey: 'carreraId'
});

db.carrera.belongsToMany(db.estudiante, {
  through: db.estudianteCarrera,
  foreignKey: 'carreraId',
  otherKey: 'estudianteId'
});

// Relación carrera → docente (coordinador)
db.carrera.belongsTo(db.docente, {
  foreignKey: 'docenteId',
  as: 'coordinador'
});

module.exports = db;