module.exports = (app) => {
  const controlador = require("../controllers/inscripcioncurso.controller");
  app.post("/inscripciones", controlador.inscribir);
};