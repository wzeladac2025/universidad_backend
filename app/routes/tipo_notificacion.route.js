module.exports = app => {
    const TipoNotificacion = require("../controllers/tipo_notificacion.controller.js"); // 👈 controlador
    var router = require("express").Router();

    // Crear una nueva notificación
    router.post("/create", TipoNotificacion.create);

    // Obtener una notificación por ID
    router.get("/:id_notificacion", TipoNotificacion.findOne);

    // Actualizar una notificación por ID
    router.put("/update/:id_notificacion", TipoNotificacion.update);

    // Eliminar una notificación por ID
    router.delete("/delete/:id_notificacion", TipoNotificacion.delete);

    // Eliminar todas las notificaciones
    router.delete("/delete", TipoNotificacion.deleteAll);

    // Filtrar notificaciones por estado (?estado=pendiente|enviada|leída)
    router.get("/", TipoNotificacion.findAllByEstado);

    // Prefijo para simplificar URIs
    // Ejemplo: http://localhost:3000/api/tipo_notificacion/
    app.use("/api/tipo_notificacion", router);
};