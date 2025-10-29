// docente.model.js
module.exports = (sequelize, Sequelize) => {
  const Usuario = require("./usuario.model")(sequelize, Sequelize);

  sequelize
    .query(
      "CREATE SEQUENCE DOCENTE_SEQ START WITH 1000 INCREMENT BY 1 NOMAXVALUE NOCYCLE CACHE 5 "
    )
    .catch(() => {});

  const Docente = sequelize.define("docente", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      defaultValue: Sequelize.literal("DOCENTE_SEQ.NEXTVAL"),
    },    
    dpi: {
      type: Sequelize.STRING,
    },
    nombres: {
      type: Sequelize.STRING,
    },
    apellidos: {
      type: Sequelize.STRING,
    },
    fechaNacimiento: {
      type: Sequelize.DATE,
    },
    genero: {
      type: Sequelize.BOOLEAN,
    },
    sueldo: {
      type: Sequelize.DECIMAL(9, 2),
    },
    id_usuario: {
      type: Sequelize.INTEGER,
    },
  });

  Docente.belongsTo(Usuario, {
    foreignKey: "id_usuario",
    targetKey: "id",
  });

  Usuario.hasOne(Docente, {
    foreignKey: "id_usuario",
    sourceKey: "id",
  });
  return Docente;
};
