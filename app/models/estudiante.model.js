module.exports = (sequelize, Sequelize) => {
  const Usuario = require("./usuario.model")(sequelize, Sequelize);

  sequelize
    .query(
      "CREATE SEQUENCE ESTUDIANTE_SEQ START WITH 1000 INCREMENT BY 1 NOMAXVALUE NOCYCLE CACHE 5 "
    )
    .catch(() => {});

  const Estudiante = sequelize.define("estudiante", {
    anio: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    correlativo_carne: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      defaultValue: Sequelize.literal("ESTUDIANTE_SEQ.NEXTVAL"),
    },
    dpi: {
      type: Sequelize.INTEGER,
    },
    primerNombre: {
      type: Sequelize.STRING,
    },
    segundoNombre: {
      type: Sequelize.STRING,
    },
    primerApellido: {
      type: Sequelize.STRING,
    },
    segundoApellido: {
      type: Sequelize.STRING,
    },
    fechaNacimiento: {
      type: Sequelize.DATE,
    },
    genero: {
      type: Sequelize.BOOLEAN,
    },
    id_usuario: {
      type: Sequelize.INTEGER,
    },
  });

  // Relación: un estudiante pertenece a un usuario
  Estudiante.belongsTo(Usuario, {
    foreignKey: "id_usuario",
    targetKey: "id",
  });

  Usuario.hasOne(Estudiante, {
    foreignKey: "id_usuario",
    sourceKey: "id",
  });

  return Estudiante;
};
