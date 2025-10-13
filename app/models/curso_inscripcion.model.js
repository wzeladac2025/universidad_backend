module.exports = (sequelize, Sequelize) => {
    const Estudiante = require("./estudiante.model")(sequelize, Sequelize);
    const Curso = require("./curso.model")(sequelize, Sequelize);

    const Curso_Inscripcion = sequelize.define("curso_inscripcion", {
        estado: {
            type: Sequelize.BOOLEAN
        },
        fecha_inscripcion: {
            type: Sequelize.DATE
        },
        id_estudiante: {
            type: Sequelize.INTEGER
        },
        id_curso: {
            type: Sequelize.INTEGER
        }
    });

    // ✅ Un curso tiene muchas inscripciones
    Curso.hasMany(Curso_Inscripcion, {
        foreignKey: "id_curso",
        as: "curso_inscripcion"
    });

    // ✅ Una inscripción pertenece a un curso
    Curso_Inscripcion.belongsTo(Curso, {
        foreignKey: "id_curso",
        as: "curso"
    });

    // ✅ Un estudiante tiene muchas inscripciones
    Estudiante.hasMany(Curso_Inscripcion, {
        foreignKey: "id_estudiante",
        as: "inscripciones"
    });

    // ✅ Una inscripción pertenece a un estudiante
    Curso_Inscripcion.belongsTo(Estudiante, {
        foreignKey: "id_estudiante",
        as: "estudiante"
    });

    return Curso_Inscripcion;
};
