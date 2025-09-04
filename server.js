// Importamos el modulo express 
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "API Proyecto Universidad" });
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

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Servidor levantado en puerto ${PORT}.`);
});