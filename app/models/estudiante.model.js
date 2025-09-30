// docente.model.js
module.exports = (sequelize, Sequelize) => {
    const Usuario = require("./usuario.model.js")(sequelize, Sequelize);

    const Estudiante = sequelize.define("estudiante", {
            id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        carnet: {
            type: Sequelize.STRING
        },
        DPI: {
            type: Sequelize.INTEGER
        },
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        },
        fechaNacimiento: {
            type: Sequelize.DATE   // equivale a TIMESTAMP WITH TIME ZONE
        },
        genero: {
            type: Sequelize.BOOLEAN
        },
        id_usuario: {
            type: Sequelize.INTEGER
        }
    });

    // Relación: un docente pertenece a un usuario
    Estudiante.belongsTo(Usuario, {
        foreignKey: "id_usuario",
        targetKey: "id",
    });

    Usuario.hasOne(Estudiante, {
        foreignKey: "id_usuario",
        sourceKey: "id",
    });

    return Estudiante;
};