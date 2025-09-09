// Importamos el modulo express 
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

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

require("./app/routes/estudiante.route")(app);
require("./app/routes/boleta.route")(app);
require("./app/routes/factura.route")(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Servidor levantado en puerto ${PORT}.`);
});
