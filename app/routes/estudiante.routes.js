module.exports = app => {
    const Verificador = require("../middlewares/autorizacion.middleware.js")
    const soloadmin = Verificador(["admin"])
    const soloEstudiante = Verificador(["estudiante"])

    const estudiante = require("../controllers/estudiante.controller.js");
    var router = require("express").Router();
   //Nuevo Estudiante
  /**
   * @swagger
   * /api/estudiante/create/:
   *   post:
   *     summary: Crear estudiante
   *     tags: [Estudiante]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                primer_nombre:
   *                  type: string
   *                segundo_nombre:
   *                  type: string
   *                primer_apellido:
   *                  type: string
   *     responses:
   *       200:
   *         description: Estudiante creado
   *       400:
   *         description: Error al crear estudiante
   */
    router.post("/create/", soloEstudiante, estudiante.create);
    //Obtener todos los estudiantes
    router.get("/all/", soloadmin, estudiante.getAll);
    //Obtener por primer nombre estudiante
    router.get("/:carnet", estudiante.getByCarnet);
    //Actualizar estudiante
    router.put("/update/:carnet", soloEstudiante, estudiante.update);
    //Eliminar estudiante
    router.delete("/delete/:carnet", soloadmin, estudiante.delete);
    //probar carnets generados
    router.get("/testCarnet/", estudiante.testCarnet);
    
    app.use("/api/estudiante", router);
};