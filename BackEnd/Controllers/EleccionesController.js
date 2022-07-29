const PuestoElectivo = require('../Models/PuestoElectivo');
const Candidatos = require('../Models/Candidatos');
const Elecciones = require('../Models/Elecciones');
const Votos = require('../Models/Votos');
const { Op } = require('sequelize');


exports.GetAllElecciones = async (req, res, next) => {
    try {
        const ExistElectionActive = (await Elecciones.findAll({ where: { Estado: true } })).map(item => item.dataValues).length > 0 ? true : false;
        const elecciones = (await Elecciones.findAll()).map(item => item.dataValues);
        res.json({ Estado: true, elecciones, ExistElectionActive })
    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }
}

exports.PostAddElecciones = async (req, res, next) => {
    const { body } = req;

    try {
        const CantidadDeCandidatos = (await Candidatos.findAll({ where: { Estado: true, Nombre: { [Op.not]: 'Ninguno' } } })).length;
        if (CantidadDeCandidatos >= 2) {
            await Elecciones.create(body);
            res.json({ Estado: true, msg: "Eleccion agregada correctamente" });

        } else {
            res.json({ Estado: false, msg: "No se pudo crear la eleccion, porque no hay suficientes candidatos activos o creados" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }
}

exports.GetResultadosElecciones = async (req, res, next) => {

    const { IdEleccion } = req.params;

    try {
        const votos = (await Votos.findAll({ where: { EleccionId: IdEleccion } })).map(item => item.dataValues);

        const candidatos = (await Candidatos.findAll()).map(item => {
            return { ...item.dataValues, CantidadDeVotos: votos.filter(itemV => itemV.CandidatoId == item.Id).length }
        }).sort((a, b) => a.CantidadDeVotos - b.CantidadDeVotos).reverse();
        console.log(candidatos);

        const puestosElectivos = (await PuestoElectivo.findAll({ where: { Estado: true } })).map(item => {
            return { ...item.dataValues, TotalVotosPorPuesto: votos.filter(itemf => itemf.PuestoElectivoId == item.Id).length }
        });

        const NewPuesto = puestosElectivos.map(item => { return { ...item, candidatos: candidatos.filter(c => c.puestoElectivoId == item.Id) } });

        res.json({ Estado: true, Resultado: NewPuesto });

    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }
}

exports.GetChangeStateEleccionToFalse = async (req, res, next) => {
    const { id } = req.params;

    try {
        const eleccion = await Elecciones.findByPk(id);
        eleccion.update({ ...eleccion, Estado: false });
        res.json({ Estado: true, msg: "Estado modificado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }
}

