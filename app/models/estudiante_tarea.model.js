module.exports = (sequelize, Sequelize) => {
    const Tarea = require("./tarea.model")(sequelize, Sequelize);
    const Estudiante = require("./estudiante.model")(sequelize, Sequelize);

    const Tarea_Estudiante = sequelize.define("tarea estudiante", {
            id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
            id_tarea: {
            type: Sequelize.INTEGER
        },
            id_estudiante: {
            type: Sequelize.INTEGER
        }
    });

    // Relacion de materia con curos
    Tarea_Estudiante.belongsTo(Estudiante, {
        foreignKey: "id_estudiante",
        targetKey: "id",
    });

    Estudiante.hasMany(Tarea_Estudiante, {
        foreignKey: "id_estudiante",
        sourceKey: "id",
    });

    // Relacion entre docente y curso
    Tarea_Estudiante.belongsTo(Tarea, {
        foreignKey: "id_tarea",
        targetKey: "id",
    });

    Tarea.hasMany(Tarea_Estudiante, {
        foreignKey: "id_tarea",
        sourceKey: "id",
    });

    return Tarea_Estudiante;
};