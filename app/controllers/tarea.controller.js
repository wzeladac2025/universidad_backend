// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../models");
const Curso = db.cursos;
const Materia = db.materias;
const Tarea = db.tareas;
const Op = db.Sequelize.Op;

// Create and Save a new Client
exports.create = async (req, res) => {
  try {
    console.log('[Tarea.create] body:', JSON.stringify(req.body));

    const nombre_materia = req.body?.nombre_materia?.toString().trim();

    const missing = [];
    if (!nombre_materia) missing.push('nombre_materia');

    if (missing.length) {
      console.log('[Tarea.create] Validation failed, missing:', missing);
      return res.status(400).json({
        message: `Faltan campos requeridos: ${missing.join(', ')}`,
        details: {
          nombre_materia: nombre_materia || 'no enviado'
        }
      });
    }

    const materia = await Materia.findOne({
      where: { nombre: nombre_materia },
      attributes: ['id']
    });

    if (!materia) {
      return res.status(404).json({ message: 'Materia no encontrada.' });
    }

    const curso = await Curso.findOne({
      where: { id_materia: materia.id },
      attributes: ['id']
    });

    if (!curso) {
      return res.status(404).json({ message: 'Curso no encontrada.' });
    }

    const tarea = await Tarea.create({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      fecha_entrega: req.body.fecha_entrega,
      tipo: req.body.tipo,
      punteo: req.body.punteo,
      id_curso: curso.id
    });

    return res.status(201).json(tarea);
  } catch (err) {
    console.error('[Cursos.create] Error:', err);
    return res.status(500).json({ message: err.message || 'Error al crear el tarea.' });
  }
};


// Retrieve all Client from the database.
exports.findAll = (req, res) => {
    const id_tarea = req.query.id_tarea;
    var condition = id_tarea ? { id_tarea: { [Op.iLike]: `%${id_tarea}%` } } : null;

    Tarea.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "hubo un error al recibir todas las tareas."
            });
        });
};

exports.getByCurso = async (req, res) => {
  try {
    const id_curso = req.params.id_curso;

    if (!id_curso) {
      return res.status(400).send({
        message: "Debe proporcionar un id_curso para la búsqueda.",
      });
    }

    // Si id_curso es numérico, se busca directamente por igualdad
    const tareas = await Tarea.findAll({
      where: { id_curso: id_curso },
    });

    if (!tareas || tareas.length === 0) {
      return res.status(404).send({
        message: `No se encontraron actividades para el curso con id ${id_curso}`,
      });
    }

    // Enviar directamente el arreglo de tareas
    res.status(200).send(tareas);
  } catch (err) {
    console.error("Error al obtener actividades por curso:", err);
    res.status(500).send({
      message:
        err.message || "Error ocurrido al obtener las actividades del curso.",
    });
  }
};



// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
    try {
        const tarea = await Tarea.findOne({ where: { id: req.params.id } });
        if (!tarea) {
            return res.status(404).send({ message: "Tarea no encontrado" });
        }

        res.send({ message: "Tarea encontrada ",
          data: tarea
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
    if (req.body.nombre_materia) {
      const materia = await Materia.findOne({
        where: { nombre: req.body.nombre_materia },
        attributes: ["id"]
      });
      
      if (!materia) {
        return res.status(404).json({ message: "Materia no encontrada." });
      }

      const curso = await Curso.findOne({
        where: { id_materia: materia.id },
        attributes: ["id"]
      });
      
      if (!curso) {
        return res.status(404).json({ message: "Curso no encontrada." });
      }
      cambios.id_curso = curso.id;
    }

    // Otros campos directos (solo si vienen en req.body)
    if (req.body.nombre !== undefined) cambios.nombre = req.body.nombre;
    if (req.body.descripcion !== undefined) cambios.descripcion = req.body.descripcion;
    if (req.body.fecha_entrega !== undefined) cambios.fecha_entrega = req.body.fecha_entrega;
    if (req.body.estado !== undefined) cambios.estado = req.body.estado;
    if (req.body.direccion_archivo !== undefined) cambios.direccion_archivo = req.body.direccion_archivo;
    if (req.body.tipo !== undefined) cambios.tipo = req.body.tipo;
    if (req.body.punteo !== undefined) cambios.punteo = req.body.punteo;

    // Si no hay nada para actualizar, devolvemos error
    if (Object.keys(cambios).length === 0) {
      return res.status(400).json({ message: "No se enviaron campos para actualizar." });
    }

    // Ejecutar actualización
    const [updated] = await Tarea.update(cambios, { where: { id } });

    if (updated === 1) {
      const tareaActualizado = await Tarea.findByPk(id);

      return res.send({
        message: "Tarea actualizado correctamente.",
        curso: tareaActualizado
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
    Tarea.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tarea eliminada con exito!"
                });
            } else {
                res.send({
                    message: `No se pudo borrar la tarea con id=${id}. Tarea no encontrada!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar tarea con id=" + id
            });
        });
};