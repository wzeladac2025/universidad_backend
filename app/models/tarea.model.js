module.exports = (sequelize, Sequelize) => {
    const Curso = require("./curso.model")(sequelize, Sequelize);

    const Tarea = sequelize.define("tarea", {
            id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        },
        fecha_entrega: {
            type: Sequelize.DATE
        },
        tipo: {
            type: Sequelize.ENUM("tarea", "parcial 1", "parcial 2", "examen final", "proyecto", "asistencia"),
            defaultValue: "tarea"
        },
        punteo: {
            type: Sequelize.INTEGER
        },
            id_curso: {
            type: Sequelize.INTEGER
        }
    });

    // Relacion de materia con curos
    Tarea.belongsTo(Curso, {
        foreignKey: "id_curso",
        targetKey: "id",
    });

    Curso.hasMany(Tarea, {
        foreignKey: "id_curso",
        sourceKey: "id",
    });
    return Tarea;
};