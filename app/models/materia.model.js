module.exports = (sequelize, Sequelize) => {
  const Carrera = require("./carrera.model")(sequelize, Sequelize);

  sequelize
    .query(
      "CREATE SEQUENCE MATERIA_SEQ START WITH 1000 INCREMENT BY 1 NOMAXVALUE NOCYCLE CACHE 5 "
    )
    .catch(() => {});

  const Materia = sequelize.define("materia", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      defaultValue: Sequelize.literal("MATERIA_SEQ.NEXTVAL"),
    },
    id_carrera: {
      type: Sequelize.INTEGER,
    },
    nombre: {
      type: Sequelize.STRING,
    },
    credito: {
      type: Sequelize.INTEGER,
    },
    semestre: {
      type: Sequelize.STRING,
    },
    obligatoriedad: {
      type: Sequelize.BOOLEAN,
    },
  });

  // Relación:
  Materia.belongsTo(Carrera, {
    foreignKey: "id_carrera",
    targetKey: "id",
  });

  Carrera.hasMany(Materia, {
    foreignKey: "id_carrera",
    as: "carreras",
  });

  return Materia;
};
