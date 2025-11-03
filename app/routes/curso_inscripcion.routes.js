module.exports = app => {
    const curso = require("../controllers/curso_inscripcion.controller.js");
    var router = require("express").Router();
    // Create a new Client
/**
 * @swagger
 * /api/inscripcion/create:
 *   post:
 *     summary: Crear una nueva inscripción a curso
 *     tags: [inscripcion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_materia:
 *                 type: string
 *                 example: "Matemática I"
 *               periodo:
 *                 type: string
 *                 example: "2025-1"
 *               carnet_estudiante:
 *                 type: string
 *                 example: "E2025001"
 *               estado:
 *                 type: boolean
 *                 example: "true"
 *     responses:
 *       201:
 *         description: Inscripción creada correctamente
 *       400:
 *         description: Faltan campos requeridos
 *       404:
 *         description: Estudiante o curso no encontrado
 */

    router.post("/create/", curso.create);

    /**
 * @swagger
 * /api/inscripcion/siguiente_semestre:
 *   post:
 *     summary: Obtiene los cursos del siguiente semestre para un estudiante.
 *     description: >
 *       Este endpoint determina el siguiente semestre pendiente de un estudiante y retorna los cursos disponibles de dicho semestre.  
 *       Si el estudiante ya completó todas las materias, devolverá un mensaje indicándolo.
 *     tags:
 *       - inscripcion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - carnet_estudiante
 *               - nombre_carrera
 *             properties:
 *               carnet_estudiante:
 *                 type: string
 *                 example: "E20230045"
 *                 description: Carnet único del estudiante.
 *               nombre_carrera:
 *                 type: string
 *                 example: "Ingeniería en Sistemas"
 *                 description: Nombre de la carrera del estudiante.
 *     responses:
 *       200:
 *         description: Cursos del siguiente semestre obtenidos exitosamente o mensaje indicando que ya completó todas las materias.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cursos del siguiente semestre obtenidos exitosamente."
 *                 siguiente_semestre:
 *                   type: integer
 *                   example: 4
 *                   nullable: true
 *                 cursos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_curso:
 *                         type: integer
 *                         example: 12
 *                       nombre_materia:
 *                         type: string
 *                         example: "Estructura de Datos"
 *                       seccion:
 *                         type: string
 *                         example: "A"
 *                       periodo:
 *                         type: string
 *                         example: "2025-1"
 *                       cupo_maximo:
 *                         type: integer
 *                         example: 35
 *       400:
 *         description: Faltan campos requeridos en la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Faltan campos requeridos: carnet_estudiante, nombre_carrera"
 *                 details:
 *                   type: object
 *                   properties:
 *                     carnet_estudiante:
 *                       type: string
 *                       example: "no enviado"
 *                     nombre_carrera:
 *                       type: string
 *                       example: "Ingeniería en Sistemas"
 *       404:
 *         description: Carrera no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Carrera no encontrada."
 *       500:
 *         description: Error interno al obtener los cursos del siguiente semestre.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al obtener los cursos del siguiente semestre."
 *                 error:
 *                   type: string
 *                   example: "Error de conexión con la base de datos."
 */


    router.post("/siguiente_semestre", curso.obtenerCursosSiguienteSemestre);
// Retrieve all Inscripciones
/**
 * @swagger
 * /api/inscripcion:
 *   get:
 *     summary: Obtener todas las inscripciones
 *     tags: [inscripcion]
 *     parameters:
 *       - in: query
 *         name: id_curso
 *         schema:
 *           type: integer
 *         required: false
 *         description: Filtrar las inscripciones por el ID del curso (opcional)
 *     responses:
 *       200:
 *         description: Lista de inscripciones encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la inscripción
 *                   estado:
 *                     type: string
 *                   fecha_inscripcion:
 *                     type: string
 *                     format: date-time
 *                   curso:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       id_materia:
 *                         type: integer
 *                       periodo:
 *                         type: string
 *                   estudiante:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       carnet:
 *                         type: string
 *       500:
 *         description: Error interno del servidor
 */
    router.get("/", curso.findAll);

    // Retrieve all cursos de un estudiante por carnet
/**
 * @swagger
 * /api/inscripcion/estudiante/{carnet}:
 *   get:
 *     summary: Obtener todos los cursos en los que un estudiante está inscrito
 *     tags: [inscripcion]
 *     parameters:
 *       - in: path
 *         name: carnet
 *         required: true
 *         schema:
 *           type: string
 *         description: Carnet del estudiante (por ejemplo, E2024-001)
 *     responses:
 *       200:
 *         description: Lista de cursos en los que el estudiante está inscrito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la inscripción
 *                   estado:
 *                     type: boolean
 *                     description: Estado de la inscripción
 *                   fecha_inscripcion:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de la inscripción
 *                   curso:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID del curso
 *                       id_materia:
 *                         type: integer
 *                         description: ID de la materia asociada
 *                       periodo:
 *                         type: string
 *                         description: Periodo del curso
 *                   estudiante:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID del estudiante
 *                       carnet:
 *                         type: string
 *                         description: Carnet del estudiante
 *       400:
 *         description: No se proporcionó un carnet válido
 *       404:
 *         description: No se encontró el estudiante o no tiene cursos inscritos
 *       500:
 *         description: Error interno del servidor
 */
router.get("/estudiante/:carnet", curso.findbyEstudiante);

    // Retrieve a single Client with id
/**
 * @swagger
 * /api/inscripcion/{id}:
 *   get:
 *     summary: Obtener una inscripción por id
 *     tags: [inscripcion]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inscripción encontrada
 *       404:
 *         description: No encontrada
 */
    router.get("/:id", curso.findOne);
    // Update a Client with id
/**
 * @swagger
 * /api/inscripcion/update/{id}:
 *   put:
 *     summary: Actualizar inscripción de curso
 *     tags: [inscripcion]
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
 *               nombre_materia:
 *                 type: string
 *               periodo:
 *                 type: string
 *               carnet_estudiante:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inscripción actualizada correctamente
 *       400:
 *         description: No se enviaron campos para actualizar
 *       404:
 *         description: No se encontró la inscripción
 */
    router.put("/update/:id", curso.update);
    // Delete a Client with id df
/**
 * @swagger
 * /api/inscripcion/delete/{id}:
 *   delete:
 *     summary: Eliminar una inscripción por id
 *     tags: [inscripcion]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inscripción eliminada correctamente
 *       404:
 *         description: No encontrada
 */

    router.delete("/delete/:id", curso.delete);
    // Delete all Cliente
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/inscripcion", router);
};