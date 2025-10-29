module.exports = (app) => {
  const security = require("../config/security.config.js");
  const curso = require("../controllers/curso.controller.js");
  var router = require("express").Router();

  /**
   * @swagger
   * /api/curso/register/:
   *   post:
   *     summary: Crear curso
   *     tags: [Curso]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                id_materia:
   *                  type: number
   *                id_curso:
   *                  type: number
   *                nombre:
   *                  type: string
   *                hora_inicio:
   *                  type: string
   *                  format: time
   *                hora_fin:
   *                  type: string
   *                  format: time
   *                duracion:
   *                  type: number
   *                seccion:
   *                  type: string
   *                cupo:
   *                  type: number
   *     responses:
   *       200:
   *         description: Curso creado
   *       400:
   *         description: Error al crear Curso
   */
  router.post("/register/", security.ROLE_ADMIN, curso.create);

  /**
   * @swagger
   * /api/curso/{id}:
   *   get:
   *     summary: Obtener curso por id
   *     tags: [Curso]
   *     security:
   *        - bearerAuth: []
   *     parameters:
   *        - in: path
   *          name: id
   *          type: string
   *     responses:
   *       200:
   *         description: Curso encontrado
   */
  router.get("/:id", security.ROLE_TODOS, curso.findById);

  /**
   * @swagger
   * /api/curso/:
   *   get:
   *     summary: Obtener cursos
   *     tags: [Curso]
   *     security:
   *        - bearerAuth: []
   *     responses:
   *       200:
   *         description: Cursos encontradas
   */
  router.get("/", security.ROLE_TODOS, curso.findAll);

  /**
   * @swagger
   * /api/curso/update/{id}:
   *   put:
   *     summary: Actualizar curso por id
   *     tags: [Curso]
   *     security:
   *        - bearerAuth: []
   *     parameters:
   *        - in: path
   *          name: id
   *          type: string
   *     description: Actualizar curso por id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                id_materia:
   *                  type: number
   *                id_curso:
   *                  type: number
   *                nombre:
   *                  type: string
   *                hora_inicio:
   *                  type: string
   *                  format: time
   *                hora_fin:
   *                  type: string
   *                  format: time
   *                duracion:
   *                  type: number
   *                seccion:
   *                  type: string
   *                cupo:
   *                  type: number
   *     responses:
   *       200:
   *         description: Curso actualizado
   */
  router.put("/update/:id", security.ROLE_TODOS, curso.update);

  app.use("/api/curso", router);
};
