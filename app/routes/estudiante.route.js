module.exports = app => {
  const express = require('express');
  const router = express.Router();
  const db = require('../models'); // Ajustá el path si tu carpeta se llama distinto

  // ✅ Ruta para desasignar estudiante de una carrera
  router.delete('/:id/carrera/:carreraId', async (req, res) => {
    const { id, carreraId } = req.params;
    try {
      const resultado = await db.estudianteCarrera.destroy({
        where: {
          estudianteId: id,
          carreraId: carreraId
        }
      });

      if (resultado === 0) {
        return res.status(404).json({ error: 'La asignación no existe o ya fue eliminada' });
      }

      res.status(200).json({ mensaje: 'Estudiante desasignado correctamente de la carrera' });
    } catch (error) {
      console.error('Error al desasignar:', error);
      res.status(500).json({ error: 'No se pudo desasignar al estudiante' });
    }
  });

  app.use('/api/estudiante', router);
};