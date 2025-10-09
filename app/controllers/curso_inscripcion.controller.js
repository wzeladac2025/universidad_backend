
const db = require("../models");
const Curso_Inscripcion = db.inscripciones;
const Estudiante = db.estudiantes;
const Curso = db.cursos;
const Materia = db.materias;
const Carrera_Estudiante = db.estudiante_carreras;
const Carrera = db.carreras;
const { Sequelize } = db;
const Op = db.Sequelize.Op;


exports.create = async (req, res) => {
  try {
    const nombre_materia = req.body?.nombre_materia?.toString().trim();
    const carnet_estudiante = req.body?.carnet_estudiante?.toString().trim();
    const periodo = req.body?.periodo?.toString().trim();
    const estado = req.body?.estado ?? "activo";

    const missing = [];
    if (!nombre_materia) missing.push("nombre_materia");
    if (!carnet_estudiante) missing.push("carnet_estudiante");
    if (!periodo) missing.push("periodo");

    if (missing.length) {
      return res.status(400).json({
        message: `Faltan campos requeridos: ${missing.join(", ")}`,
        details: {
          nombre_materia: nombre_materia || "no enviado",
          carnet_estudiante: carnet_estudiante || "no enviado",
          periodo: periodo || "no enviado",
        },
      });
    }


    const estudiante = await Estudiante.findOne({
      where: { carnet: carnet_estudiante },
      attributes: ["id", "carnet"],
    });
    if (!estudiante) {
      return res
        .status(404)
        .json({ message: `Estudiante no encontrado para carnet=${carnet_estudiante}` });
    }

    const materia = await Materia.findOne({
      where: { nombre: nombre_materia },
      attributes: ["id", "nombre", "id_carrera"],
    });
    if (!materia) {
      return res
        .status(404)
        .json({ message: `Materia no encontrada para nombre="${nombre_materia}"` });
    }

    const curso = await Curso.findOne({
      where: { id_materia: materia.id, periodo },
      attributes: ["id", "id_materia", "periodo"],
    });
    if (!curso) {
      return res.status(404).json({
        message: `Curso no encontrado para materia="${nombre_materia}" y periodo="${periodo}"`,
      });
    }

    const verificador_carrera = await Carrera_Estudiante.findOne({
      where: { id_estudiante: estudiante.id, id_materia: materia.id_carrera },
      attributes: ["id", "fecha_ingreso"],
    });
    if (!verificador_carrera) {
      return res
        .status(404)
        .json({ message: `No puede asignarse a cursos que no pertenezcan a carreras que no estan inscritas` });
    }

    const now = new Date();
    const created = await Curso_Inscripcion.create({
      estado,
      fecha_inscripcion: now,
      id_curso: curso.id,
      id_estudiante: estudiante.id,
    });

    const createdFull = await Curso_Inscripcion.findByPk(created.id, {
      include: [
        { model: Curso, attributes: ["id", "id_materia", "periodo"] },
        { model: Estudiante, attributes: ["id", "carnet"] },
      ],
    });

    return res.status(201).json(createdFull || created);
  } catch (err) {
    console.error("[Curso_Inscripcion.create] Error:", err);
    return res
      .status(500)
      .json({ message: err.message || "Error al crear la inscripción de curso." });
  }
};

