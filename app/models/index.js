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

db.usuarios = require("./usuario.model.js")(sequelize, Sequelize);
db.estudiante = require("./estudiante.model.js")(sequelize, Sequelize);
// db.estudiantes = db.estudiante;
db.boleta = require("./boleta.model.js")(sequelize, Sequelize);
db.factura = require("./factura.model.js")(sequelize, Sequelize);
db.historialReporte = require("./historial_reporte.model.js")(sequelize, Sequelize);
db.nota = require ("./nota.model.js")(sequelize, Sequelize);
db.curso = require ("./curso.model.js")(sequelize, Sequelize);
db.materia = require ("./materia.model.js")(sequelize, Sequelize);
db.docente = require ("./docente.model.js")(sequelize, Sequelize);
db.carrera = require ("./carrera.model.js")(sequelize, Sequelize);

//Definir relaciones entre modelos
db.estudiante.hasMany(db.boleta, {
    foreignKey: "id_estudiante",
    as: "boletas"
});

db.boleta.belongsTo(db.estudiante, {
    foreignKey: "id_estudiante",
    as: "estudiante"
});

if (db.estudiante && db.historialReporte) {
    db.estudiante.hasMany(db.historialReporte, {
        foreignKey: "id_estudiante",
        as: "historial_reportes"
    });

    db.historialReporte.belongsTo(db.estudiante, {
        foreignKey: "id_estudiante",
        as: "estudiante"
    });
    console.log("Relación Estudiante-HistorialReporte definida.");
}

console.log("\n✅ Todos los modelos y relaciones cargados.\n");

module.exports = db;