const PuestoElectivo = require('../Models/PuestoElectivo');
const Partidos = require('../Models/Partidos');
const Candidatos = require('../Models/Candidatos');
const Elecciones = require('../Models/Elecciones');
const { Op } = require('sequelize');



exports.GetAllCandidatos = async (req, res, next) => {

    try {
        const buttonDesactivarIsActive = (await Elecciones.findAll({ where: { Estado: true } })).length > 0 ? false : true;
        const partidosLength = (await Partidos.findAll({ where: { Estado: true, Nombre: { [Op.not]: '/*bla*/' } } })).length;
        const puestosLength = (await PuestoElectivo.findAll({ where: { Estado: true } })).length;
        const candidatos = (await Candidatos.findAll({ where: { Nombre: { [Op.not]: 'Ninguno' } } })).map(item => item.dataValues).filter(item => item.PartidoId !== -1 && item);
        const AgregarIsActive = partidosLength > 0 && puestosLength > 0 ? true : false;

        res.json({ Estado: true, candidatos, AgregarIsActive, buttonDesactivarIsActive });
    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }

}

exports.GetCandidatosById = async (req, res, next) => {

    const id = req.params.id;
    const puestos = (await PuestoElectivo.findAll({ where: { Estado: true } })).map(item => item.dataValues);
    const partidos = (await Partidos.findAll({ where: { Estado: true, Nombre: { [Op.not]: 'Ninguno' } } })).map(item => item.dataValues);

    try {
        const candidato = await Candidatos.findByPk(id);
        const newPuesto = puestos.map(item => { return { ...item, candidato: candidato.dataValues } });
        const newPartido = partidos.map(item => { return { ...item, candidato: candidato.dataValues } });

        res.json({
            Estado: true,
            EditIsActive: true,
            candidato: candidato.dataValues,
            puestos: newPuesto,
            partidos: newPartido,

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }



}

exports.PostAddCandidato = async (req, res, next) => {

    const { body } = req;
    // const fotopath = req?.file?.path;

    try {
        await Candidatos.create({ ...body, Foto: "/" });
        res.json({ Estado: true, msg: 'Candidato agregado correctamente' }).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }

}

exports.PostEditCandidatos = async (req, res, next) => {

    const id = req.params.id;
    const { body } = req;
    const fotopath = req?.file?.path;

    try {

        fotopath
            ? await Candidatos.update({ ...body, Foto: "/" + fotopath }, { where: { Id: id } })
            : await Candidatos.update(body, { where: { Id: id } })

        res.json({ Estado: true, msg: 'Candidato editado correctamente' }).end();

    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }
}

exports.GetChangeEstadoCandidatos = async (req, res, next) => {

    const id = req.params.id;

    try {
        const candidato = await Candidatos.findByPk(id);
        if (candidato) {
            candidato.update({ Estado: !candidato.dataValues.Estado });
            res.json({ Estado: true, msg: 'Estado modificado correctamente' }).end();
        } else {
            res.json({ Estado: false, msg: 'No existe ningun candidato con este id' }).end();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }
}

exports.GetCandidatosByDIdentidadAndPuesto = async (req, res, next) => {
    const { puesto } = req.params;
    const { DIdentidad } = req.params;
    try {
        const candidatos = (await Candidatos.findAll({ where: { puestoElectivoId: puesto, Estado: true }, include: [PuestoElectivo, Partidos], })).map(item => {
            return { ...item?.dataValues, puesto_electivo: { ...item?.dataValues.puesto_electivo?.dataValues }, partido: { ...item?.dataValues.partido?.dataValues } }
        });
        console.log(candidatos)
        res.json({ Estado: true, candidatos, DIdentidad });

    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }
}

