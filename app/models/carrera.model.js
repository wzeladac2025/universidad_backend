module.exports = (sequelize, Sequelize) => {
  sequelize
    .query(
      "CREATE SEQUENCE CARRERA_SEQ START WITH 1000 INCREMENT BY 1 NOMAXVALUE NOCYCLE CACHE 5 "
    )
    .catch(() => {});

  const Carrera = sequelize.define("carrera", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      defaultValue: Sequelize.literal("CARRERA_SEQ.NEXTVAL"),
    },    
    facultad: {
      type: Sequelize.STRING,
    },
    nombre: {
      type: Sequelize.STRING,
    },
    duracion: {
      type: Sequelize.INTEGER,
    }
  });
  return Carrera;
};
