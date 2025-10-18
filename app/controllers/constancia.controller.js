const db = require("../models");
const Constancia = db.constancia;
const Factura = db.factura;
const Boleta = db.boleta;
const Op = db.Sequelize.Op;

// Crear constancia desde factura
exports.create = async (req, res) => {
  const { id_factura, detalle } = req.body;

  if (!id_factura || !detalle) {
    return res.status(400).send({ message: "id_factura y detalle son obligatorios." });
  }

  try {
    const factura = await Factura.findByPk(id_factura);
    if (!factura) return res.status(404).send({ message: "Factura no encontrada." });

    const boleta = await Boleta.findByPk(factura.id_boleta);
    if (!boleta) return res.status(404).send({ message: "Boleta vinculada no encontrada." });

    const constancia = {
      id_factura,
      id_estudiante: boleta.id_estudiante,
      fecha_emision: new Date(),
      detalle
    };

    const data = await Constancia.create(constancia);
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || "Error al generar constancia." });
  }
};

// Obtener todas las constancias
exports.getAll = (req, res) => {
  Constancia.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: "Error al obtener constancias." }));
};

// Obtener constancia por ID
exports.getById = (req, res) => {
  Constancia.findByPk(req.params.id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `No se encontró constancia con ID=${req.params.id}.` });
    })
    .catch(err => res.status(500).send({ message: "Error al buscar constancia." }));
};

// Actualizar constancia por ID
exports.update = (req, res) => {
  const id = req.params.id;

  Constancia.update(req.body, {
    where: { id_constancia: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Constancia actualizada correctamente." });
      } else {
        res.send({
          message: `No se actualizó constancia con ID=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar constancia con ID=" + id
      });
    });
};

// Eliminar constancia
exports.delete = (req, res) => {
  Constancia.destroy({ where: { id_constancia: req.params.id } })
    .then(num => {
      if (num == 1) res.send({ message: "Constancia eliminada correctamente." });
      else res.send({ message: `No se encontró constancia con ID=${req.params.id}.` });
    })
    .catch(err => res.status(500).send({ message: "Error al eliminar constancia." }));
};
