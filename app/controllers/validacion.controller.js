const db = require('../models');
const Requisito = db.requisito;
const Aprobacion = db.aprobacion;

exports.validarRequisitos = async (req, res) => {
  const { estudianteId, materiaId } = req.params;

  try {
    const requisitos = await Requisito.findAll({ where: { materia_id: materiaId } });
    const aprobadas = await Aprobacion.findAll({ where: { estudiante_id: estudianteId } });

    const aprobadasIds = aprobadas.map(a => a.materia_id);
    const faltantes = requisitos.filter(r => !aprobadasIds.includes(r.requisito_id));

    if (faltantes.length === 0) {
      res.status(200).json({ cumple: true, mensaje: 'Cumple todos los requisitos.' });
    } else {
      res.status(200).json({
        cumple: false,
        faltantes: faltantes.map(f => f.requisito_id)
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al validar requisitos.' });
  }
};