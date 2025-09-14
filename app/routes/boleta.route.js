module.exports = app => {
  const boleta = require("../controllers/boleta.controller.js");
  const router = require("express").Router();

  // Crear boleta
  router.post("/create", boleta.create);

  // Obtener todas las boletas
  router.get("/all", boleta.getAll);

  // Obtener boleta por ID
  router.get("/id/:id", boleta.getById);

  // Actualizar boleta
  router.put("/update/:id", boleta.update);

  // Eliminar boleta
  router.delete("/delete/:id", boleta.delete);

  app.use("/api/boleta", router);
};

module.exports = app => {
  const boleta = require("../controllers/boleta.controller.js");
  const router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: Boleta
   *   description: Servicios relacionados con boletas de pago
   */

  /**
   * @swagger
   * /api/boleta/create:
   *   post:
   *     summary: Crear nueva boleta
   *     tags: [Boleta]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id_estudiante:
   *                 type: integer
   *               monto:
   *                 type: number
   *               fecha_pago:
   *                 type: string
   *               banco:
   *                 type: string
   *               transaccion:
   *                 type: string
   *               referencia:
   *                 type: string
   *     responses:
   *       200:
   *         description: Boleta creada correctamente
   */
  router.post("/create", boleta.create);

  /**
   * @swagger
   * /api/boleta/all:
   *   get:
   *     summary: Obtener todas las boletas
   *     tags: [Boleta]
   *     responses:
   *       200:
   *         description: Listado completo de boletas
   */
  router.get("/all", boleta.getAll);

  /**
   * @swagger
   * /api/boleta/id/{id}:
   *   get:
   *     summary: Obtener boleta por ID
   *     tags: [Boleta]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Boleta encontrada
   *       404:
   *         description: Boleta no encontrada
   */
  router.get("/id/:id", boleta.getById);

  /**
   * @swagger
   * /api/boleta/update/{id}:
   *   put:
   *     summary: Actualizar boleta por ID
   *     tags: [Boleta]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               monto:
   *                 type: number
   *               estado:
   *                 type: string
   *               referencia:
   *                 type: string
   *     responses:
   *       200:
   *         description: Boleta actualizada correctamente
   *       404:
   *         description: Boleta no encontrada
   */
  router.put("/update/:id", boleta.update);

  /**
   * @swagger
   * /api/boleta/delete/{id}:
   *   delete:
   *     summary: Eliminar boleta por ID
   *     tags: [Boleta]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Boleta eliminada correctamente
   *       404:
   *         description: Boleta no encontrada
   */
  router.delete("/delete/:id", boleta.delete);

  app.use("/api/boleta", router);
};
