module.exports = (sequelize, Sequelize) => {
    const Usuario = require("./usuario.model")(sequelize, Sequelize);
    const Estudiante = sequelize.define("estudiante", {
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