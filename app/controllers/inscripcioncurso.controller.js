const db = require("../models");
const Inscripcioncurso = db.inscripcioncurso;

exports.inscribir = async (req, res) => {
  const { estudiante_id, materia_id, ciclo } = req.body;

  try {
    // Validar si ya está inscrito en esa materia y ciclo
    const existente = await Inscripcion.findOne({
      where: { estudiante_id, materia_id, ciclo }
    });

    if (existente) {
      return res.status(400).json({ error: "Ya está inscrito en esta materia para ese ciclo." });
    }

    const nueva = await Inscripcioncurso.create({
      estudiante_id,
      materia_id,
      ciclo
    });

    res.status(201).json({ mensaje: "Inscripción exitosa", inscripcioncurso: nueva });
  } catch (error) {
    res.status(500).json({ error: "Error al inscribir al estudiante." });
  }
};