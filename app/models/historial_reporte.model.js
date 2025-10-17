module.exports = (sequelize, Sequelize) => {
    const HistorialReporte = sequelize.define("historial_reporte", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_estudiante: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        tipo_reporte: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        fecha_generacion: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        parametros: {
            type: Sequelize.TEXT
        }
    }, {
        tableName: 'historial_reportes',
        timestamps: false
    });

    return HistorialReporte;
};