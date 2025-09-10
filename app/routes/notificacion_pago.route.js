module.exports = app => {
    const Notificacion_pago = require("../controllers/notificacion_pago.controller.js");
    var router = require("express").Router();
    // Create a new notificacion 
    router.post("/create/", Notificacion_pago.create);
    // Retrieve all notificacion
    //router.get("/", Notificacion_pago.findAll);
    // Retrieve a single notificacion with id
    router.get("/:id_notificacion", Notificacion_pago.findOne);
    // Update a notificacion with id
    router.put("/update/:id_notificacion", Notificacion_pago.update);
    // Delete a notificacion with id
    router.delete("/delete/:id_notificacion", Notificacion_pago.delete);
    // Delete all notificacion
    router.delete("/delete/", Notificacion_pago.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/Notificacion_pago", router);
};
