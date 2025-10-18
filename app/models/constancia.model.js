module.exports = (sequelize, Sequelize) => {
  const Constancia = sequelize.define("constancia", {
    id_constancia: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_factura: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    id_estudiante: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    fecha_emision: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    detalle: {
      type: Sequelize.STRING
    }
  }, {
    tableName: "constancias_pago",
    timestamps: false
  });

  return Constancia;
};
