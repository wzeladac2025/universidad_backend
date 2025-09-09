module.exports = (sequelize, DataTypes) => {
  const Inscripcioncurso = sequelize.define("inscripcioncurso", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    estudiante_id: { type: DataTypes.INTEGER, allowNull: false },
    materia_id: { type: DataTypes.INTEGER, allowNull: false },
    ciclo: { type: DataTypes.STRING },
    fecha_inscripcion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    estado: { type: DataTypes.STRING, defaultValue: "activa" }
  });

  return Inscripcioncurso;
};