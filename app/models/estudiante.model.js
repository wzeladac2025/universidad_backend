module.exports = (sequelize, Sequelize) => {
    const Estudiante = sequelize.define("estudiante", {
        primer_nombre: {
            type: Sequelize.STRING
        },
        primer_apellido: {
            type: Sequelize.STRING
        }
    });
    return Estudiante;
};