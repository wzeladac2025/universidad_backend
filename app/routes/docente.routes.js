module.exports = (app) => {
  const docente = require("../controllers/docente.controller.js");
  var router = require("express").Router();

  app.use("/api/docente", router);
};
