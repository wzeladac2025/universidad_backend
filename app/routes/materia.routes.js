module.exports = (app) => {
  const security = require("../config/security.config.js");
  const materia = require("../controllers/materia.controller.js");
  var router = require("express").Router();

  /**
   * @swagger
   * /api/materia/register/:
   *   post:
   *     summary: Crear materia
   *     tags: [Materia]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                id_carrera:
   *                  type: number
   *                nombre:
   *                  type: string
   *                credito:
   *                  type: number
   *                semestre:
   *                  type: string
   *                obligatoriedad:
   *                  type: boolean
   *     responses:
   *       200:
   *         description: Materia creado
   *       400:
   *         description: Error al crear Materia
   */
  router.post("/register/", security.ROLE_ADMIN, materia.create);

  /**
   * @swagger
   * /api/materia/{id}:
   *   get:
   *     summary: Obtener materia por id
   *     tags: [Materia]
   *     security:
   *        - bearerAuth: []
   *     parameters:
   *        - in: path
   *          name: id
   *          type: string
   *     responses:
   *       200:
   *         description: Materia encontrado
   */
  router.get("/:id", security.ROLE_TODOS, materia.findById);

  /**
   * @swagger
   * /api/materia/:
   *   get:
   *     summary: Obtener materias
   *     tags: [Materia]
   *     security:
   *        - bearerAuth: []
   *     responses:
   *       200:
   *         description: Materias encontradas
   */
  router.get("/", security.ROLE_TODOS, materia.findAll);

  /**
   * @swagger
   * /api/materia/update/{id}:
   *   put:
   *     summary: Actualizar materia por id
   *     tags: [Materia]
   *     security:
   *        - bearerAuth: []
   *     parameters:
   *        - in: path
   *          name: id
   *          type: string
   *     description: Actualizar materia por id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                id_carrera:
   *                  type: number
   *                nombre:
   *                  type: string
   *                credito:
   *                  type: number
   *                semestre:
   *                  type: string
   *                obligatoriedad:
   *                  type: boolean
   *     responses:
   *       200:
   *         description: Materia actualizado
   */
  router.put("/update/:id", security.ROLE_TODOS, materia.update);

  app.use("/api/materia", router);
};
