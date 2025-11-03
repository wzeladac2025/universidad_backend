const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Usuario = db.usuarios;
const Estudiante = db.estudiantes;
const Docente = db.docentes;

exports.create = async (req, res) => {
  try {
    const { correo, contrasena, role, nombres, apellidos } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).send({
        mensaje: "Necesita ingresar el correo y la contraseña.",
      });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Crear usuario base
    const nuevoUsuario = await Usuario.create({
      correo,
      contrasena: hashedPassword,
      role,
    });

    // Dependiendo del rol, crear registro en tabla correspondiente
    if (role === "estudiante") {
      await Estudiante.create({
        anio: new Date().getFullYear(),
        nombre: nombres,
        apellido: apellidos,
        id_usuario: nuevoUsuario.id,
      });
    } else if (role === "docente") {
      await Docente.create({
        nombre: nombres,
        apellido: apellidos,
        id_usuario: nuevoUsuario.id,
      });
    }

    // Enviar una sola respuesta final
    return res.status(201).send({
      mensaje: "Usuario creado correctamente",
      correo: nuevoUsuario.correo,
    });
  } catch (err) {
    console.error("Error al crear usuario:", err);
    return res.status(500).send({
      mensaje:
        err.message || "Error interno al registrar usuario. Consulte al administrador.",
    });
  }
};

exports.findAllDocente = (req, res) => {
  const correo = req.query.correo;

  // Filtrar solo usuarios con role = "docente"
  let condition = { role: "docente" };

  // Si se envía un correo como filtro, lo agregamos (iLike para Postgres)
  if (correo) {
    condition.correo = { [Op.iLike]: `%${correo}%` };
  }

  Usuario.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error("Error findAllDocente:", err);
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al recibir los usuarios docentes.",
      });
    });
};

exports.findAllEstudiante = (req, res) => {
  const correo = req.query.correo;

  // Filtrar solo usuarios con role = "docente"
  let condition = { role: "estudiante" };

  // Si se envía un correo como filtro, lo agregamos (iLike para Postgres)
  if (correo) {
    condition.correo = { [Op.iLike]: `%${correo}%` };
  }

  Usuario.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error("Error findAllDocente:", err);
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al recibir los usuarios docentes.",
      });
    });
};

// Retrieve all Client from the database.
exports.findAll = (req, res) => {
    const nombre = req.query.correo;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Usuario.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
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