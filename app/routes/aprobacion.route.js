module.exports = (app) => {
  app.get("/aprobaciones", (req, res) => {
    res.json({ mensaje: "Ruta de aprobaciones activa." });
  });
};