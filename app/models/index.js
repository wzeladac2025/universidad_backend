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
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

try {
  db.usuarios = require("./usuario.model.js")(sequelize, Sequelize);
  console.log("Modelo 'usuario' cargado correctamente.");
} catch (err) {
  console.error("Error al cargar modelo 'usuario':", err.message);
}

try {
  db.estudiante = require("./estudiante.model.js")(sequelize, Sequelize);
  console.log("Modelo 'estudiante' cargado correctamente.");
} catch (err) {
  console.error("Error al cargar modelo 'estudiante':", err.message);
}

db.boleta = require("./boleta.model.js")(sequelize, Sequelize);
db.factura = require("./factura.model.js")(sequelize, Sequelize);
db.constancia = require("./constancia.model.js")(sequelize, Sequelize);

// Definir relaciones entre modelos
db.estudiante.hasMany(db.boleta, {
  foreignKey: "id_estudiante",
  as: "boletas"
});

db.boleta.belongsTo(db.estudiante, {
  foreignKey: "id_estudiante",
  as: "estudiante"
});

db.boleta.hasOne(db.factura, {
  foreignKey: "id_boleta",
  as: "factura"
});

db.factura.belongsTo(db.boleta, {
  foreignKey: "id_boleta",
  as: "boleta"
});

db.factura.hasOne(db.constancia, {
  foreignKey: "id_factura",
  as: "constancia"
});

db.constancia.belongsTo(db.factura, {
  foreignKey: "id_factura",
  as: "factura"
});

module.exports = db;
