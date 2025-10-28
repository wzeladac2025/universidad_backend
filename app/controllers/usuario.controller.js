const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Usuario = db.usuario;
const Estudiante = db.estudiante;
const Docente = db.docente;

exports.create = async (req, res) => {
  try {
    if (!req.body.correo && !req.body.contrasena) {
      res.status(400).send({
        message: "Necesita ingresar el correo y la contraseña.",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.contrasena, 10);

    const usuarioObj = {
      correo: req.body.correo,
      contrasena: hashedPassword,
      role: req.body.role,
    };

    const usuario = Usuario.build(usuarioObj);
    const nuevoUsuario = await usuario.save().catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error al crear el usuario. Consulte a su administrador.",
      });
    });

    //OBJETO BASE
    const objEstudiante = {
      anio: new Date().getFullYear(),
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      id_usuario: nuevoUsuario.null,
    };

    const objDocente = {
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      id_usuario: nuevoUsuario.null,
    };

    //GUARDAMOS INFO BASE ESTUDIANTE O DOCENTE
    switch (req.body.role) {
      case "estudiante":
        const estudiante = Estudiante.build(objEstudiante);
        estudiante.save().catch(() => {
          res.status(500).send({
            message:
              "Error al crear el estudiante. Consulte a su administrador.",
          });
        });
        break;
      case "docente":
        Docente.create(objDocente).catch(() => {
          res.status(500).send({
            message: "Error al crear el docente. Consulte a su administrador.",
          });
        });
        break;
      default:
        break;
    }

    res.send(response);
  } catch (err) {
    res.status(500).send({ message: err.message });
    console.log("hubo un error inesperado", err.message);
  }
};

exports.login = async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const query = await db.sequelize.query(
      "select * from usuarios where correo = '" + correo + "'",
      {
        model: Usuario,
        mapToModel: true,
      }
    );

    const usuario = query[0]?.dataValues;
    if (!usuario) {
      return res.status(404).send({ mensaje: "Usuario no registrado." });
    }

    const validPassword = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!validPassword) {
      return res.status(401).send({ mensaje: "Contraseña incorrecta." });
    }

    const token = jwt.sign(
      { id: usuario.id, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.send({ mensaje: "Sesion Iniciada.", access_token: token });
  } catch (err) {
    return res.status(401).send({ mensaje: err.message });
  }
};

exports.findById = async (req, res) => {
  const id = req.params.id;
  const query = await db.sequelize
    .query("select * from usuarios where id = " + id, {
      model: Usuario,
      mapToModel: true,
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Error al obtener el usuario.",
      });
    });

  const usuario = query[0]?.dataValues;
  if (!usuario) {
    return res.status(404).send({ message: "Usuario no registrado." });
  }
  return res.send({
    id: usuario.id,
    correo: usuario.correo,
    role: usuario.role,
  });
};
