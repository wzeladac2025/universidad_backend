const PDFDocument = require('pdfkit');

class PDFGeneratorService {

    generarPDF(tipoReporte, datos) {
        switch(tipoReporte) {
            case 'CERTIFICADO_CURSOS':
                return this.generarCertificadoCursos(datos);
            
            case 'REPORTE_NOTAS':
                return this.generarReporteNotas(datos);
            
            case 'REPORTE_PAGOS':
                return this.generarReportePagos(datos);
            
            default:
                throw new Error(`Tipo de reporte no soportado: ${tipoReporte}`);
        }
    }
    
    // CERTIFICADO DE CURSOS APROBADOS
    generarCertificadoCursos(datos) {
        const doc = new PDFDocument({ margin: 50 });
        
        // ENCABEZADO
        doc.fontSize(22)
            .font('Helvetica-Bold')
            .text('UNIVERSIDAD DE MARIANO GÁLVEZ', { align: 'center' })
            .fontSize(18)
            .text('CERTIFICADO DE CURSOS APROBADOS', { align: 'center' })
            .moveDown(2);
        
        // DATOS DEL ESTUDIANTE
        doc.fontSize(12)
            .font('Helvetica')
            .text(`Estudiante: ${datos.estudiante.nombre} ${datos.estudiante.apellido}`)
            .text(`Carnet: ${datos.estudiante.carnet}`)
            .text(`Carrera: ${datos.estudiante.carrera}`)
            .text(`Fecha de emisión: ${new Date().toLocaleDateString('es-GT')}`)
            .moveDown(2);
        
        // TÍTULO DE CURSOS
        doc.fontSize(14)
            .font('Helvetica-Bold')
            .text('CURSOS APROBADOS', { underline: true })
            .moveDown();
        
        // LISTA DE CURSOS
        doc.fontSize(10).font('Helvetica');
        datos.cursos.forEach((curso, index) => {
            doc.text(`${index + 1}. ${curso.codigo} - ${curso.nombre}`)
                .text(`   Nota Final: ${curso.nota_final} puntos | Créditos: ${curso.creditos} | Período: ${curso.periodo}`, { indent: 20 })
                .moveDown(0.5);
        });
        
        // RESUMEN
        const totalCreditos = datos.cursos.reduce((sum, c) => sum + c.creditos, 0);
        const promedioGeneral = (datos.cursos.reduce((sum, c) => sum + c.nota_final, 0) / datos.cursos.length).toFixed(2);
        
        doc.moveDown(2)
            .fontSize(11)
            .font('Helvetica-Bold')
            .text('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
            .text(`Total de cursos aprobados: ${datos.cursos.length}`)
            .text(`Total de créditos acumulados: ${totalCreditos}`)
            .text(`Promedio general: ${promedioGeneral} puntos`)
            .moveDown(3);
        
        // PIE DE PÁGINA
        doc.fontSize(9)
            .font('Helvetica-Oblique')
            .text('Este documento es válido para fines académicos.', { align: 'center' })
            .text(`Generado el ${new Date().toLocaleString('es-GT')}`, { align: 'center' });
      
        doc.end();
        return doc;
    }
    
    // REPORTE DE NOTAS POR SEMESTRE
    generarReporteNotas(datos) {
        const doc = new PDFDocument({ margin: 50 });
        
        // ENCABEZADO
        doc.fontSize(22)
            .font('Helvetica-Bold')
            .text('UNIVERSIDAD DE MARIANO GÁLVEZ', { align: 'center' })
            .fontSize(18)
            .text('REPORTE DE CALIFICACIONES', { align: 'center' })
            .moveDown(2);
        
        // DATOS DEL ESTUDIANTE
        doc.fontSize(12)
            .font('Helvetica')
            .text(`Estudiante: ${datos.estudiante.nombre} ${datos.estudiante.apellido}`)
            .text(`Carnet: ${datos.estudiante.carnet}`)
            .text(`Período académico: ${datos.semestre}`)
            .text(`Fecha de emisión: ${new Date().toLocaleDateString('es-GT')}`)
            .moveDown(2);
        
        // TÍTULO
        doc.fontSize(14)
            .font('Helvetica-Bold')
            .text('CALIFICACIONES DEL SEMESTRE', { underline: true })
            .moveDown();
        
        // TABLA DE NOTAS
        doc.fontSize(9).font('Helvetica');
        datos.notas.forEach((nota, index) => {
            const estadoEmoji = nota.estado === 'APROBADO' ? '✓' : '✗';
            const estadoColor = nota.estado === 'APROBADO' ? 'green' : 'red';
            
            doc.fillColor('black')
                .text(`${index + 1}. ${nota.codigo} - ${nota.nombre}`)
                .text(`   1er Parcial: ${nota.primer_parcial} | 2do Parcial: ${nota.segundo_parcial} | Examen Final: ${nota.parcial_final} | Actividades: ${nota.actividades}`, { indent: 20 })
                .font('Helvetica-Bold')
                .text(`   Nota Final: ${nota.nota_final} puntos | Créditos: ${nota.creditos} | Estado: ${estadoEmoji} ${nota.estado}`, { indent: 20 })
                .font('Helvetica')
                .moveDown(0.7);
        });
        
        // RESUMEN
        const aprobados = datos.notas.filter(n => n.estado === 'APROBADO').length;
        const reprobados = datos.notas.filter(n => n.estado === 'REPROBADO').length;
        const promedio = (datos.notas.reduce((sum, n) => sum + n.nota_final, 0) / datos.notas.length).toFixed(2);
        
        doc.moveDown(2)
            .fontSize(11)
            .font('Helvetica-Bold')
            .fillColor('black')
            .text('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
            .text(`Total de cursos cursados: ${datos.notas.length}`)
            .text(`Cursos aprobados: ${aprobados}`)
            .text(`Cursos reprobados: ${reprobados}`)
            .text(`Promedio del semestre: ${promedio} puntos`)
            .moveDown(3);
        
        // PIE DE PÁGINA
        doc.fontSize(9)
            .font('Helvetica-Oblique')
            .text('Este documento es válido para fines académicos.', { align: 'center' })
            .text(`Generado el ${new Date().toLocaleString('es-GT')}`, { align: 'center' });
        
        doc.end();
        return doc;
    }
    
    // REPORTE DE PAGOS
    generarReportePagos(datos) {
        const doc = new PDFDocument({ margin: 50 });
        
        // ENCABEZADO
        doc.fontSize(22)
            .font('Helvetica-Bold')
            .text('UNIVERSIDAD DE MARIANO GÁLVEZ', { align: 'center' })
            .fontSize(18)
            .text('REPORTE DE PAGOS', { align: 'center' })
            .moveDown(2);
        
        // DATOS DEL ESTUDIANTE
        doc.fontSize(12)
            .font('Helvetica')
            .text(`Estudiante: ${datos.estudiante.nombre} ${datos.estudiante.apellido}`)
            .text(`Carnet: ${datos.estudiante.carnet}`)
            .text(`Fecha de emisión: ${new Date().toLocaleDateString('es-GT')}`)
            .moveDown(2);
        
        // TÍTULO
        doc.fontSize(14)
            .font('Helvetica-Bold')
            .text('HISTORIAL DE PAGOS', { underline: true })
            .moveDown();
        
        // LISTA DE PAGOS
        doc.fontSize(10).font('Helvetica');
        datos.pagos.forEach((pago, index) => {
            doc.text(`${index + 1}. Boleta #${pago.id_boleta} - ${pago.concepto}`)
                .text(`   Monto: Q${parseFloat(pago.monto).toFixed(2)} | Fecha: ${pago.fecha_pago}`, { indent: 20 })
                .text(`   Banco: ${pago.banco} | Tipo: ${pago.transaccion} | Estado: ${pago.estado}`, { indent: 20 })
                .moveDown(0.7);
        });
        
        // RESUMEN
        const montoTotal = datos.pagos.reduce((sum, p) => sum + parseFloat(p.monto), 0);
        const pagosConfirmados = datos.pagos.filter(p => p.estado === 'CONFIRMADO' || p.estado === 'VALIDADO').length;
        const pagosPendientes = datos.pagos.filter(p => p.estado === 'PENDIENTE').length;
        
        doc.moveDown(2)
            .fontSize(11)
            .font('Helvetica-Bold')
            .text('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
            .text(`Total de pagos registrados: ${datos.pagos.length}`)
            .text(`Pagos confirmados: ${pagosConfirmados}`)
            .text(`Pagos pendientes: ${pagosPendientes}`)
            .text(`Monto total pagado: Q${montoTotal.toFixed(2)}`)
            .moveDown(3);
        
        // PIE DE PÁGINA
        doc.fontSize(9)
            .font('Helvetica-Oblique')
            .text('Este documento es válido para fines administrativos.', { align: 'center' })
            .text(`Generado el ${new Date().toLocaleString('es-GT')}`, { align: 'center' });
        
        doc.end();
        return doc;
    }
}

module.exports = new PDFGeneratorService();