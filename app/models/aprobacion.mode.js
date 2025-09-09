module.exports = (sequelize, DataTypes) => {
  return sequelize.define('aprobacion', {
    estudiante_id: DataTypes.INTEGER,
    materia_id: DataTypes.INTEGER
  });
};