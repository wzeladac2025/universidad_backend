module.exports = app => {
    const reporte = require("../controllers/reporte.controller.js");
    const Verificador = require("../middlewares/autorizacion.middleware.js");
    const soloEstudiantes = Verificador(["estudiante", "admin"]);
    
    var router = require("express").Router();

    // CERTIFICADO DE CURSOS APROBADOS
    /**
     * @swagger
     * /api/reporte/certificado-cursos/{id}/preview:
     *   get:
     *     summary: Vista previa del certificado de cursos aprobados
     *     tags: [Reportería]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID del estudiante
     *     responses:
     *       200:
     *         description: Datos del certificado en formato JSON
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 estudiante:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: integer
     *                     carnet:
     *                       type: string
     *                     nombre:
     *                       type: string
     *                     apellido:
     *                       type: string
     *                     carrera:
     *                       type: string
     *                 cursos:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       codigo:
     *                         type: string
     *                       nombre:
     *                         type: string
     *                       nota_final:
     *                         type: integer
     *                       creditos:
     *                         type: integer
     *                       periodo:
     *                         type: string
     *                 resumen:
     *                   type: object
     *                   properties:
     *                     totalCursos:
     *                       type: integer
     *                     totalCreditos:
     *                       type: integer
     *                     promedioGeneral:
     *                       type: string
     *       401:
     *         description: No autorizado - Token inválido o faltante
     *       500:
     *         description: Error interno del servidor
     */
    router.get("/certificado-cursos/:id/preview", soloEstudiantes, reporte.previewCertificadoCursos);
    
    /**
     * @swagger
     * /api/reporte/certificado-cursos/{id}/pdf:
     *   get:
     *     summary: Descargar certificado de cursos aprobados en PDF
     *     tags: [Reportería]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID del estudiante
     *     responses:
     *       200:
     *         description: Archivo PDF del certificado
     *         content:
     *           application/pdf:
     *             schema:
     *               type: string
     *               format: binary
     *       401:
     *         description: No autorizado
     *       500:
     *         description: Error interno del servidor
     */
    router.get("/certificado-cursos/:id/pdf", soloEstudiantes, reporte.descargarCertificadoCursos);
    

    // REPORTE DE NOTAS POR SEMESTRE

    /**
     * @swagger
     * /api/reporte/reporte-notas/{id}/preview:
     *   get:
     *     summary: Vista previa del reporte de calificaciones por semestre
     *     tags: [Reportería]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID del estudiante
     *       - in: query
     *         name: semestre
     *         required: false
     *         schema:
     *           type: string
     *           example: "2024-2"
     *         description: Período académico (formato YYYY-N)
     *     responses:
     *       200:
     *         description: Datos de las calificaciones en formato JSON
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 estudiante:
     *                   type: object
     *                 semestre:
     *                   type: string
     *                 notas:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       codigo:
     *                         type: string
     *                       nombre:
     *                         type: string
     *                       primer_parcial:
     *                         type: integer
     *                       segundo_parcial:
     *                         type: integer
     *                       parcial_final:
     *                         type: integer
     *                       actividades:
     *                         type: integer
     *                       nota_final:
     *                         type: integer
     *                       estado:
     *                         type: string
     *                         enum: [APROBADO, REPROBADO]
     *                 resumen:
     *                   type: object
     *                   properties:
     *                     totalCursos:
     *                       type: integer
     *                     aprobados:
     *                       type: integer
     *                     reprobados:
     *                       type: integer
     *                     promedio:
     *                       type: string
     *       401:
     *         description: No autorizado
     *       500:
     *         description: Error interno del servidor
     */
    router.get("/reporte-notas/:id/preview", soloEstudiantes, reporte.previewReporteNotas);
    
    /**
     * @swagger
     * /api/reporte/reporte-notas/{id}/pdf:
     *   get:
     *     summary: Descargar reporte de calificaciones en PDF
     *     tags: [Reportería]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID del estudiante
     *       - in: query
     *         name: semestre
     *         required: false
     *         schema:
     *           type: string
     *           example: "2024-2"
     *         description: Período académico
     *     responses:
     *       200:
     *         description: Archivo PDF del reporte de notas
     *         content:
     *           application/pdf:
     *             schema:
     *               type: string
     *               format: binary
     *       401:
     *         description: No autorizado
     *       500:
     *         description: Error interno del servidor
     */
    router.get("/reporte-notas/:id/pdf", soloEstudiantes, reporte.descargarReporteNotas);
    

    // REPORTE DE PAGOS

    /**
     * @swagger
     * /api/reporte/reporte-pagos/{id}/preview:
     *   get:
     *     summary: Vista previa del historial de pagos
     *     tags: [Reportería]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID del estudiante
     *     responses:
     *       200:
     *         description: Datos del historial de pagos en formato JSON
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 estudiante:
     *                   type: object
     *                 pagos:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       id_boleta:
     *                         type: integer
     *                       monto:
     *                         type: number
     *                       fecha_pago:
     *                         type: string
     *                         format: date
     *                       banco:
     *                         type: string
     *                       transaccion:
     *                         type: string
     *                       estado:
     *                         type: string
     *                       concepto:
     *                         type: string
     *                 resumen:
     *                   type: object
     *                   properties:
     *                     totalPagos:
     *                       type: integer
     *                     montoTotal:
     *                       type: string
     *       401:
     *         description: No autorizado
     *       500:
     *         description: Error interno del servidor
     */
    router.get("/reporte-pagos/:id/preview", soloEstudiantes, reporte.previewReportePagos);
    
    /**
     * @swagger
     * /api/reporte/reporte-pagos/{id}/pdf:
     *   get:
     *     summary: Descargar reporte de pagos en PDF
     *     tags: [Reportería]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID del estudiante
     *     responses:
     *       200:
     *         description: Archivo PDF del reporte de pagos
     *         content:
     *           application/pdf:
     *             schema:
     *               type: string
     *               format: binary
     *       401:
     *         description: No autorizado
     *       500:
     *         description: Error interno del servidor
     */
    router.get("/reporte-pagos/:id/pdf", soloEstudiantes, reporte.descargarReportePagos);
    

    // HISTORIAL DE REPORTES GENERADOS

    /**
     * @swagger
     * /api/reporte/historial/{id}:
     *   get:
     *     summary: Obtener historial de reportes generados por un estudiante
     *     tags: [Reportería]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID del estudiante
     *     responses:
     *       200:
     *         description: Lista del historial de reportes
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   id_estudiante:
     *                     type: integer
     *                   tipo_reporte:
     *                     type: string
     *                     enum: [CERTIFICADO_CURSOS, REPORTE_NOTAS, REPORTE_PAGOS]
     *                   fecha_generacion:
     *                     type: string
     *                     format: date-time
     *                   parametros:
     *                     type: string
     *                     description: JSON con parámetros del reporte
     *       401:
     *         description: No autorizado
     *       500:
     *         description: Error interno del servidor
     */
    router.get("/historial/:id", soloEstudiantes, reporte.obtenerHistorial);

    app.use("/api/reporte", router);
};