const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
<<<<<<< HEAD
require("dotenv").config();
=======
const swaggerUI = require("swagger-ui-express");
>>>>>>> 55388ac228649b675404ad62b213a11c20378191

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
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
  console.log("✅ docente.routes.js cargado correctamente");
}catch(err){
  console.error("❌ Error al cargar docente.routes.js:", err.message);
}

<<<<<<< HEAD
=======
try {
  require("./app/routes/usuario.routes.js")(app);
  console.log("✅ usuario.routes.js cargado correctamente");
} catch (err) {
  console.error("❌ Error al cargar usuario.routes.js:", err.message);
}

try {
  require("./app/routes/estudiante.routes.js")(app);
  console.log("✅ estudiante.routes.js cargado correctamente");
} catch (err) {
  console.error("❌ Error al cargar estudiante.routes.js:", err.message);
}

>>>>>>> 55388ac228649b675404ad62b213a11c20378191
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado correctamente en el puerto ${PORT}.`);
});
