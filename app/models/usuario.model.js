module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
        correo: {
            type: Sequelize.STRING,
            unique: true
        },
        contrasena: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.ENUM("admin", "docente", "estudiante", "user"),
            defaultValue: "user"
        }
    });
    return Usuario;
};