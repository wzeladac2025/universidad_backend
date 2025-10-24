// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../models");
const Estudiante = db.estudiantes;
const Tarea = db.tareas;
const Tarea_Estudiante = db.tareas_estudiantes;
const Op = db.Sequelize.Op;

// Create and Save a new Client
exports.create = async (req, res) => {
  try {
    console.log('[Cursos.create] body:', JSON.stringify(req.body));

    const carnet_estudiante = req.body?.carnet_estudiante?.toString().trim();

    const missing = [];
    if (!carnet_estudiante) missing.push('carnet_estudiante');

    if (missing.length) {
      console.log('[Cursos.create] Validation failed, missing:', missing);
      return res.status(400).json({
        message: `Faltan campos requeridos: ${missing.join(', ')}`,
        details: {
          carnet_estudiante: carnet_estudiante || 'no enviado'
        }
      });
    }

    const estudiante = await Estudiante.findOne({
      where: { carnet: req.body.carnet_estudiante },
      attributes: ['id']
    });

    if (!estudiante) {
      return res.status(404).json({ message: 'Estudiante no encontrado.' });
    }

    const tarea = await Tarea_Estudiante.create({
      direccion_archivo: req.body.direccion_archivo,
      id_tarea: req.body.id_tarea,
      id_estudiante: estudiante.id
    });

    return res.status(201).json(tarea);
  } catch (err) {
    console.error('[Cursos.create] Error:', err);
    return res.status(500).json({ message: err.message || 'Error al crear el curso.' });
  }
};


// Retrieve all Client from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { [Op.iLike]: `%${id}%` } } : null;

    Tarea_Estudiante.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Hubo un error al conseguir todas las tareas asignadas a estudiantes."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
    try {
        const tareas_estudiantes = await Tarea_Estudiante.findOne({ where: { id: req.params.id } });
        if (!tareas_estudiantes) {
            return res.status(404).send({ message: "tarea no encontrada"
             });
        }

        res.send({ message: "tarea encontrada ",
          data: tareas_estudiantes
         });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    // Creamos un objeto vacío para acumular los cambios
    const cambios = {};

    // Si viene un nuevo nombre de materia, buscarla y asignar su id
    if (req.body.carnet_estudiante) {
      const estudiante = await Estudiante.findOne({
        where: { carnet: req.body.carnet_estudiante },
        attributes: ["id"]
      });
      
      if (!estudiante) {
        return res.status(404).json({ message: "Materia no encontrada." });
      }
      cambios.estudiante_id = estudiante.id;
    }

    // Otros campos directos (solo si vienen en req.body)
    if (req.body.id_tarea !== undefined) cambios.id_tarea = req.body.id_tarea;
    if (req.body.direccion_archivo !== undefined) cambios.direccion_archivo = req.body.direccion_archivo;
    if (req.body.punteo !== undefined) cambios.punteo = req.body.punteo;

    // Si no hay nada para actualizar, devolvemos error
    if (Object.keys(cambios).length === 0) {
      return res.status(400).json({ message: "No se enviaron campos para actualizar." });
    }

    // Ejecutar actualización
    const [updated] = await Tarea_Estudiante.update(cambios, { where: { id } });

    if (updated === 1) {
      const tareaActualizada = await Tarea_Estudiante.findByPk(id, {
        include: [
          { model: Estudiante, attributes: ["id", "nombre", "carnet"],
            model: Tarea, attributes: ["id", "nombre", "punteo"], }
        ]
      });

      return res.send({
        message: "tarea actualizada correctamente.",
        curso: tareaActualizada
      });
    } else {
      return res.status(404).json({ message: `No se encontró tarea con id=${id}.` });
    }

  } catch (err) {
    res.status(500).send({
      message: "Error al actualizar tarea con id=" + req.params.id,
      error: err.message
    });
  }
};


// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    // utilizamos el metodo destroy para eliminar el objeto mandamos la condicionante where id = parametro que recibimos 
    Tarea_Estudiante.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tarea fue borrada con exito!"
                });
            } else {
                res.send({
                    message: `No se pudo borrar la tarea con id=${id}. Tarea no fue encontrada!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar la tarea con id=" + id
            });
        });
};

// find all active Client, basado en el atributo status vamos a buscar que solo los clientes activos
exports.findAllStatus = (req, res) => {
    Curso.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving User."
            });
        }); 
};