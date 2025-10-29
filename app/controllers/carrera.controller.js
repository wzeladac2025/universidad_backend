const db = require("../models");
const Carrera = db.carrera;

exports.create = async (req, res) => {
  try {
    if (!req.body.facultad && !req.body.nombre && !req.body.duracion) {
      return res.status(400).send({
        mensaje:
          "Necesita ingresar la facultad, el nombre y la duracion de la carrera.",
      });
    }

    const carreraObj = {
      facultad: req.body.facultad,
      nombre: req.body.nombre,
      duracion: req.body.duracion,
    };

    const carrera = Carrera.build(carreraObj);
    const nuevaCarera = await carrera.save().catch((err) => {
      res.status(500).send({
        mensaje:
          err.message || "Error al crear carrera. Consulte a su administrador.",
      });
    });

    res.send({ mensaje: "Carrera creada", nombre: nuevaCarera.nombre });
  } catch (err) {
    res.status(500).send({ mensaje: err.message });
    console.log("Hubo un error inesperado", err.message);
  }
};

exports.findById = async (req, res) => {
  const id = req.params.id;
  const query = await db.sequelize
    .query('SELECT * FROM "carreras" u WHERE u."id" = ' + id, {
      model: Carrera,
      mapToModel: true,
    })
    .catch((err) => {
      return res.status(500).send({
        mensaje: err.message || "Error al obtener el carrera.",
      });
    });

  const carrera = query[0]?.dataValues;
  if (!carrera) {
    return res.status(404).send({ mensaje: "Carrera no registrado." });
  }

  return res.send({
    carrera,
  });
};

exports.findAll = async (req, res) => {
  const query = await db.sequelize
    .query('SELECT * FROM "carreras" u', {
      model: Carrera,
      mapToModel: true,
    })
    .catch((err) => {
      return res.status(500).send({
        mensaje: err.message || "Error al obtener el carrera.",
      });
    });

  const carreras = query;
  if (!carreras) {
    return res.status(404).send({ mensaje: "No hay carreras registradas" });
  }
  return res.send(carreras);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const query = await db.sequelize
    .query('SELECT * FROM "carreras" u WHERE u."id" = ' + id, {
      model: Carrera,
      mapToModel: true,
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Error al obtener el carrera.",
      });
    });

  const carrera = query[0]?.dataValues;
  if (!carrera) {
    return res.status(404).send({ message: "Carrera no registrado." });
  }

  //ACTUALIZAR ESTADO
  req.body.id = carrera.id;
  await Carrera.update(req.body, {
    where: {
      id: carrera.id,
    },
  })
    .then((id) => {
      if (id == 1) {
        return res.status(200).send({
          id: carrera.id,
        });
      } else {
        return res.status(401).send({
          mensaje: "No se actualizo el carrera.",
        });
      }
    })
    .catch(() => {
      return res.status(500).send({
        mensaje: "Error al actualizar el carrera.",
      });
    });
};
