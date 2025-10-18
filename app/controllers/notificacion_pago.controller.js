const db = require("../models");
const Notificacion = db.notificacion;  // 👈 Nombre del modelo definido en Sequelize
const Op = db.Sequelize.Op;

// Crear una nueva notificación
exports.create = (req, res) => {
    if (!req.body.mensaje) {
        return res.status(400).send({ message: "El mensaje no puede estar vacío." });
    }

    const nuevaNotificacion = {
        id_usuario: req.body.id_usuario,
        correo: req.body.correo,
        mensaje: req.body.mensaje,
        estado_notificacion: req.body.estado_notificacion || "pendiente"
    };

    Notificacion.create(nuevaNotificacion)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al crear la notificación de pago." });
        });
};

// Obtener una notificación por ID
exports.findOne = (req, res) => {
    const id_notificacion = req.params.id_notificacion;

    Notificacion.findByPk(id_notificacion)
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: "Notificación no encontrada." });
        })
        .catch(err => {
            res.status(500).send({ message: "Error al recuperar notificación con ID=" + id_notificacion });
        });
};

// Actualizar una notificación
exports.update = (req, res) => {
    const id_notificacion = req.params.id_notificacion;

    Notificacion.update(req.body, { where: { id_notificacion: id_notificacion } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Notificación actualizada correctamente." });
            } else {
                res.send({ message: `No se pudo actualizar la notificación con ID=${id_notificacion}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al actualizar notificación con ID=" + id_notificacion });
        });
};

// Eliminar una notificación
exports.delete = (req, res) => {
    const id_notificacion = req.params.id_notificacion;

    Notificacion.destroy({ where: { id_notificacion: id_notificacion } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Notificación eliminada correctamente." });
            } else {
                res.send({ message: `No se encontró la notificación con ID=${id_notificacion}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al eliminar notificación con ID=" + id_notificacion });
        });
};

// Eliminar todas las notificaciones
exports.deleteAll = (req, res) => {
    Notificacion.destroy({ where: {}, truncate: false })
        .then(nums => {
            res.send({ message: `${nums} notificaciones eliminadas correctamente.` });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al eliminar todas las notificaciones." });
        });
};

// Encontrar todas las notificaciones por estado (ej. enviadas)
/*exports.findAllByEstado = (req, res) => {
    const estado = req.query.estado || "pendiente";

    Notificacion.findAll({ where: { estado_notificacion: estado } })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al obtener notificaciones filtradas por estado." });
        });
};*/
