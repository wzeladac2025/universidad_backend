module.exports = (app) => {
  const security = require("../config/security.config.js");
  const carrera = require("../controllers/carrera.controller.js");
  var router = require("express").Router();

  /**
   * @swagger
   * /api/carrera/register/:
   *   post:
   *     summary: Crear carrera
   *     tags: [Carrera]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                facultad:
   *                  type: string
   *                nombre:
   *                  type: string
   *                duracion:
   *                  type: number
   *     responses:
   *       200:
   *         description: Carrera creado
   *       400:
   *         description: Error al crear Carrera
   */
  router.post("/register/", security.ROLE_ADMIN, carrera.create);

  /**
   * @swagger
   * /api/carrera/{id}:
   *   get:
   *     summary: Obtener carrera por id
   *     tags: [Carrera]
   *     security:
   *        - bearerAuth: []
   *     parameters:
   *        - in: path
   *          name: id
   *          type: string
   *     responses:
   *       200:
   *         description: Carrera encontrado
   */
  router.get("/:id", security.ROLE_TODOS, carrera.findById);

  /**
   * @swagger
   * /api/carrera/:
   *   get:
   *     summary: Obtener carreras
   *     tags: [Carrera]
   *     security:
   *        - bearerAuth: []
   *     responses:
   *       200:
   *         description: Carreras encontradas
   */
  router.get("/", security.ROLE_TODOS, carrera.findAll);

  /**
   * @swagger
   * /api/carrera/update/{id}:
   *   put:
   *     summary: Actualizar carrera por id
   *     tags: [Carrera]
   *     security:
   *        - bearerAuth: []
   *     parameters:
   *        - in: path
   *          name: id
   *          type: string
   *     description: Actualizar carrera por id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                facultad:
   *                  type: string
   *                nombre:
   *                  type: string
   *                duracion:
   *                  type: number
   *     responses:
   *       200:
   *         description: Carrera actualizado
   */
  router.put("/update/:id", security.ROLE_TODOS, carrera.update);

  app.use("/api/carrera", router);
};