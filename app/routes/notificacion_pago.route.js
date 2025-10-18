module.exports = app => {
    const Notificacion_pago = require("../controllers/notificacion_pago.controller.js");
    var router = require("express").Router();

   // Crear una nueva notificación
   /**
     * @swagger
     * /api/Notificacion_pago/create:
     *   post:
     *     summary: Crea una nueva notificación
     *     description: Registra una nueva notificación en la base de datos.
     *     tags:
     *       - Notificacion_PAGO
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - id_usuario
     *               - correo
     *               - mensaje
     *             properties:
     *               id_usuario:
     *                 type: integer
     *                 example: 1
     *               correo:
     *                 type: string
     *                 example: "usuario@correo.com"
     *               mensaje:
     *                 type: string
     *                 example: "Su pago se ha procesado correctamente."
     *               fecha_envio:
     *                 type: string
     *                 format: date-time
     *               estado_notificacion:
     *                 type: string
     *                 enum: [pendiente, enviada, leída]
     *     responses:
     *       201:
     *         description: Notificación creada exitosamente
     *       400:
     *         description: Datos incompletos o inválidos
     *       500:
     *         description: Error en el servidor
     */
    router.post("/create/", Notificacion_pago.create);


    // Retrieve a single notificacion with id
/**
 * @swagger
 * /api/Notificacion_pago/{id_notificacion}:
 *   get:
 *     summary: Obtiene una notificacion de pago por id_notificacion
 *     tags:
 *       - Notificacion_PAGO
 *     parameters:
 *       - in: path
 *         name: id_notificacion
 *         required: true
 *         schema:
 *           type: integer
 *         description: id_notificacion de pago
 *     responses:
 *       200:
 *         description: notificacion encontrada
 *       404:
 *         description: notificacion no encontrada
 *       500:
 *         description: Error en el servidor
 */
    router.get("/:id_notificacion", Notificacion_pago.findOne);

    // Update a notificacion with id
 /**
 * @swagger
 * /api/Notificacion_pago/update/{id_notificacion}:
 *   put:
 *     summary: Actualiza una notificación por ID
 *     tags:
 *       - Notificacion_PAGO
 *     parameters:
 *       - in: path
 *         name: id_notificacion
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la notificación a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 * 
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *               correo:
 *                 type: string
 *                 example: "usuario@correo.com"
 *               mensaje:
 *                 type: string
 *                 example: "Su pago se ha procesado correctamente."
 *               fecha_envio:
 *                 type: string
 *                 format: date-time
 *               estado_notificacion:
 *                 type: string
 *                 enum: [pendiente, enviada, leída]
 *       200:
 *         description: notificacion encontrada
 *       404:
 *         description: notificacion no encontrada
 *       500:
 *         description: Error en el servidor
 */
    router.put("/update/:id_notificacion", Notificacion_pago.update);


    // Delete a notificacion with id
    /**
 * @swagger
 * /api/Notificacion_pago/delete/{id_notificacion}:
 *   delete:
 *     summary: Elimina una notificacion por id_notificacion
 *     tags:
 *       - Notificacion_PAGO
 *     parameters:
 *       - in: path
 *         name: id_notificacion
 *         required: true
 *         schema:
 *           type: integer
 *         description: id_notificacion de pago
 *     responses:
 *       200:
 *         description: notificacion encontrada
 *       404:
 *         description: notificacion no encontrada
 *       500:
 *         description: Error en el servidor
 */
    router.delete("/delete/:id_notificacion", Notificacion_pago.delete);
    
    // Delete all notificacion
  /**
 * @swagger
 * /api/Notificacion_pago/delete:
 *   delete:
 *     summary: Elimina todas las notificaciones de pagos
 *     tags:
 *       - Notificacion_PAGO
 *     responses:
 *       200:
 *         description: Todas las notificaciones fueron eliminadas
 *       500:
 *         description: Error en el servidor al eliminar las notificaciones
 */
    router.delete("/delete/", Notificacion_pago.deleteAll);


    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/Notificacion_pago", router);
};
