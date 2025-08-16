module.exports = app => {
    const estudiante = require("../controllers/estudiante.controller.js");
    var router = require("express").Router();
   //Nuevo Estudiante
    router.post("/create/", estudiante.create);
    //Obtener todos los estudiantes
    router.get("/", estudiante.getAll);
    //Obtener por primer nombre estudiante
    router.get("/", estudiante.getByName);
    //Actualizar estudiante
    router.put("/update/:id", estudiante.update);
    //Eliminar estudiante
    router.delete("/delete/:id", estudiante.delete);
    app.use("/api/estudiante", router);
};