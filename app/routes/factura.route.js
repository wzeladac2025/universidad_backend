module.exports = app => {
  const factura = require("../controllers/factura.controller.js");
  const router = require("express").Router();

  router.post("/create", factura.create);
  router.get("/all", factura.getAll);
  router.get("/id/:id", factura.getById);
  router.get("/numero/:numero", factura.getByNumero);
  router.put("/update/:id", factura.update);
  router.delete("/delete/:id", factura.delete);
  
  app.use("/api/factura", router);
};

module.exports = app => {
  const factura = require("../controllers/factura.controller.js");
  const router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: Factura
   *   description: Servicios relacionados con facturación
   */

  /**
   * @swagger
   * /api/factura/create:
   *   post:
   *     summary: Crear nueva factura
   *     tags: [Factura]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id_boleta:
   *                 type: integer
   *               numero_factura:
   *                 type: string
   *               total:
   *                 type: number
   *               detalle:
   *                 type: string
   *     responses:
   *       200:
   *         description: Factura creada correctamente
   */
  router.post("/create", factura.create);

  /**
   * @swagger
   * /api/factura/all:
   *   get:
   *     summary: Obtener todas las facturas
   *     tags: [Factura]
   *     responses:
   *       200:
   *         description: Listado completo de facturas
   */
  router.get("/all", factura.getAll);

  /**
   * @swagger
   * /api/factura/id/{id}:
   *   get:
   *     summary: Obtener factura por ID
   *     tags: [Factura]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Factura encontrada
   *       404:
   *         description: Factura no encontrada
   */
  router.get("/id/:id", factura.getById);

  /**
   * @swagger
   * /api/factura/numero/{numero}:
   *   get:
   *     summary: Buscar factura por número
   *     tags: [Factura]
   *     parameters:
   *       - in: path
   *         name: numero
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Factura encontrada por número
   *       404:
   *         description: No se encontró factura con ese número
   */
  router.get("/numero/:numero", factura.getByNumero);

  /**
   * @swagger
   * /api/factura/update/{id}:
   *   put:
   *     summary: Actualizar factura por ID
   *     tags: [Factura]
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
   *               total:
   *                 type: number
   *               detalle:
   *                 type: string
   *     responses:
   *       200:
   *         description: Factura actualizada correctamente
   *       404:
   *         description: Factura no encontrada
   */
  router.put("/update/:id", factura.update);

  /**
   * @swagger
   * /api/factura/delete/{id}:
   *   delete:
   *     summary: Eliminar factura por ID
   *     tags: [Factura]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Factura eliminada correctamente
   *       404:
   *         description: Factura no encontrada
   */
  router.delete("/delete/:id", factura.delete);

  app.use("/api/factura", router);
};
