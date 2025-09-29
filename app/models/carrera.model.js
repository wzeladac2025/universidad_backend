// carrera.model.js
module.exports = (sequelize, Sequelize) => {
  const Docente = require("./docente.model")(sequelize, Sequelize);

  const Carrera = sequelize.define("carrera", {
    nombre: {
      type: Sequelize.STRING,
    },
    facultad: {
      type: Sequelize.STRING,
    },
    duracion: {
      type: Sequelize.INTEGER,
      field: "DURACION",
    },
  });

  // Relación: un docente pertenece a un usuario
  Docente.belongsTo(Carrera, {
    foreignKey: "id_carrera",
    targetKey: "id",
  });

  Carrera.hasMany(Docente, {
    foreignKey: "id_carrera",
    sourceKey: "id",
  });

  return Carrera;
};
