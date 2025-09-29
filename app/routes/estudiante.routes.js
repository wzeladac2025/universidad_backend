module.exports = (app) => {
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
   *                DIP:
   *                  type: int
   *                nombre:
   *                  type: string
   *                apellido:
   *                  type: string
   *                fechaNacimiento:
   *                  type: date
   *                genero:
   *                  type: char(1)
   *                id_usuario:
   *                  type: int
   *     responses:
   *       200:
   *         description: Estudiante creado
   *       400:
   *         description: Error al crear estudiante
   */
  router.post("/create/", estudiante.create);

  //Obtener todos los estudiantes
  /**
   * @swagger
   * /api/estudiante/:
   *   get:
   *     summary: Obtener estudiantes
   *     tags: [Estudiante]
   *     description: Obtener todos los estudiantes
   *     responses:
   *       200:
   *         description: Listado de estudiantes
   */
  router.get("/", estudiante.getAll);

  //Obtener estudiante por carnet
  /**
   * @swagger
   * /api/estudiante/{carnet}:
   *   get:
   *     summary: Obtener estudiante por carnet
   *     tags: [Estudiante]
   *     parameters:
   *        - in: path
   *          name: carnet
   *          type: string
   *     description: Obtener estudiante por carnet
   *     responses:
   *       200:
   *         description: Estudiante encontrado
   */
  //Obtener por id estudiante
  router.get("/:carnet", estudiante.getByCarnet);

  //Actualizar estudiante
  /**
   * @swagger
   * /api/estudiante/update/{carnet}:
   *   put:
   *     summary: Actualizar estudiante por carnet
   *     tags: [Estudiante]
   *     parameters:
   *        - in: path
   *          name: carnet
   *          type: string
   *     description: Obtener estudiante por carnet
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                DIP:
   *                  type: int
   *                nombre:
   *                  type: string
   *                apellido:
   *                  type: string
   *                fechaNacimiento:
   *                  type: date
   *                genero:
   *                  type: char(1)
   *                id_usuario:
   *                  type: int
   *     responses:
   *       200:
   *         description: Estudiante actualizado
   */
  router.put("/update/:carnet", estudiante.update);

  //Eliminar estudiante
  /**
   * @swagger
   * /api/estudiante/delete/{carnet}:
   *   delete:
   *     summary: Eliminar estudiante por carnet
   *     tags: [Estudiante]
   *     parameters:
   *        - in: path
   *          name: carnet
   *          type: string
   *     description: Obtener estudiante por carnet
   *     responses:
   *       200:
   *         description: Estudiante encontrado
   */
  router.delete("/delete/:id", estudiante.delete);

  app.use("/api/estudiante", router);
};
