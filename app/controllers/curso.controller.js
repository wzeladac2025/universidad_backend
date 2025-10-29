const db = require("../models");
const Curso = db.curso;

exports.create = async (req, res) => {
  try {
    if (!req.body.facultad && !req.body.nombre && !req.body.duracion) {
      return res.status(400).send({
        mensaje: "Necesita ingresar la informacion del curso.",
      });
    }

    const cursoObj = {
      id_materia: req.body.id_materia,
      id_docente: req.body.id_docente,
      hora_inicio: req.body.hora_inicio,
      hora_fin: req.body.hora_fin,
      seccion: req.body.seccion,
      cupo: req.body.cupo,
    };

    const curso = Curso.build(cursoObj);
    const nuevaCarera = await curso.save().catch((err) => {
      res.status(500).send({
        mensaje:
          err.message || "Error al crear curso. Consulte a su administrador.",
      });
    });

    res.send({ mensaje: "Curso creada", nombre: nuevaCarera.nombre });
  } catch (err) {
    res.status(500).send({ mensaje: err.message });
    console.log("Hubo un error inesperado", err.message);
  }
};

exports.findById = async (req, res) => {
  const id = req.params.id;
  const query = await db.sequelize
    .query('SELECT * FROM "cursos" u WHERE u."id" = ' + id, {
      model: Curso,
      mapToModel: true,
    })
    .catch((err) => {
      return res.status(500).send({
        mensaje: err.message || "Error al obtener el curso.",
      });
    });

  const curso = query[0]?.dataValues;
  if (!curso) {
    return res.status(404).send({ mensaje: "Curso no registrado." });
  }

  return res.send({
    curso,
  });
};

exports.findAll = async (req, res) => {
  const query = await db.sequelize
    .query('SELECT * FROM "cursos" u', {
      model: Curso,
      mapToModel: true,
    })
    .catch((err) => {
      return res.status(500).send({
        mensaje: err.message || "Error al obtener el curso.",
      });
    });

  const cursos = query;
  if (!cursos) {
    return res.status(404).send({ mensaje: "No hay cursos registradas" });
  }
  return res.send(cursos);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const query = await db.sequelize
    .query('SELECT * FROM "cursos" u WHERE u."id" = ' + id, {
      model: Curso,
      mapToModel: true,
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Error al obtener el curso.",
      });
    });

  const curso = query[0]?.dataValues;
  if (!curso) {
    return res.status(404).send({ message: "Curso no registrado." });
  }

  //ACTUALIZAR ESTADO
  req.body.id = curso.id;
  await Curso.update(req.body, {
    where: {
      id: curso.id,
    },
  })
    .then((id) => {
      if (id == 1) {
        return res.status(200).send({
          id: curso.id,
        });
      } else {
        return res.status(401).send({
          mensaje: "No se actualizo el curso.",
        });
      }
    })
    .catch(() => {
      return res.status(500).send({
        mensaje: "Error al actualizar el curso.",
      });
    });
};
