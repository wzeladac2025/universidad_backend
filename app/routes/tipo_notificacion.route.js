module.exports = app => {
    const TipoNotificacion = require("../controllers/tipo_notificacion.controller.js"); // 👈 controlador
    var router = require("express").Router();

    // Crear una nueva notificación
 // Crear una nueva notificación
   /**
     * @swagger
     * /api/tipo_notificacion/create:
     *   post:
     *     summary: Crea una nueva notificación
     *     description: Inserta una nueva notificación en la base de datos.
     *     tags:
     *       - Notificacion
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - tipo_notificacion
     *               - titulo
     *               - mensaje
     *             properties:
     *               tipo_notificacion:
     *                 type: string
     *                 enum: [EVALUACION, TAREA, NOTA, AVISO]
     *                 example: "AVISO"
     *               titulo:
     *                 type: string
     *                 example: "Entrega de proyecto final"
     *               mensaje:
     *                 type: string
     *                 example: "El proyecto final debe entregarse antes del viernes"
     *               fecha_envio:
     *                 type: string
     *                 format: date-time
     *                 example: "2025-10-02T15:00:00Z"
     *               estado_notificacion:
     *                 type: string
     *                 enum: [pendiente, enviada, leída]
     *                 example: "pendiente"
     *               correo:
     *                 type: string
     *                 example: "usuario@correo.com"
     *               prioridad:
     *                 type: string
     *                 enum: [alta, media, baja]
     *                 example: "media"
     *     responses:
     *       201:
     *         description: Notificación creada exitosamente
     *       400:
     *         description: Datos incompletos o inválidos
     *       500:
     *         description: Error en el servidor
     */
    router.post("/create", TipoNotificacion.create);

    // Obtener una notificación por ID
/**
 * @swagger
 * /api/tipo_notificacion/{id_notificacion}:
 *   get:
 *     summary: Obtiene una notificacion de pago por id_notificacion
 *     tags:
 *       - Notificacion
 *     parameters:
 *       - in: path
 *         name: id_notificacion
 *         required: true
 *         schema:
 *           type: integer
 *         description: id_notificacion de notificacion a obtener 
 *     responses:
 *       200:
 *         description: notificacion encontrada
 *       404:
 *         description: notificacion no encontrada
 *       500:
 *         description: Error en el servidor
 */    
    router.get("/:id_notificacion", TipoNotificacion.findOne);

 // Actualizar una notificación por ID
/**
 * @swagger
 * /api/tipo_notificacion/update/{id_notificacion}:
 *   put:
 *     summary: Actualiza una notificación por ID
 *     tags:
 *       - Notificacion
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
 *               tipo_notificacion:
 *                 type: string
 *                 enum: [EVALUACION, TAREA, NOTA, AVISO]
 *                 example: "AVISO"
 *               titulo:
 *                 type: string
 *                 example: "Entrega de proyecto final"
 *               mensaje:
 *                 type: string
 *                 example: "El proyecto final debe entregarse antes del viernes"
 *               fecha_envio:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-02T15:00:00Z"
 *               estado_notificacion:
 *                 type: string
 *                 enum: [pendiente, enviada, leIda]
 *                 example: "pendiente"
 *               correo:
 *                 type: string
 *                 example: "usuario@correo.com"
 *               prioridad:
 *                 type: string
 *                 enum: [alta, media, baja]
 *                 example: "media"
 *     responses:
 *       200:
 *         description: Notificación actualizada exitosamente
 *       404:
 *         description: Notificación no encontrada
 *       500:
 *         description: Error al actualizar la notificación
 */
router.put("/update/:id_notificacion", TipoNotificacion.update);

    // Eliminar una notificación por ID
        /**
 * @swagger
 * /api/tipo_notificacion/delete/{id_notificacion}:
 *   delete:
 *     summary: Elimina una notificación por ID
 *     tags:
 *       -  Notificacion
 *     parameters:
 *       - in: path
 *         name: id_notificacion
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la notificación
 *     responses:
 *       200:
 *         description: Notificación eliminada exitosamente
 *       404:
 *         description: Notificación no encontrada
 *       500:
 *         description: Error al eliminar la notificación
 */
    router.delete("/delete/:id_notificacion", TipoNotificacion.delete);

    // Eliminar todas las notificaciones
    /**
 * @swagger
 * /api/tipo_notificacion/delete:
 *   delete:
 *     summary: Elimina todas las notificaciones
 *     tags:
 *       - Notificacion
 *     responses:
 *       200:
 *         description: Todas las notificaciones fueron eliminadas
 *       500:
 *         description: Error en el servidor al eliminar las notificaciones
 */
    router.delete("/delete", TipoNotificacion.deleteAll);


    // Filtrar notificaciones por estado (?estado=pendiente|enviada|leída)
       /**
 * @swagger
 * /api/tipo_notificacion:
 *   get:
 *     summary: Obtiene todas las notificaciones
 *     description: Retorna la lista de notificaciones, opcionalmente filtrados por id_notificacion.
 *     tags:
 *       - Notificacion
 *     parameters:
 *       - in: query
 *         name: estado_notificacion
 *         schema:
 *           type: string
 *         required: false
 *         description: Estado de notificacion por filtrar
 *     responses:
 *       200:
 *         description: Lista de notificaciones
 *       500:
 *         description: Error al obtener los notificaciones
 */
    router.get("/", TipoNotificacion.findAllByEstado);

    // Prefijo para simplificar URIs
    // Ejemplo: http://localhost:3000/api/tipo_notificacion/
    app.use("/api/tipo_notificacion", router);
};

