module.exports = (sequelize, Sequelize) => {
  const EstudianteCarrera = sequelize.define('estudiante_carrera', {
    fecha_asignacion: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    estado: {
      type: Sequelize.STRING,
      defaultValue: 'activo'
    }
  });

  return EstudianteCarrera;
};