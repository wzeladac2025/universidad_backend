module.exports = (sequelize, Sequelize) => {
    const Carrera = require("./carrera.model")(sequelize, Sequelize);

    const Materia = sequelize.define("materia", {
            id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        creditos: {
            type: Sequelize.INTEGER
        },
        Semestre: {
            type: Sequelize.INTEGER,   // equivale a TIMESTAMP WITH TIME ZONE
        },
        Obligacion: {
            type: Sequelize.BOOLEAN,   // equivale a TIMESTAMP WITH TIME ZONE
        },
        id_carrera: {
            type: Sequelize.INTEGER,   // equivale a TIMESTAMP WITH TIME ZONE
        }
    });

    // Relación: un docente pertenece a un usuario
    Materia.belongsTo(Carrera, {
        foreignKey: "id_carrera",
        targetKey: "id",
    });

    Carrera.hasMany(Materia, {
        foreignKey: "id_carrera",
        sourceKey: "id",
    });

    return Materia;
};