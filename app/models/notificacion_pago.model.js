// Exportamos el modelo NotificacionPago
module.exports = (sequelize, Sequelize) => {
    const NotificacionPago = sequelize.define("notificacion_pago", {
        id_notificacion: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    /*id_pago: {
            type: Sequelize.INTEGER,
            references: {
                model: "pagos",   // 👈 nombre de la tabla relacionada
                key: "id_pago"
            }
        },*/
        id_usuario: {
            type: Sequelize.INTEGER,
            references: {
                model: "usuarios", // 👈 nombre de la tabla relacionada
                key: "id"
            }
        },
        fecha_envio: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        correo: {
            type: Sequelize.STRING
        },
        mensaje: {
            type: Sequelize.STRING
        },
        estado_notificacion: {
            type: Sequelize.ENUM("enviada", "fallida", "pendiente"),
            allowNull: false,
            defaultValue: "pendiente"
        }
    });

    return NotificacionPago;
};

