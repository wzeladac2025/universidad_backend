module.exports = (app) => {
  const controlador = require("../controllers/validacion.controller");

  app.get("/validar-requisitos/:estudianteId/:materiaId", controlador.validarRequisitos);
};