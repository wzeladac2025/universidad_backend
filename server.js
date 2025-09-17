// Importamos los módulos necesarios
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: "http://localhost:8081" // Ajustá si tu frontend usa otro puerto
};
app.use(cors(corsOptions));

// Middleware para parsear JSON y formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Inicialización de Sequelize
const db = require("./app/models");
db.sequelize.sync().then(() => {
  console.log("Base de datos sincronizada.");
});

// Ruta base
app.get("/", (req, res) => {
  res.json({ message: "API Proyecto Universidad" });
});

// 🔗 Registro de rutas
require("./app/routes/estudiante.route")(app);           // Rutas de estudiantes
require("./app/routes/materia.route")(app);              // Rutas de materias
require("./app/routes/aprobacion.route")(app);           // Rutas de aprobaciones
require("./app/routes/requisito.route")(app);            // Rutas de requisitos
require("./app/routes/validacion.route")(app);           // Ruta para validar requisitos académicos
require("./app/routes/inscripcioncurso.route")(app);     // Rutas de inscripción a cursos

// Puerto de escucha
const PORT = process.env.PORT || 8881;
app.listen(PORT, () => {
  console.log(`Servidor levantado en puerto ${PORT}.`);
});