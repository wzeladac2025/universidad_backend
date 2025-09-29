const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Op = db.Sequelize.Op;
const Usuario = db.usuario;
const Estudiante = db.estudiante;
const Docente = db.docente;

exports.create = async (req, res) => {
  let response = null;
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
      primerNombre: req.body.primerNombre,
      segundoNombre: req.body.segundoNombre,
      primerApellido: req.body.primerApellido,
      segundoApellido: req.body.segundoApellido,
      id_usuario: nuevoUsuario.null,
    };

    const objDocente = {
      primerNombre: req.body.primerNombre,
      segundoNombre: req.body.segundoNombre,
      primerApellido: req.body.primerApellido,
      segundoApellido: req.body.segundoApellido,
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

exports.findAll = (req, res) => {
  const nombre = req.query.correo;
  var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

  Usuario.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

exports.findOne = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({
      where: { correo: req.body.correo },
    });
    if (!usuario) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(
      req.body.contrasena,
      usuario.contrasena
    );
    if (!validPassword) {
      return res.status(401).send({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario.id, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.send({ message: "Login exitoso", token });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.update = (req, res) => {
  const id = req.params.id;

  Usuario.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Usuario.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. El usuario no fue encontado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Usuario.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} User were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};

exports.findAllStatus = (req, res) => {
  Usuario.findAll({ where: { status: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving User.",
      });
    });
};
