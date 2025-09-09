module.exports = (app) => {
  const db = require("../models");
  const Requisito = db.requisito;

  // Listar todos los requisitos
  app.get("/requisitos", async (req, res) => {
    try {
      const data = await Requisito.findAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener requisitos." });
    }
  });
};