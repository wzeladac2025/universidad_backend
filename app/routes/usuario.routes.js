module.exports = (app) => {
  const Verificador = require("../middlewares/autorizacion.middleware.js");
  const soloadmin = Verificador(["admin"]);

  const usuario = require("../controllers/usuario.controller.js");
  var router = require("express").Router();
  //Nuevo Usuario
  /**
   * @swagger
   * /api/usuario/register/:
   *   post:
   *     summary: Crear usuario
   *     tags: [Usuario]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                correo:
   *                  type: string
   *                contrasena:
   *                  type: string
   *                role:
   *                  type: string
   *                primerNombre:
   *                  type: string
   *                segundoNombre:
   *                  type: string
   *                primerApellido:
   *                  type: string
   *                segundoApellido:
   *                  type: string
   *     responses:
   *       200:
   *         description: Usuario creado
   *       400:
   *         description: Error al crear Usuario
   */
  router.post("/register/", usuario.create);

  router.get("/", soloadmin, usuario.findAll);

  router.get("/status", soloadmin, usuario.findAllStatus);

  router.get("/login", usuario.findOne);

  router.put("/update/:id", soloadmin, usuario.update);

  router.delete("/delete/:id", Verificador(["admin"]), usuario.delete);

  router.delete("/delete/", Verificador(["admin"]), usuario.deleteAll);

  app.use("/api/usuario", router);
};
