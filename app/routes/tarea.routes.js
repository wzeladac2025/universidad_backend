module.exports = app => {
  const tarea = require("../controllers/tarea.controller.js");
  var router = require("express").Router();

  /**
   * @swagger
   * /api/tarea/create:
   *   post:
   *     summary: Crea una nueva tarea
   *     description: Inserta una nueva tarea asociada a una materia existente. Automáticamente se asigna al curso vinculado a dicha materia.
   *     tags:
   *       - Tarea
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nombre_materia
   *               - nombre
   *               - fecha_entrega
   *             properties:
   *               nombre_materia:
   *                 type: string
   *                 example: "Álgebra Lineal"
   *               nombre:
   *                 type: string
   *                 example: "Tarea #1 - Sistemas de ecuaciones"
   *               descripcion:
   *                 type: string
   *                 example: "Resolver los ejercicios del capítulo 2."
   *               fecha_entrega:
   *                 type: string
   *                 format: date
   *                 example: "2025-05-30"
   *               estado:
   *                 type: string
   *                 example: "Pendiente"
   *               direccion_archivo:
   *                 type: string
   *                 example: "/uploads/tarea1.pdf"
   *               tipo:
   *                 type: string
   *                 example: "Individual"
   *               punteo:
   *                 type: number
   *                 example: 100
   *     responses:
   *       201:
   *         description: Tarea creada exitosamente
   *       400:
   *         description: Faltan campos requeridos o datos inválidos
   *       404:
   *         description: Materia o curso no encontrado
   *       500:
   *         description: Error interno del servidor
   */
  router.post("/create", tarea.create);

  /**
   * @swagger
   * /api/tarea:
   *   get:
   *     summary: Obtiene todas las tareas
   *     description: Retorna la lista de todas las tareas registradas. Se puede filtrar opcionalmente por ID de tarea.
   *     tags:
   *       - Tarea
   *     parameters:
   *       - in: query
   *         name: id_tarea
   *         schema:
   *           type: string
   *         required: false
   *         description: ID de la tarea para filtrar
   *     responses:
   *       200:
   *         description: Lista de tareas obtenida correctamente
   *       500:
   *         description: Error al obtener las tareas
   */
  router.get("/", tarea.findAll);

  /**
   * @swagger
   * /api/tarea/{id}:
   *   get:
   *     summary: Obtiene una tarea por ID
   *     description: Busca una tarea específica usando su identificador.
   *     tags:
   *       - Tarea
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID de la tarea
   *     responses:
   *       200:
   *         description: Tarea encontrada
   *       404:
   *         description: Tarea no encontrada
   *       500:
   *         description: Error al buscar la tarea
   */
  router.get("/:id", tarea.findOne);

  /**
   * @swagger
   * /api/tarea/update/{id}:
   *   put:
   *     summary: Actualiza una tarea por ID
   *     description: Permite actualizar los campos de una tarea existente. Si se cambia la materia, se reasigna el curso correspondiente.
   *     tags:
   *       - Tarea
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID de la tarea
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nombre:
   *                 type: string
   *                 example: "Tarea #1 - Actualizada"
   *               descripcion:
   *                 type: string
   *                 example: "Nuevo enunciado con ejercicios adicionales"
   *               fecha_entrega:
   *                 type: string
   *                 format: date
   *                 example: "2025-06-01"
   *               estado:
   *                 type: string
   *                 example: "Entregada"
   *               direccion_archivo:
   *                 type: string
   *                 example: "/uploads/tarea1_v2.pdf"
   *               tipo:
   *                 type: string
   *                 example: "Grupal"
   *               punteo:
   *                 type: number
   *                 example: 95
   *               nombre_materia:
   *                 type: string
   *                 example: "Álgebra Lineal"
   *     responses:
   *       200:
   *         description: Tarea actualizada exitosamente
   *       400:
   *         description: No se enviaron campos para actualizar
   *       404:
   *         description: Tarea o materia no encontrada
   *       500:
   *         description: Error al actualizar la tarea
   */
  router.put("/update/:id", tarea.update);

  /**
   * @swagger
   * /api/tarea/delete/{id}:
   *   delete:
   *     summary: Elimina una tarea por ID
   *     tags:
   *       - Tarea
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID de la tarea
   *     responses:
   *       200:
   *         description: Tarea eliminada exitosamente
   *       404:
   *         description: Tarea no encontrada
   *       500:
   *         description: Error al eliminar la tarea
   */
  router.delete("/delete/:id", tarea.delete);

  // Si deseas agregar deleteAll, podrías implementarlo luego en el controller
  // y documentarlo aquí también.

  // Registrar las rutas
  app.use("/api/tarea", router);
};
