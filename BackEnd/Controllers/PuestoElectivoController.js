const PuestoElectivo = require('../Models/PuestoElectivo');
const Partidos = require('../Models/Partidos');
const Candidatos = require('../Models/Candidatos');
const Elecciones = require('../Models/Elecciones');
const { Op } = require('sequelize');


exports.GetAllPuestoElectivo = async (req, res, next) => {
    try {
        const buttonDesactivarIsActive = (await Elecciones.findAll({ where: { Estado: true } })).length > 0 ? false : true;
        const puestosElectivos = (await PuestoElectivo.findAll()).map(item => item.dataValues);
        console.log(puestosElectivos)
        res.json({ Estado: true, puestosElectivos, buttonDesactivarIsActive });
    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }
}

exports.GetPuestoElectivoById = async (req, res, next) => {
    const id = req.params.id;

    if (id) {
        try {
            const puestoElectivo = await PuestoElectivo.findByPk(id);
            if (puestoElectivo) {
                res.json({ Estado: true, EditIsActive: true, puestoElectivo: puestoElectivo.dataValues });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ title: "errors", msg: error.message }).end();
        }
    } else {
        res.json({ Estado: true, msg: "No existe ningun puesto electivo con este id", id });
    }
}

exports.PostAddPuestoElectivo = async (req, res, next) => {
    const { body } = req;

    try {
        const { dataValues: puesto } = await PuestoElectivo.create(body);
        const partidosExist = (await Partidos.findAll({ where: { Nombre: { [Op.not]: '/*bla*/' } } })).length > 0;
        let partido = 0;
        !partidosExist
            ? partido = await Partidos.create({ Nombre: 'Ninguno', Descripcion: '/*bla*/', Logo: '/*bla*/', Estado: true })
            : partido = Partidos.findOne({ where: { Nombre: '/*bla*/' } }).dataValues;
        await Candidatos.create({
            Nombre: 'Ninguno',
            Apellido: 'Ninguno',
            partidoId: partido?.Id,
            puestoElectivoId: puesto?.Id,
            Foto: 'https://elmunicipalista.net/wp-content/uploads/2019/11/23d5d064c34ff6b5b14cf3300447a5cc.jpg',
            Estado: true
        });
        res.json({ Estado: true, msg: "Puesto electivo agregado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }
}

exports.PostEditPuestoElectivo = async (req, res, next) => {
    const id = req.params.id;
    const { body } = req;

    try {
        await PuestoElectivo.update(body, { where: { Id: id } });
        res.json({ Estado: true, msg: "Puesto electivo modificado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }

}

exports.GetchangeestadoPuestoElectivo = async (req, res, next) => {

    const id = req.params.id;

    try {
        const puestoElectivo = await PuestoElectivo.findByPk(id);
        if (puestoElectivo) {
            if (puestoElectivo.dataValues.Estado) {
                const candidatosFromThisPuesto = await Candidatos.findAll({ where: { Estado: true, puestoElectivoId: puestoElectivo.dataValues.Id, Nombre: { [Op.not]: 'Ninguno' } } });
                candidatosFromThisPuesto.forEach(async (element) => {
                    const candidato = await Candidatos.findByPk(element.dataValues.Id);
                    candidato.update({ Estado: false })
                });
            }
            puestoElectivo.update({ Estado: !puestoElectivo.dataValues.Estado });
            res.json({ Estado: true, msg: "Estado modificado correctamente" });
        } else {
            res.json({ Estado: false, msg: "No existe ningun puesto electivo con este id", id });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }
}

exports.GetPuestosElectoralesByDIdentidad = async (req, res, next) => {
    const { DIdentidad } = req.params;

    if (req.session.ElectorIsAuthenticated) {
        try {
            const eleccionEnCurso = await Elecciones.findOne({ where: { Estado: true } });
            const VotosRealizados = (await Votos.findAll({ where: { CiudadanoId: DIdentidad, EleccionId: eleccionEnCurso.dataValues.Id } })).map(item => item.dataValues);
            const Puestos = (await PuestoElectivo.findAll({ where: { Estado: true } })).map((item) => {
                const puesto = VotosRealizados.find(itemPuesto => item.Id == itemPuesto.PuestoElectivoId);
                return puesto ? { ...item.dataValues, DIdentidad, Completado: true } : { ...item.dataValues, DIdentidad, Completado: false }
            });
            res.json({ PageTitle: 'Puestos Electorales', Puestos: Puestos });
        } catch (error) {
            console.log(error);
            res.status(500).json({ title: "errors", msg: error.message }).end();
        }
    }
}