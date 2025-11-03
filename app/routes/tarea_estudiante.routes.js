module.exports = app => {
  const tarea_estudiante = require("../controllers/tarea_estudiante.controller.js");
  var router = require("express").Router();

/**
 * @swagger
 * /api/tarea_estudiante/create:
 *   post:
 *     summary: Asigna una tarea a un estudiante
 *     description: Crea una relación entre una tarea existente y un estudiante identificado por su carnet. Permite registrar el estado de entrega, la ruta del archivo y opcionalmente el punteo obtenido.
 *     tags:
 *       - Tarea_Estudiante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - carnet_estudiante
 *               - id_tarea
 *             properties:
 *               direccion_archivo:
 *                 type: string
 *                 example: "/uploads/tarea1.pdf"
 *               estado:
 *                 type: string
 *                 example: "entregado"
 *               punteo:
 *                 type: integer
 *                 example: 10
 *               carnet_estudiante:
 *                 type: string
 *                 example: "E-2025-100"
 *               id_tarea:
 *                 type: integer
 *                 example: 12
 *     responses:
 *       201:
 *         description: Tarea asignada exitosamente al estudiante.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 45
 *                 direccion_archivo:
 *                   type: string
 *                   example: "/uploads/tarea1.pdf"
 *                 estado:
 *                   type: string
 *                   example: "entregado"
 *                 id_tarea:
 *                   type: integer
 *                   example: 12
 *                 id_estudiante:
 *                   type: integer
 *                   example: 8
 *       400:
 *         description: Faltan campos requeridos o datos inválidos.
 *       404:
 *         description: Estudiante no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/create", tarea_estudiante.create);
  /**
   * @swagger
   * /api/tarea_estudiante:
   *   get:
   *     summary: Obtiene todas las tareas asignadas a estudiantes
   *     description: Retorna la lista completa de asignaciones de tareas a estudiantes, opcionalmente filtradas por ID.
   *     tags:
   *       - Tarea_Estudiante
   *     parameters:
   *       - in: query
   *         name: id
   *         schema:
   *           type: string
   *         required: false
   *         description: ID de la asignación para filtrar
   *     responses:
   *       200:
   *         description: Lista de asignaciones obtenida correctamente
   *       500:
   *         description: Error al obtener las asignaciones
   */
  router.get("/", tarea_estudiante.findAll);

  /**
   * @swagger
   * /api/tarea_estudiante/{id}:
   *   get:
   *     summary: Obtiene una asignación específica por ID
   *     description: Busca una relación entre tarea y estudiante por su identificador.
   *     tags:
   *       - Tarea_Estudiante
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID de la asignación tarea-estudiante
   *     responses:
   *       200:
   *         description: Asignación encontrada
   *       404:
   *         description: Asignación no encontrada
   *       500:
   *         description: Error al buscar la asignación
   */
  router.get("/:id", tarea_estudiante.findOne);

  /**
 * @swagger
 * /api/tarea_estudiante/encontrarTareaEstudiante/{carnet_estudiante}/{id_tarea}:
 *   get:
 *     summary: Obtiene la tarea de un estudiante específico
 *     description: Busca una tarea asignada a un estudiante utilizando el carnet del estudiante y el ID de la tarea.
 *     tags:
 *       - Tarea_Estudiante
 *     parameters:
 *       - name: carnet_estudiante
 *         in: path
 *         required: true
 *         description: Carnet del estudiante a consultar
 *         schema:
 *           type: string
 *           example: "E-2025-100"
 *       - name: id_tarea
 *         in: path
 *         required: true
 *         description: ID de la tarea a buscar
 *         schema:
 *           type: integer
 *           example: 12
 *     responses:
 *       200:
 *         description: Tarea encontrada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarea encontrada."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 34
 *                     direccion_archivo:
 *                       type: string
 *                       example: "/uploads/tarea1.pdf"
 *                     estado:
 *                       type: string
 *                       example: "entregado"
 *                     id_tarea:
 *                       type: integer
 *                       example: 12
 *                     id_estudiante:
 *                       type: integer
 *                       example: 8
 *       400:
 *         description: Faltan parámetros requeridos (carnet_estudiante o id_tarea).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Debe proporcionar carnet_estudiante y id_tarea."
 *       404:
 *         description: Estudiante o tarea no encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontró la tarea asignada a este estudiante."
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al buscar la tarea del estudiante."
 */
router.get("/encontrarTareaEstudiante/:carnet_estudiante/:id_tarea", tarea_estudiante.findByCarnetAndTarea);


  /**
   * @swagger
   * /api/tarea_estudiante/update/{id}:
   *   put:
   *     summary: Actualiza una asignación tarea-estudiante
   *     description: Permite modificar la tarea asignada o reasignar la tarea a otro estudiante mediante su carnet.
   *     tags:
   *       - Tarea_Estudiante
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID de la asignación tarea-estudiante
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               direccion_archivo:
   *                 type: string
   *                 example: "/uploads/tarea1.pdf"
   *               punteo:
   *                 type: integer
   *                 example: 10
   *               carnet_estudiante:
   *                 type: string
   *                 example: "E-2025-101"
   *               id_tarea:
   *                 type: integer
   *                 example: 15
   *     responses:
   *       200:
   *         description: Asignación actualizada exitosamente
   *       400:
   *         description: No se enviaron campos para actualizar
   *       404:
   *         description: Asignación o estudiante no encontrado
   *       500:
   *         description: Error al actualizar la asignación
   */
  router.put("/update/:id", tarea_estudiante.update);

  /**
   * @swagger
   * /api/tarea_estudiante/delete/{id}:
   *   delete:
   *     summary: Elimina una asignación tarea-estudiante
   *     description: Elimina una relación específica entre tarea y estudiante.
   *     tags:
   *       - Tarea_Estudiante
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID de la asignación tarea-estudiante
   *     responses:
   *       200:
   *         description: Asignación eliminada exitosamente
   *       404:
   *         description: Asignación no encontrada
   *       500:
   *         description: Error al eliminar la asignación
   */
  router.delete("/delete/:id", tarea_estudiante.delete);

  // Registrar las rutas base
  app.use("/api/tarea_estudiante", router);
};
