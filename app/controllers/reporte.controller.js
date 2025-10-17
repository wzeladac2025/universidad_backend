const db = require("../models");
const HistorialReporte = db.historialReportes;
const pdfGenerator = require("../services/pdf-generator.service");
const dataService = require("../services/data.service");

// CERTIFICADO CURSOS - (JSON)
exports.previewCertificadoCursos = async (req, res) => {
    try {
        const idEstudiante = req.params.id;
        
        const estudiante = await dataService.obtenerInfoEstudiante(idEstudiante);
        const cursos = await dataService.obtenerCursosAprobados(idEstudiante);
        
        const totalCreditos = cursos.reduce((sum, c) => sum + c.creditos, 0);
        const promedioGeneral = (cursos.reduce((sum, c) => sum + c.nota_final, 0) / cursos.length).toFixed(2);
        
        res.send({
            estudiante,
            cursos,
            resumen: {
                totalCursos: cursos.length,
                totalCreditos,
                promedioGeneral
            }
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// CERTIFICADO CURSOS - Descargar PDF
exports.descargarCertificadoCursos = async (req, res) => {
    try {
        const idEstudiante = req.params.id;
        
        const estudiante = await dataService.obtenerInfoEstudiante(idEstudiante);
        const cursos = await dataService.obtenerCursosAprobados(idEstudiante);
        
        const pdf = pdfGenerator.generarPDF('CERTIFICADO_CURSOS', { estudiante, cursos });
        
        await HistorialReporte.create({
            id_estudiante: idEstudiante,
            tipo_reporte: 'CERTIFICADO_CURSOS',
            parametros: JSON.stringify({ totalCursos: cursos.length })
        });
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=certificado_cursos_${estudiante.carnet}.pdf`);
        pdf.pipe(res);
        
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// REPORTE NOTAS - (JSON)
exports.previewReporteNotas = async (req, res) => {
    try {
        const idEstudiante = req.params.id;
        const semestre = req.query.semestre || '2024-2';
        
        const estudiante = await dataService.obtenerInfoEstudiante(idEstudiante);
        const notas = await dataService.obtenerNotasPorSemestre(idEstudiante, semestre);
        
        const aprobados = notas.filter(n => n.estado === 'APROBADO').length;
        const reprobados = notas.filter(n => n.estado === 'REPROBADO').length;
        const promedio = (notas.reduce((sum, n) => sum + n.nota_final, 0) / notas.length).toFixed(2);
        
        res.send({
            estudiante,
            semestre,
            notas,
            resumen: {
                totalCursos: notas.length,
                aprobados,
                reprobados,
                promedio
            }
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// REPORTE NOTAS - Descargar PDF
exports.descargarReporteNotas = async (req, res) => {
    try {
        const idEstudiante = req.params.id;
        const semestre = req.query.semestre || '2024-2';
        
        const estudiante = await dataService.obtenerInfoEstudiante(idEstudiante);
        const notas = await dataService.obtenerNotasPorSemestre(idEstudiante, semestre);
        
        const pdf = pdfGenerator.generarPDF('REPORTE_NOTAS', { estudiante, notas, semestre });
        
        await HistorialReporte.create({
            id_estudiante: idEstudiante,
            tipo_reporte: 'REPORTE_NOTAS',
            parametros: JSON.stringify({ semestre })
        });
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=notas_${semestre}_${estudiante.carnet}.pdf`);
        pdf.pipe(res);
        
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// REPORTE PAGOS - (JSON)
exports.previewReportePagos = async (req, res) => {
    try {
        const idEstudiante = req.params.id;
        
        const estudiante = await dataService.obtenerInfoEstudiante(idEstudiante);
        const pagos = await dataService.obtenerPagosEstudiante(idEstudiante);
        
        const montoTotal = pagos.reduce((sum, p) => sum + parseFloat(p.monto), 0);
        
        res.send({
            estudiante,
            pagos,
            resumen: {
                totalPagos: pagos.length,
                montoTotal: montoTotal.toFixed(2)
            }
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// REPORTE PAGOS - Descargar PDF
exports.descargarReportePagos = async (req, res) => {
    try {
        const idEstudiante = req.params.id;
        
        const estudiante = await dataService.obtenerInfoEstudiante(idEstudiante);
        const pagos = await dataService.obtenerPagosEstudiante(idEstudiante);
        
        const pdf = pdfGenerator.generarPDF('REPORTE_PAGOS', { estudiante, pagos });
        
        await HistorialReporte.create({
            id_estudiante: idEstudiante,
            tipo_reporte: 'REPORTE_PAGOS',
            parametros: JSON.stringify({ totalPagos: pagos.length })
        });
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=pagos_${estudiante.carnet}.pdf`);
        pdf.pipe(res);
        
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// HISTORIAL DE REPORTES
exports.obtenerHistorial = async (req, res) => {
    try {
        const idEstudiante = req.params.id;
        
        const historial = await HistorialReporte.findAll({
            where: { id_estudiante: idEstudiante },
            order: [['fecha_generacion', 'DESC']],
            limit: 20
        });
        
        res.send(historial);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};