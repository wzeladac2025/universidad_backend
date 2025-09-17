const db = require("../models");
const Estudiante = db.estudiante;
const sequelize = db.sequelize; 
const Op = db.Sequelize.Op;

<<<<<<< HEAD
const generarCarnet = async (id) => {
    // Año actual
    const anioActual = new Date().getFullYear();
    const anipPartido = anioActual.toString().slice(-2);

    // Generar solo el carnet
    return `E-${anipPartido}-${id}`;
};



exports.create = async (req, res) => {
  if (!req.body.nombre) {
    return res.status(400).send({ message: "No puede estar vacio." });
  }

  try {
    // 1. Crear estudiante (sin carnet aún)
    let estudiante = await Estudiante.create({
      DPI: req.body.DPI,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      fechaNacimiento: req.body.fechaNacimiento,
      genero: req.body.genero,
      id_usuario: req.body.id_usuario,
    });

    // 2. Generar carnet con el id asignado por la DB
    const añoActual = new Date().getFullYear();
    const carnet = `E-${añoActual}-${estudiante.id}`;

    // 3. Guardar el carnet en el mismo registro
    estudiante.carnet = carnet;
    await estudiante.save();

    // 4. Responder
    res.status(201).send(estudiante);

  } catch (err) {
    res.status(500).send({
      message: err.message || "Error ocurrido al crear estudiante."
    });
  }
};

exports.getAll = async (req, res) => {
    try {
        const data = await Estudiante.findAll();

        res.status(200).send(data);

    } catch (err) {
        res.status(500).send({
            message: err.message || "Error ocurrido al obtener estudiantes."
        });
    }
};

exports.getByCarnet = async (req, res) => {

    const carnet = req.params.carnet;

    if (!carnet) {
        console.warn("No se proporcionó carnet en la consulta");
        return res.status(400).send({
            message: "Debe proporcionar un carnet para la búsqueda."
        });
    }

    // Para Oracle: búsqueda insensible a mayúsculas
    var condition = sequelize.where(
        sequelize.fn("UPPER", sequelize.col("carnet")),
        { [Op.like]: `%${carnet.toUpperCase()}%` }
    );

    Estudiante.findOne({ where: condition })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: "Estudiante no encontrado con carnet " + carnet
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error ocurrido al obtener estudiante."
            });
        });
};


exports.update = async (req, res) => {
    const carnet = req.params.carnet;

    if (!carnet) {
    return res.status(400).send({ message: "Debe proporcionar un carnet para actualizar." });
    }

    Estudiante.update(req.body, {
        where: { carnet: carnet }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Estudiante Actualizado."
                });
            } else {
                res.send({
                    message: `No se actualizo estudiante con carnet=${carnet}. Estudiante no existe o error en la peticion.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al actualizar estudiante con carnet=" + carnet
            });
=======
exports.create = (req, res) => {
  if (!req.body.primer_nombre) {
    res.status(400).send({
      message: "No puede estar vacio.",
    });
    return;
  }

  const estudiante = {
    primer_nombre: req.body.primer_nombre,
    segundo_nombre: req.body.segundo_nombre,
    primer_apellido: req.body.primer_apellido,
  };

  Estudiante.create(estudiante)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error ocurrido al crear estudiante.",
      });
    });
};

exports.getAll = (req, res) => {
  Estudiante.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error ocurrido al obtener estudiantes.",
      });
    });
};

exports.getByCarnet = async (req, res) => {

    const carnet = req.params.carnet;

    if (!carnet) {
        console.warn("No se proporcionó carnet en la consulta");
        return res.status(400).send({
            message: "Debe proporcionar un carnet para la búsqueda."
        });
    }

    // Para Oracle: búsqueda insensible a mayúsculas
    var condition = sequelize.where(
        sequelize.fn("UPPER", sequelize.col("carnet")),
        { [Op.like]: `%${carnet.toUpperCase()}%` }
    );

    Estudiante.findOne({ where: condition })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: "Estudiante no encontrado con carnet " + carnet
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error ocurrido al obtener estudiante."
            });
        });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Estudiante.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Estudiante Actualizado.",
>>>>>>> main
        });
      } else {
        res.send({
          message: `No se actualizo estudiante con ID=${id}. Estudiante no existe o error en la peticion.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error al actualizar estudiante con ID=" + id,
      });
    });
};

exports.delete = (req, res) => {
<<<<<<< HEAD
    const carnet = req.params.carnet;
    Estudiante.destroy({
        where: { carnet: carnet }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Estudiante eliminado exitosamente"
                });
            } else {
                res.send({
                    message: `No se puede eliminar estudiante con ID=${id}. Estudiante no existe o error en la peticion.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar estudiante con ID=" + id
            });
        });

    };

    exports.testCarnet = async (req, res) => {
    try {
        const carnet = await generarCarnet(db.sequelize);

        res.status(200).send({ carnet });
    } catch (err) {
        res.status(500).send({
        message: err.message || "Error al generar carnet."
        });
    }
    };
=======
  const id = req.params.id;
  Estudiante.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Estudiante eliminado exitosamente",
        });
      } else {
        res.send({
          message: `No se puede eliminar estudiante con ID=${id}. Estudiante no existe o error en la peticion.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error al eliminar estudiante con ID=" + id,
      });
    });
};
>>>>>>> main
