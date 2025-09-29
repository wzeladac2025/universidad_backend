module.exports = (sequelize, Sequelize) => {
  sequelize
    .query(
      "CREATE SEQUENCE USUARIO_SEQ START WITH 1 INCREMENT BY 1 NOMAXVALUE NOCYCLE CACHE 5"
    )
    .catch(() => {});

  const Usuario = sequelize.define("usuario", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      defaultValue: Sequelize.literal("USUARIO_SEQ.NEXTVAL"),
    },
    correo: {
      type: Sequelize.STRING,
      unique: true,
    },
    contrasena: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.ENUM("admin", "docente", "estudiante", "user"),
      defaultValue: "user",
    },
  });
  return Usuario;
};
