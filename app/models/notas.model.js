module.exports = (sequelize, Sequelize) => {
    const Estudiante = require("./estudiante.model")(sequelize, Sequelize);
    const Curso = require("./curso.model")(sequelize, Sequelize);

  const Nota = sequelize.define("nota", {
    id: { 
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    primer_parcial: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    segundo_parcial: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    parcial_final: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    actividades: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    id_estudiante: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    id_curso: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ["id_estudiante", "id_curso"] // 🔹 cada estudiante solo una nota por curso
      }
    ]
  });

      Estudiante.hasMany(Nota, {
      foreignKey: "id_estudiante",
      as: "notas"
    });
    Nota.belongsTo(Estudiante, {
      foreignKey: "id_estudiante",
      as: "estudiante"
    });

    Curso.hasMany(Nota, {
      foreignKey: "id_curso",
      as: "notas"
    });
    Nota.belongsTo(Curso, {
      foreignKey: "id_curso",
      as: "curso"
    });

  return Nota;
};
