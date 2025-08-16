const db = require("../models");
const Estudiante = db.estudiante;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({
            message: "No puede estar vacio."
        });
        return;
    }

    const Estudiante = {
        primer_nombre: req.body.nombre,
        primer_apellido: req.body.sinopsis,
    };


    Estudiante.create(cliente)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error ocurrido al crear estudiante."
            });
        });
};

exports.getAll = (req, res) => {
    Estudiante.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error ocurrido al obtener estudiantes."
            });
        });
};

exports.getByName = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Estudiante.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error ocurrido al obtener estudiante."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Estudiante.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Estudiante Actualizado."
                });
            } else {
                res.send({
                    message: `No se actualizo estudiante con ID=${id}. Estudiante no existe o error en la peticion.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar estudiante con ID=" + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;
    Estudiante.destroy({
        where: { id: id }
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