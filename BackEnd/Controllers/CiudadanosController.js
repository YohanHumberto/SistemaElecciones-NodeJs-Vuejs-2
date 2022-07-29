const Ciudadanos = require('../Models/Ciudadanos');
const Elecciones = require('../Models/Elecciones');
const { Op } = require('sequelize');


exports.GetAllCiudadanos = async (req, res, next) => {
    try {
        const buttonDesactivarIsActive = (await Elecciones.findAll({ where: { Estado: true } })).length > 0 ? false : true;
        const ciudadanos = (await Ciudadanos.findAll()).map(item => item.dataValues);
        res.json({Estado: true,  ciudadanos, buttonDesactivarIsActive });
    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }
}

exports.GetCiudadanoById = async (req, res, next) => {

    const id = req.params.id;

    try {
        const ciudadano = await Ciudadanos.findByPk(id);
        console.log(ciudadano);
        if (ciudadano) {
            res.json({ Estado: true, ciudadano: ciudadano.dataValues });
        }else{
            res.json({ Estado: false, msg: "No existe  ningun ciudadano con ese id" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }


}

exports.PostAddCiudadanos = async (req, res, next) => {

    const { body } = req;

    try {
        await Ciudadanos.create(body);
        res.json({ Estado: true, msg: "Ciudadano agregado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }
}

exports.PostEditCiudadanos = async (req, res, next) => {

    const id = req.params.id;
    const { body } = req;

    try {
        await Ciudadanos.update(body, { where: { DocumentoDeIdentidad: id } });
        res.json({ Estado: true, msg: "Ciudadano editado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }

}

exports.GetChangeEstadoCiudadanos = async (req, res, next) => {

    const id = req.params.id;
    const { body } = req;

    try {
        const ciudadano = await Ciudadanos.findByPk(id);
        if (ciudadano) {
            ciudadano.update({ Estado: !ciudadano.dataValues.Estado });
            res.json({ Estado: true, msg: "Estado modificado correctamente" });
        } else {
            res.json({ Estado: false, msg: "No existe  ningun ciudadano con ese id" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }
}
