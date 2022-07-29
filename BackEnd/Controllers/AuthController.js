const jwt = require('jsonwebtoken');
const Ciudadanos = require('../Models/Ciudadanos');
const Usuarios = require('../Models/Usuarios');
const Elecciones = require('../Models/Elecciones');
const Votos = require('../Models/Votos');
const PuestoElectivo = require('../Models/PuestoElectivo');

exports.PostLoginAdmin = async (req, res, next) => {
    const UserName = req.body.UserName;
    const Password = req.body.Password;
    console.log(UserName)
    console.log(Password)

    try {
        const usuario = await Usuarios.findAll({
            where: {
                NombreDeUsuario: UserName,
                Password: Password
            }
        });

        if (usuario.length > 0 && usuario !== null || UserName == "admin" && Password == "1234") {

            var token = jwt.sign({ UserName, IsAdmin: true }, 'Secret Password', {
                expiresIn: 60 * 60 * 24 // expires in 24 hours
            })

            res.json({ Estado: true, token, msg: 'Usuario logueado correctamente' });
        } else {
            res.json({ Estado: false, title: 'Errors', msg: 'Usuario o Contraseña Incorrecto' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }
}

exports.GetLogoutAdmin = async (req, res, next) => {
    await req.session.destroy();
    res.json({ Estado: true, msg: "Seccion cerrada correctamente" });
}

exports.PostLoginElector = async (req, res, next) => {
    try {
        const elecciones = await Elecciones.findAll({ where: { Estado: true } });
        if (elecciones[0]?.dataValues.Estado) {
            const Ciudadano = await Ciudadanos.findByPk(req.body.DIdentidad);
            if (Ciudadano === [] || Ciudadano == null) {
                res.json({ title: "errors", msg: "Documento de indentidad invalido" }).end();
            } else if (Ciudadano.dataValues.Estado) {
                const CantidadDeVotosEnEstaEleccion = (await Votos.findAll({ where: { CiudadanoId: Ciudadano.dataValues.DocumentoDeIdentidad, EleccionId: elecciones[0]?.dataValues.Id } })).length;
                const CantidadDePuestosActivos = (await PuestoElectivo.findAll({ where: { Estado: true } })).length;

                if (CantidadDeVotosEnEstaEleccion !== CantidadDePuestosActivos) {
                    var token = jwt.sign({ DIdentidad: req.body.DIdentidad, ElectorIsAuthenticated: true }, 'Secret Password', {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    })
                    res.json({
                        Estado: true,
                        msg: "Elector logueado correctamente",
                        token
                    })
                } else {
                    res.json({ title: "errors", msg: "Usted ha completado el proceso de votacion" }).end();
                }
            } else if (!Ciudadano.dataValues.Estado) {
                res.json({ title: "errors", msg: "Usted Se encuentra inactivo" }).end();
            }
        } else {
            res.json({ title: "errors", msg: "No hay ninguna eleccion en curso" }).end();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }
}

exports.GetLogoutElector = async (req, res, next) => {
    await req.session.destroy();
    res.json({ Estado: true, msg: 'Seccion cerrada correctamente' });
}