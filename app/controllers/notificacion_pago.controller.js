const db = require("../models");
const NotificacionPago = db.notificacionpago;  // ← Evita conflictos de nombre
const Op = db.Sequelize.Op;

// Crear un nueva notificacion
exports.create = (req, res) => {
    if (!req.body.id_notificacion) {
        return res.status(400).send({ message: "El ID del pago no puede estar vacío." });
    }

    const nuevaNotificacion = {
        id_notificacion: req.body.id_notificacion,
        id_pago: req.body.id_pago,
        id_usuario: req.body.id_usuario,
        fecha_envio: req.body.fecha_envio,
        correo: req.body.correo,
        mensaje: req.body.mensaje,
        estado_notificacion: req.body.estado_notificacion    };

    NotificacionPago.create(nuevaNotificacion)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al crear el notificacion." });
        });
};
/*
// Obtener todos las notificacines (con filtro opcional por id_pago)
exports.findAll = (req, res) => {
    const id_pago = req.query.id_pago;
    const condition = id_pago ? { id_pago: { [Op.iLike]: `%${id_pago}%` } } : null;

    NotificacionPago.findAll({ where: condition })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al obtener notificacion." });
        });
};
*/
// Obtener un solo libro por ID
exports.findOne = (req, res) => {
    const id_notificacion = req.params.id_notificacion;

    NotificacionPago.findByPk(id_notificacion)
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: "notificacion  no encontrada." });
        })
        .catch(err => {
            res.status(500).send({ message: "Error al recuperar notificacion con ID=" + id_notificacion });
        });
};

// Actualizar notificacionpago
exports.update = (req, res) => {
    const id_notificacion = req.params.id_notificacion;

    NotificacionPago.update(req.body, {
        where: { id_notificacion: id_notificacion }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "notificacion actualizado correctamente." });
            } else {
                res.send({ message: `No se pudo actualizar notificacion con ID=${id_notificacion}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al actualizar administrador con ID=" + id_notificacion });
        });
};

// Eliminar un notificacion
exports.delete = (req, res) => {
    const id_notificacion = req.params.id_notificacion;

    NotificacionPago.destroy({ where: { id_notificacion: id_notificacion} })
        .then(num => {
            if (num == 1) {
                res.send({ message: "notificacion eliminado correctamente." });
            } else {
                res.send({ message: `No se encontró notificacion con ID=${id_notificacion}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al eliminar notificacion con ID=" + id_notificacion });
        });
};

// Eliminar todos los libros
exports.deleteAll = (req, res) => {
    NotificacionPago.destroy({ where: {}, truncate: false })
        .then(nums => {
            res.send({ message: `${nums} notificaciones eliminadas correctamente.` });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al eliminar todos las notificaciones." });
        });
};

// Encontrar todos los libros activos
exports.findAllStatus = (req, res) => {
    NotificacionPago.findAll({ where: { status: true } })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al obtener notificaciones  activos." });
        });
};


