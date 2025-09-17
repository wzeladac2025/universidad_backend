// app/models/docente.model.js

module.exports = (sequelize, Sequelize) => {
  const Docente = sequelize.define("docente", {
    nombre: {
      type: Sequelize.STRING
    },
    correo: {
      type: Sequelize.STRING
    },
    especialidad: {
      type: Sequelize.STRING
    }
  });

  return Docente;
};