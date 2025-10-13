module.exports = (sequelize, Sequelize) => {
  const Curso = require("./curso.model")(sequelize, Sequelize);

  const Horario = sequelize.define("horario", {
    dia_semana: {
      type: Sequelize.ENUM("Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"),
      allowNull: false
    },
    hora_inicio: {
      type: Sequelize.STRING(5), // o Sequelize.DATE si prefieres fecha+hora
      allowNull: false
    },
    hora_fin: {
      type: Sequelize.STRING(5),
      allowNull: false
    },
    aula: {
      type: Sequelize.STRING(20),
      allowNull: false
    }
  });

  // Relación con curso
  Horario.belongsTo(Curso, {
    foreignKey: "id_curso",
    targetKey: "id"
  });

  Curso.hasMany(Horario, {
    foreignKey: "id_curso",
    sourceKey: "id"
  });

  return Horario;
};
