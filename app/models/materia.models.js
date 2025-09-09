module.exports = (sequelize, DataTypes) => {
  return sequelize.define('materia', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: DataTypes.STRING
  });
};