exports.obtenerCursosSiguienteSemestre = async (req, res) => {
  console.log("🔹 [obtenerCursosSiguienteSemestre] Petición recibida con body:", req.body);

  try {
    const carnet_estudiante = req.body?.carnet_estudiante?.toString().trim();
    const nombre_carrera = req.body?.nombre_carrera?.toString().trim();

    console.log("🔍 Validando campos:", { carnet_estudiante, nombre_carrera });

    // 🧾 Validación de campos requeridos
    const missing = [];
    if (!carnet_estudiante) missing.push("carnet_estudiante");
    if (!nombre_carrera) missing.push("nombre_carrera");

    if (missing.length) {
      console.warn("⚠️ Faltan campos requeridos:", missing);
      return res.status(400).json({
        message: `Faltan campos requeridos: ${missing.join(", ")}`,
        details: {
          carnet_estudiante: carnet_estudiante || "no enviado",
          nombre_carrera: nombre_carrera || "no enviado",
        },
      });
    }

    // Paso 1️⃣: Buscar carrera por nombre
    console.log("🧩 Buscando carrera:", nombre_carrera);
    const carrera = await Carrera.findOne({
      where: { nombre: nombre_carrera },
      attributes: ["id", "nombre"],
    });

    if (!carrera) {
      console.warn("⚠️ Carrera no encontrada:", nombre_carrera);
      return res.status(404).json({ message: "Carrera no encontrada." });
    }

    console.log("✅ Carrera encontrada:", carrera.toJSON());

    // Paso 2️⃣: Determinar el siguiente semestre pendiente (PostgreSQL)
    console.log("📘 Ejecutando consulta SQL para determinar siguiente semestre...");

    const [resultado] = await db.sequelize.query(
      `
      WITH MateriasAprobadas AS (
          SELECT DISTINCT m.id
          FROM curso_inscripcions ic
          JOIN cursos c ON ic.id_curso = c.id
          JOIN materia m ON c.id_materia = m.id
          JOIN nota n ON ic.id_estudiante = n.id_estudiante AND ic.id_curso = n.id_curso
          WHERE ic.id_estudiante = (
              SELECT id FROM estudiantes WHERE carnet = :carnet_estudiante
          )
          AND ((COALESCE(n.primer_parcial, 0) + COALESCE(n.segundo_parcial, 0) + COALESCE(n.parcial_final, 0) + COALESCE(n.actividades, 0))) >= 61
      ),
      SemestresPendientes AS (
          SELECT m."Semestre" AS semestre
          FROM materia m
          LEFT JOIN MateriasAprobadas ma ON m.id = ma.id
          WHERE ma.id IS NULL
          AND m.status = true
          AND m.id_carrera = :id_carrera
      )
      SELECT MIN(semestre) AS siguiente_semestre
      FROM SemestresPendientes;
      `,
      {
        replacements: {
          carnet_estudiante,
          id_carrera: carrera.id,
        },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    console.log("📊 Resultado consulta siguiente semestre:", resultado);

    const siguiente_semestre = resultado?.siguiente_semestre;

    if (!siguiente_semestre) {
      console.info("🎓 El estudiante ha completado todas las materias obligatorias.");
      return res.status(200).json({
        message: "El estudiante ha completado todas las materias obligatorias.",
        cursos: [],
      });
    }

    console.log(`📘 Siguiente semestre identificado: ${siguiente_semestre}`);

    // Paso 3️⃣: Obtener los cursos disponibles para ese semestre
    console.log("🧠 Buscando cursos del siguiente semestre...");
    const cursos_siguiente = await db.sequelize.query(
      `
      SELECT 
        c.id AS id_curso,
        m.nombre AS nombre_materia,
        c.seccion,
        c.periodo,
        c.cupo_maximo
      FROM cursos c
      JOIN materia m ON c.id_materia = m.id
      WHERE m.duracion = :siguiente_semestre
      AND m.id_carrera = :id_carrera
      ORDER BY m.nombre ASC;
      `,
      {
        replacements: {
          siguiente_semestre,
          id_carrera: carrera.id,
        },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    console.log(`✅ Cursos encontrados (${cursos_siguiente.length}):`, cursos_siguiente);

    return res.status(200).json({
      message: "Cursos del siguiente semestre obtenidos exitosamente.",
      siguiente_semestre,
      cursos: cursos_siguiente,
    });

  } catch (err) {
    console.error("❌ [obtenerCursosSiguienteSemestre] Error general:", err);
    return res.status(500).json({
      message: "Error al obtener los cursos del siguiente semestre.",
      error: err.message,
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const id_curso = req.query?.id_curso;
    const where = {};

    if (id_curso !== undefined) {
      const idParsed = Number(id_curso);
      if (Number.isNaN(idParsed)) {
        return res
          .status(400)
          .send({ message: "id_curso debe ser numérico." });
      }
      where.id_curso = idParsed;
    }

    const data = await Curso_Inscripcion.findAll({
      where,
      include: [
        { model: Curso, attributes: ["id", "id_materia", "periodo"] },
        { model: Estudiante, attributes: ["id", "carnet"] },
      ],
      order: [["id", "ASC"]],
    });

    return res.send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Hubo un error al buscar las inscripciones.",
    });
  }
};


exports.findOne = async (req, res) => {
  try {
    const id = req.params?.id;
    if (!id) {
      return res
        .status(400)
        .send({ message: "Debe incluir el id de la inscripción a buscar." });
    }

    const row = await Curso_Inscripcion.findByPk(id, {
      include: [
        { model: Curso, attributes: ["id", "id_materia", "periodo"] },
        { model: Estudiante, attributes: ["id", "carnet"] },
      ],
    });

    if (!row) {
      return res.status(404).send({ message: "Inscripción a curso no encontrada." });
    }

    return res.send(row);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};


exports.update = async (req, res) => {
  try {
    const id = req.params?.id;
    if (!id) {
      return res
        .status(400)
        .send({ message: "Debe incluir el id de la inscripción a actualizar." });
    }

    const cambios = {};

    if (req.body.nombre_materia || req.body.periodo) {
      const nombre_materia = req.body?.nombre_materia?.toString().trim();
      const periodo = req.body?.periodo?.toString().trim();

      if (!nombre_materia || !periodo) {
        return res.status(400).json({
          message:
            "Para cambiar el curso debe enviar ambos campos: nombre_materia y periodo.",
        });
      }

      const materia = await Materia.findOne({
        where: { nombre: nombre_materia },
        attributes: ["id"],
      });
      if (!materia) {
        return res
          .status(404)
          .json({ message: `Materia no encontrada: "${nombre_materia}"` });
      }

      const curso = await Curso.findOne({
        where: { id_materia: materia.id, periodo },
        attributes: ["id"],
      });
      if (!curso) {
        return res.status(404).json({
          message: `Curso no encontrado para materia="${nombre_materia}" y periodo="${periodo}"`,
        });
      }

      cambios.id_curso = curso.id;
    }

    if (req.body.carnet_estudiante) {
      const carnet_estudiante = req.body.carnet_estudiante.toString().trim();
      const estudiante = await Estudiante.findOne({
        where: { carnet: carnet_estudiante },
        attributes: ["id"],
      });
      if (!estudiante) {
        return res
          .status(404)
          .json({ message: `Estudiante no encontrado: carnet=${carnet_estudiante}` });
      }
      cambios.id_estudiante = estudiante.id;
    }

    if (req.body.estado !== undefined) {
      cambios.estado = req.body.estado;
    }

    if (Object.keys(cambios).length === 0) {
      return res.status(400).json({ message: "No se enviaron campos para actualizar." });
    }

    const [updated] = await Curso_Inscripcion.update(cambios, { where: { id } });

    if (updated !== 1) {
      return res
        .status(404)
        .json({ message: `No se encontró inscripción con id=${id}.` });
    }

    const updatedRow = await Curso_Inscripcion.findByPk(id, {
      include: [
        { model: Curso, attributes: ["id", "id_materia", "periodo"] },
        { model: Estudiante, attributes: ["id", "carnet"] },
      ],
    });

    return res.send({
      message: "Inscripción actualizada correctamente.",
      inscripcion: updatedRow,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error al actualizar inscripción con id=" + req.params.id,
      error: err.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params?.id;
    if (!id) {
      return res
        .status(400)
        .send({ message: "Debe incluir el id de la inscripción a eliminar." });
    }

    const num = await Curso_Inscripcion.destroy({ where: { id } });
    if (num === 1) {
      return res.send({ message: "Inscripción eliminada correctamente." });
    } else {
      return res
        .status(404)
        .send({ message: `No se encontró inscripción con id=${id}.` });
    }
  } catch (err) {
    return res.status(500).send({
      message: "No se pudo eliminar la inscripción con id=" + req.params.id,
    });
  }
};


exports.findAllStatus = async (req, res) => {
  try {
    const data = await Curso_Inscripcion.findAll({
      where: { estado: true }, 
      include: [
        { model: Curso, attributes: ["id", "id_materia", "periodo"] },
        { model: Estudiante, attributes: ["id", "carnet"] },
      ],
      order: [["id", "ASC"]],
    });
    return res.send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error al obtener inscripciones activas.",
    });
  }
};
