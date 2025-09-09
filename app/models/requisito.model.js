module.exports = (sequelize, DataTypes) => {
  return sequelize.define('requisito', {
    materia_id: DataTypes.INTEGER,
    requisito_id: DataTypes.INTEGER
  });
};
