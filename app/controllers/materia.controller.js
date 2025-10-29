const db = require("../models");
const Materia = db.materia;

exports.create = async (req, res) => {
  try {
    if (!req.body.facultad && !req.body.nombre && !req.body.duracion) {
      return res.status(400).send({
        mensaje:
          "Necesita ingresar la facultad, el nombre y la duracion de la materia.",
      });
    }

    const materiaObj = {
      id_carrera: req.body.id_carrera,
      nombre: req.body.nombre,
      credito: req.body.credito,
      semestre: req.body.semestre,
      obligatoriedad: req.body.obligatoriedad,
    };

    const materia = Materia.build(materiaObj);
    const nuevaMateria = await materia.save().catch((err) => {
      res.status(500).send({
        mensaje:
          err.message || "Error al crear materia. Consulte a su administrador.",
      });
    });

    res.send({ mensaje: "Materia creada", nombre: nuevaMateria.nombre });
  } catch (err) {
    res.status(500).send({ mensaje: err.message });
    console.log("Hubo un error inesperado", err.message);
  }
};

exports.findById = async (req, res) => {
  const id = req.params.id;
  const query = await db.sequelize
    .query('SELECT * FROM "materia" u WHERE u."id" = ' + id, {
      model: Materia,
      mapToModel: true,
    })
    .catch((err) => {
      return res.status(500).send({
        mensaje: err.message || "Error al obtener el materia.",
      });
    });

  const materia = query[0]?.dataValues;
  if (!materia) {
    return res.status(404).send({ mensaje: "Materia no registrado." });
  }

  return res.send({
    materia,
  });
};

exports.findAll = async (req, res) => {
  const query = await db.sequelize
    .query('SELECT * FROM "materia" u', {
      model: Materia,
      mapToModel: true,
    })
    .catch((err) => {
      return res.status(500).send({
        mensaje: err.message || "Error al obtener el materia.",
      });
    });

  const materias = query;
  if (!materias) {
    return res.status(404).send({ mensaje: "No hay materias registradas" });
  }
  return res.send(materias);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const query = await db.sequelize
    .query('SELECT * FROM "materia" u WHERE u."id" = ' + id, {
      model: Materia,
      mapToModel: true,
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Error al obtener el materia.",
      });
    });

  const materia = query[0]?.dataValues;
  if (!materia) {
    return res.status(404).send({ message: "Materia no registrado." });
  }

  //ACTUALIZAR ESTADO
  req.body.id = materia.id;
  await Materia.update(req.body, {
    where: {
      id: materia.id,
    },
  })
    .then((id) => {
      if (id == 1) {
        return res.status(200).send({
          id: materia.id,
        });
      } else {
        return res.status(401).send({
          mensaje: "No se actualizo el materia.",
        });
      }
    })
    .catch(() => {
      return res.status(500).send({
        mensaje: "Error al actualizar el materia.",
      });
    });
};
