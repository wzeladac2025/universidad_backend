module.exports = (app) => {
  app.get("/materias", (req, res) => {
    res.json({ mensaje: "Ruta de materias activa." });
  });
};