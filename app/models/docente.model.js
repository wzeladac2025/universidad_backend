// docente.model.js
module.exports = (sequelize, Sequelize) => {
    const Usuario = require("./usuario.model")(sequelize, Sequelize);

    const Docente = sequelize.define("docente", {
        carnet: {
            type: Sequelize.STRING
        },
        nombre: {
            type: Sequelize.STRING
        },
        fechaNacimiento: {
            type: Sequelize.DATE   // equivale a TIMESTAMP WITH TIME ZONE
        },
        genero: {
            type: Sequelize.STRING
        },
        sueldo: {
            type: Sequelize.DECIMAL(9,2) // NUMERIC(9,2)
        },
        id_usuario: {
            type: Sequelize.INTEGER
        },
        id_carrera: {
            type: Sequelize.INTEGER
        }
    });
    return Docente;
};