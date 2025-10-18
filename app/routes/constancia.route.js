module.exports = app => {
  const constancia = require("../controllers/constancia.controller.js");
  const router = require("express").Router();

  // Crear constancia
  router.post("/create", constancia.create);

  // Obtener todas las constancias
  router.get("/all", constancia.getAll);

  // Obtener constancia por ID
  router.get("/id/:id", constancia.getById);

  // Actualizar constancia
  router.put("/update/:id", constancia.update);

  // Eliminar constancia
  router.delete("/delete/:id", constancia.delete);

  app.use("/api/constancia", router);
};

module.exports = app => {
  const constancia = require("../controllers/constancia.controller.js");
  const router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: Constancia
   *   description: Servicios relacionados con constancias de pago
   */

  /**
   * @swagger
   * /api/constancia/create:
   *   post:
   *     summary: Crear nueva constancia desde factura
   *     tags: [Constancia]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id_factura:
   *                 type: integer
   *               detalle:
   *                 type: string
   *     responses:
   *       200:
   *         description: Constancia creada correctamente
   */
  router.post("/create", constancia.create);

  /**
   * @swagger
   * /api/constancia/all:
   *   get:
   *     summary: Obtener todas las constancias
   *     tags: [Constancia]
   *     responses:
   *       200:
   *         description: Listado completo de constancias
   */
  router.get("/all", constancia.getAll);

  /**
   * @swagger
   * /api/constancia/id/{id}:
   *   get:
   *     summary: Obtener constancia por ID
   *     tags: [Constancia]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Constancia encontrada
   *       404:
   *         description: Constancia no encontrada
   */
  router.get("/id/:id", constancia.getById);

  /**
 * @swagger
 * /api/constancia/update/{id}:
 *   put:
 *     summary: Actualizar constancia por ID
 *     tags: [Constancia]
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
 *               detalle:
 *                 type: string
 *     responses:
 *       200:
 *         description: Constancia actualizada correctamente
 *       404:
 *         description: Constancia no encontrada
 */
router.put("/update/:id", constancia.update);

  /**
   * @swagger
   * /api/constancia/delete/{id}:
   *   delete:
   *     summary: Eliminar constancia por ID
   *     tags: [Constancia]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Constancia eliminada correctamente
   *       404:
   *         description: Constancia no encontrada
   */
  router.delete("/delete/:id", constancia.delete);

  app.use("/api/constancia", router);
};
