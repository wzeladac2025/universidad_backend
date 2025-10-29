const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Usuario = db.usuario;
const Estudiante = db.estudiante;
const Docente = db.docente;

exports.create = async (req, res) => {
  try {
    if (!req.body.correo && !req.body.contrasena) {
      return res.status(400).send({
        mensaje: "Necesita ingresar el correo y la contraseña.",
      });
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
        mensaje:
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
            mensaje:
              "Error al crear el estudiante. Consulte a su administrador.",
          });
        });
        break;
      case "docente":
        const docente = Docente.build(objDocente);
        docente.save().catch(() => {
          res.status(500).send({
            mensaje:
              "Error al crear el estudiante. Consulte a su administrador.",
          });
        });
        break;
      default:
        break;
    }

    res.send({ mensaje: "Usuario creado", correo: nuevoUsuario.correo });
  } catch (err) {
    res.status(500).send({ mensaje: err.message });
    console.log("Hubo un error inesperado", err.message);
  }
};

exports.login = async (req, res) => {
  const { correo, contrasena, role } = req.body;
  try {
    const query = await db.sequelize.query(
      'select u.* from "usuarios" u where u."correo" = \'' + correo + "'",
      {
        model: Usuario,
        mapToModel: true,
      }
    );

    const usuario = query[0]?.dataValues;
    if (!usuario) {
      return res.status(404).send({ mensaje: "Usuario no registrado." });
    }

    if(role != usuario.role){
      return res.status(404).send({ mensaje: "Tu perfil de usuario no es correcto." });      
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

    return res.send({
      mensaje: "Sesion Iniciada.",
      access_token: token,
      idUsuario: usuario.id,
    });
  } catch (err) {
    return res.status(401).send({ mensaje: err.message });
  }
};

exports.findById = async (req, res) => {
  const id = req.params.id;
  const query = await db.sequelize
    .query('SELECT * FROM "usuarios" u WHERE u."id" = ' + id, {
      model: Usuario,
      mapToModel: true,
    })
    .catch((err) => {
      return res.status(500).send({
        mensaje: err.message || "Error al obtener el usuario.",
      });
    });

  const usuario = query[0]?.dataValues;
  if (!usuario) {
    return res.status(404).send({ mensaje: "Usuario no registrado." });
  }

  let datos = null;
  if (usuario.role == "estudiante" || usuario.role == "docente") {
    let tablaObjeto = usuario.role + "s";
    const query = await db.sequelize
      .query('SELECT * FROM "' + tablaObjeto + '" u WHERE u."id_usuario" = ' + id, {
        model: Usuario,
        mapToModel: true,
      })
      .catch((err) => {
        return res.status(500).send({
          mensaje: err.message || "Error al obtener el usuario.",
        });
      });

    datos = query[0]?.dataValues;
  }
  return res.send({
    id: usuario.id,
    correo: usuario.correo,
    role: usuario.role,
    nombres: datos?.nombres || 'Admin',
    apellidos: datos?.apellidos || 'Admin',
  });
};
