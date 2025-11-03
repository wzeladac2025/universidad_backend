const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const swaggerUI = require("swagger-ui-express");

const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve Swagger documentation
const swaggerSpec = require("./app/config/swagger.config");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const db = require("./app/models");
db.sequelize.sync();

/**
 * @swagger
 * /: 
 *   get:
 *     summary: Test
 *     tags: [Servicios Up]
 *     description: Test Proyecto Levantado
 *     responses:
 *       200:
 *         description: Test Proyecto Levantado
 */
app.get("/", (req, res) => {
  res.json({ message: "UMG Web Universidad" });
});
try{
  require("./app/routes/usuario.routes")(app);
  console.log("✅ usuario.routes.js cargado correctamente");
}catch(err){
  console.error("❌ Error al cargar usuario.routes.js:", err.message);
}

try{
  require("./app/routes/estudiante.routes")(app);
  console.log("✅ estudiante.routes.js cargado correctamente");
}catch(err){
  console.error("❌ Error al cargar estudiante.routes.js:", err.message);
}

try{
  require("./app/routes/docente.routes")(app);
  console.log("✅ docente.routes.js cargado correctamente");
}catch(err){
  console.error("❌ Error al cargar docente.routes.js:", err.message);
}

try{
  require("./app/routes/carrera.routes")(app);
  console.log("✅ carrera.routes.js cargado correctamente");
}catch(err){
  console.error("❌ Error al cargar carrera.routes.js:", err.message);
}

try{
  require("./app/routes/materia.routes")(app);
  console.log("✅ materia.routes.js cargado correctamente");
}catch(err){
  console.error("❌ Error al cargar materia.routes.js:", err.message);
}

try{
  require("./app/routes/curso_inscripcion.routes")(app);
  console.log("✅ curso_inscripcion.routes.js cargado correctamente");
}catch(err){
  console.error("❌ Error al cargar curso_inscripcion.routes.js:", err.message);
}

try{
  require("./app/routes/horario.routes")(app);
  console.log("✅ horario.routes.js cargado correctamente");
}catch(err){
  console.error("❌ Error al cargar horario.routes.js:", err.message);
}

try{
  require("./app/routes/notas.routes")(app);
  console.log("✅ notas.routes.js cargado correctamente");
}catch(err){
  console.error("❌ Error al cargar notas.routes.js:", err.message);
}

try{
  require("./app/routes/estudiantecarrera.routes")(app);
  console.log("✅ estudiantecarrera.routes.js cargado correctamente");
}catch(err){
  console.error("❌ Error al cargar estudiantecarrera.routes.js:", err.message);
}

try{
  require("./app/routes/tarea.routes")(app);
  console.log("✅ tarea.routes.js cargado correctamente");
}catch(err){
  console.error("❌ Error al cargar tarea.routes.js:", err.message);
}

try{
  require("./app/routes/tarea_estudiante.routes")(app);
  console.log("✅ tarea_estudiante.routes.js cargado correctamente");
}catch(err){
  console.error("❌ Error al cargar tarea_estudiante.routes.js:", err.message);
}

try{
  require("./app/routes/curso.routes")(app);
  console.log("✅ curso.routes.js cargado correctamente\n");
}catch(err){
  console.error("❌ Error al cargar curso.routes.js:", err.message, "\n");
}

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado correctamente en el puerto ${PORT}.`);
});
