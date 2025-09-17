// app/models/carrera.model.js

module.exports = (sequelize, Sequelize) => {
  const Carrera = sequelize.define("carrera", {
    nombre: {
      type: Sequelize.STRING
    },
    facultad: {
      type: Sequelize.STRING
    },
    duracion: {
      type: Sequelize.INTEGER,
      field: "DURACIÓN"
    }
  });

  return Carrera;
};