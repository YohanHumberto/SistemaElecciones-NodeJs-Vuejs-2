const Partidos = require('../Models/Partidos');
const Candidatos = require('../Models/Candidatos');
const Elecciones = require('../Models/Elecciones');
const { Op } = require('sequelize');


exports.GetAllPartidos = async (req, res, next) => {

    try {
        const buttonDesactivarIsActive = (await Elecciones.findAll({ where: { Estado: true } })).length > 0 ? false : true;
        const partidos = (await Partidos.findAll({ where: { Nombre: { [Op.not]: 'Ninguno' } } })).map(item => item.dataValues);
        res.json({ Estado: true, partidos, buttonDesactivarIsActive });
    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }
}

exports.GetPartidosById = async (req, res, next) => {
    try {

        const id = req.params.id;
        if (id) {
            const partido = await Partidos.findByPk(id);
            if (partido) {
                res.json({ Estado: true, partido: partido.dataValues });
            }
        } else {
            res.json({ Estado: false, msg: "No existe ningun partido con este id", id });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }
}

exports.PostAddPartidos = async (req, res, next) => {

    const { body } = req;
    const fotopath = req?.file?.path;

    try {
        await Partidos.create({ ...body, Logo: "/" + fotopath });
        res.json({ Estado: true, msg: "Partido agregado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }

}

exports.PostEditPartidos = async (req, res, next) => {

    const id = req.params.id;
    const { body } = req;
    const fotopath = req?.file?.path;

    try {
        fotopath
            ? await Partidos.update({ ...body, Logo: "/" + fotopath }, { where: { Id: id } })
            : await Partidos.update(body, { where: { Id: id } })
        res.json({ Estado: true, msg: "Partido modificado correctamente", id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }
}

exports.GetChangeEstadoPartidos = async (req, res, next) => {
    const id = req.params.id;

    try {
        const partido = await Partidos.findByPk(id);
        if (partido) {
            if (partido.dataValues.Estado) {
                const candidatosFromThisPartido = await Candidatos.findAll({ where: { Estado: true, PartidoId: partido.dataValues.Id, Nombre: { [Op.not]: 'Ninguno' } } });
                candidatosFromThisPartido.forEach(async (element) => {
                    const candidato = await Candidatos.findByPk(element.dataValues.Id);
                    candidato.update({ Estado: false })
                });
            }
            console.log(partido.dataValues)
            partido.update({ Estado: !partido.dataValues.Estado });
            res.json({ Estado: true, msg: "Estado modificado correctamente", id });
        } else {
            res.json({ Estado: false, msg: "No existe ningun partido con este id", id });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }
}


