module.exports = (sequelize, Sequelize) => {
  const Materia = require("./materia.model")(sequelize, Sequelize);
  const Docente = require("./docente.model")(sequelize, Sequelize);

  sequelize
    .query(
      "CREATE SEQUENCE CURSO_SEQ START WITH 1000 INCREMENT BY 1 NOMAXVALUE NOCYCLE CACHE 5 "
    )
    .catch(() => {});

  const Curso = sequelize.define("curso", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      defaultValue: Sequelize.literal("CURSO_SEQ.NEXTVAL"),
    },
    id_materia: {
      type: Sequelize.INTEGER,
    },
    id_docente: {
      type: Sequelize.INTEGER,
    },
    hora_inicio: {
      type: Sequelize.DATE,
    },
    hora_fin: {
      type: Sequelize.DATE,
    },
    seccion: {
      type: Sequelize.STRING,
    },
    cupo: {
      type: Sequelize.INTEGER,
    },
  });

  // Relación:
  Curso.belongsTo(Docente, {
    foreignKey: "id_docente",
    targetKey: "id",
  });

  Docente.hasMany(Curso, {
    foreignKey: "id_docente",
    as: "docentes",
  });

  // Relación:
  Curso.belongsTo(Materia, {
    foreignKey: "id_materia",
    targetKey: "id",
  });

  Materia.hasMany(Curso, {
    foreignKey: "id_materia",
    as: "materia",
  });

  return Curso;
};
