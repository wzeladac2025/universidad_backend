const db = require("../models");
const Estudiante = db.estudiantes;
const sequelize = db.sequelize; 
const Op = db.Sequelize.Op;

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
        });
};


exports.delete = (req, res) => {
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