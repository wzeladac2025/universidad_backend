module.exports = (app) => {
  const estudiante = require("../controllers/estudiante.controller.js");
  var router = require("express").Router();

  app.use("/api/estudiante", router);
};
