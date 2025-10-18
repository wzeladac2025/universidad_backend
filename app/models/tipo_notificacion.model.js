// Exportamos el modelo TipoNotificacion
module.exports = (sequelize, Sequelize) => {
    const TipoNotificacion = sequelize.define("tipo_notificacion", {
        id_notificacion: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    /* id_curso: {
            type: Sequelize.INTEGER,
            references: {
                model: "curso", // 👈 nombre de la tabla relacionada
                key: "id_curso"
            }
        },*/
       id_usuario: {
            type: Sequelize.INTEGER,
            references: {
                model: "usuarios", // 👈 nombre de la tabla relacionada
                key: "id"
            }
        },
        /*id_tarea: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: "tarea", // 👈 opcional
                key: "id_tarea"
            }
        },*/
        tipo_notificacion: {
            type: Sequelize.ENUM(
                "EVALUACION",
                "TAREA",
                "NOTA",
                "AVISO"
            ),
            allowNull: false
        },
        titulo: {
            type: Sequelize.STRING(150),
            allowNull: false
        },
        mensaje: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        fecha_envio: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        estado_notificacion: {
            type: Sequelize.ENUM("pendiente", "enviada", "leIda"),
            allowNull: false,
            defaultValue: "pendiente"
        },
       correo: {
           type: Sequelize.STRING
        },
        prioridad: {
            type: Sequelize.ENUM("alta", "media", "baja"),
            allowNull: false,
            defaultValue: "media"
        }
    });

    return TipoNotificacion;
};
