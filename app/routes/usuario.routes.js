module.exports = (app) => {
  const security = require("../config/security.config.js");
  const usuario = require("../controllers/usuario.controller.js");
  var router = require("express").Router();

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
   *                  enum: [estudiante, docente, admin]
   *                nombres:
   *                  type: string
   *                apellidos:
   *                  type: string
   *     responses:
   *       200:
   *         description: Usuario creado
   *       400:
   *         description: Error al crear Usuario
   */
  router.post("/register", usuario.create);

  /**
   * @swagger
   * /api/usuario/login/:
   *   post:
   *     summary: Autenticar Usuario
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
   *     responses:
   *       200:
   *         description: Usuario Autenticado
   *       400:
   *         description: Error al autenticar Usuario
   */
  router.post("/login/", usuario.login);
        // Obtener todos los usuarios (solo admin)
  /**
   * @swagger
   * /api/usuario/estudiantes:
   *   get:
   *     summary: Obtener todos los usuarios (requiere rol admin)
   *     tags: [Usuario]
   *     responses:
   *       200:
   *         description: Lista de usuarios
   *       403:
   *         description: No autorizado
   *       500:
   *         description: Error en el servidor
   */

  router.get("/estudiantes", security.ROLE_ADMIN, usuario.findAllEstudiante);

      // Obtener todos los usuarios (solo admin)
  /**
   * @swagger
   * /api/usuario/docentes:
   *   get:
   *     summary: Obtener todos los usuarios (requiere rol admin)
   *     tags: [Usuario]
   *     responses:
   *       200:
   *         description: Lista de usuarios
   *       403:
   *         description: No autorizado
   *       500:
   *         description: Error en el servidor
   */
  router.get("/docentes", security.ROLE_ADMIN, usuario.findAllDocente);

  /**
   * @swagger
   * /api/usuario/{id}:
   *   get:
   *     summary: Obtener usuario por id
   *     tags: [Usuario]
   *     security:
   *        - bearerAuth: []
   *     parameters:
   *        - in: path
   *          name: id
   *          type: string
   *     responses:
   *       200:
   *         description: Usuario encontrado
   */
  router.get("/:id", security.ROLE_TODOS, usuario.findById);

    // Obtener todos los usuarios (solo admin)
  /**
   * @swagger
   * /api/usuario/:
   *   get:
   *     summary: Obtener todos los usuarios (requiere rol admin)
   *     tags: [Usuario]
   *     responses:
   *       200:
   *         description: Lista de usuarios
   *       403:
   *         description: No autorizado
   *       500:
   *         description: Error en el servidor
   */
  router.get("/", security.ROLE_ADMIN, usuario.findAll);

  app.use("/api/usuario", router);
};