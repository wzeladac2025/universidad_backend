module.exports = app => {
    const horario = require("../controllers/horario.controller.js");
    var router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: Horario
   *   description: Endpoints para gestionar los horarios de los cursos
   */

  /**
   * @swagger
   * /api/horario/create:
   *   post:
   *     summary: Crear un nuevo horario para un curso
   *     tags: [Horario]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - dia_semana
   *               - hora_inicio
   *               - hora_fin
   *               - aula
   *               - periodo
   *             properties:
   *               dia_semana:
   *                 type: string
   *                 example: "Lunes"
   *               hora_inicio:
   *                 type: string
   *                 format: time
   *                 example: "08:00"
   *               hora_fin:
   *                 type: string
   *                 format: time
   *                 example: "10:00"
   *               aula:
   *                 type: string
   *                 example: "A-201"
   *               periodo:
   *                 type: string
   *                 example: "2025-1"
   *               nombre_materia:
   *                 type: string
   *                 example: "Matemática I"
   *     responses:
   *       201:
   *         description: Horario creado correctamente
   *       400:
   *         description: Faltan campos requeridos
   *       404:
   *         description: Curso no encontrado
   *       500:
   *         description: Error interno del servidor
   */
  router.post("/create", horario.create);

  /**
   * @swagger
   * /api/horario:
   *   get:
   *     summary: Obtener todos los horarios registrados
   *     tags: [Horario]
   *     responses:
   *       200:
   *         description: Lista de horarios obtenida correctamente
   *       500:
   *         description: Error al obtener los datos
   */
  router.get("/", horario.findAll);

  /**
   * @swagger
   * /api/horario/{id}:
   *   get:
   *     summary: Obtener un horario por su ID
   *     tags: [Horario]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del horario
   *     responses:
   *       200:
   *         description: Horario encontrado correctamente
   *       400:
   *         description: ID no proporcionado
   *       404:
   *         description: Horario no encontrado
   *       500:
   *         description: Error al buscar el horario
   */
  router.get("/:id", horario.findOne);

  /**
   * @swagger
   * /api/horario/update/{id}:
   *   put:
   *     summary: Actualizar un horario existente
   *     tags: [Horario]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del horario a actualizar
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nombre_curso:
   *                 type: string
   *                 example: "Programación I"
   *               dia_semana:
   *                 type: string
   *                 example: "Martes"
   *               hora_inicio:
   *                 type: string
   *                 format: time
   *                 example: "09:00"
   *               hora_fin:
   *                 type: string
   *                 format: time
   *                 example: "11:00"
   *               aula:
   *                 type: string
   *                 example: "B-103"
   *     responses:
   *       200:
   *         description: Horario actualizado correctamente
   *       400:
   *         description: No se enviaron campos válidos o falta el ID
   *       404:
   *         description: Horario o curso no encontrado
   *       500:
   *         description: Error al actualizar el horario
   */
  router.put("/update/:id", horario.update);

  /**
   * @swagger
   * /api/horario/delete/{id}:
   *   delete:
   *     summary: Eliminar un horario por su ID
   *     tags: [Horario]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del horario a eliminar
   *     responses:
   *       200:
   *         description: Horario eliminado correctamente
   *       400:
   *         description: ID no proporcionado
   *       404:
   *         description: Horario no encontrado
   *       500:
   *         description: Error al eliminar el horario
   */
  router.delete("/delete/:id", horario.delete);

  app.use("/api/horario", router);
};