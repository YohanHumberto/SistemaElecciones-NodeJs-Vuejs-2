const PuestoElectivo = require('../Models/PuestoElectivo');
const Candidatos = require('../Models/Candidatos');
const Votos = require('../Models/Votos');
const Elecciones = require('../Models/Elecciones');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "jjimenesjonsales@gmail.com",
        pass: "8297663269", // naturally, replace both with your real credentials or an application-specific password
    },
});


exports.PostRealizarVoto = async (req, res, next) => {
    const { DIdentidad } = req.params;

    try {

        const { CandidatoIdSeleccionado } = req.body;

        const { Id } = await Elecciones.findOne({ where: { Estado: true } });
        const { puestoElectivoId } = await Candidatos.findOne({ where: { Id: CandidatoIdSeleccionado } });
        await Votos.create({ EleccionId: Id, CiudadanoId: DIdentidad, CandidatoId: CandidatoIdSeleccionado, PuestoElectivoId: puestoElectivoId });

        const cantidadDeVotos = (await Votos.findAll({ where: { EleccionId: Id, CiudadanoId: DIdentidad } })).length;
        const CantidadDePuestoElectivos = (await PuestoElectivo.findAll({ where: { Estado: true } })).length;

        if (cantidadDeVotos !== CantidadDePuestoElectivos) {
            console.log('///////////////////this is mail ////////////////////');
            await transporter.sendMail({
                from: "jjimenesjonsales@gmail.com",
                to: "rijoyohan52@gmail.com",
                subject: `Welcome`,
                html: `Usted  ha completado su proceso de votacion con exito`,
            }).then(() => console.log('mesage enviado con exito')).catch(error => console.error(error));
        }

        res.json({ msg: `Voto realizado correctamente`, DIdentidad});

    } catch (error) {
        console.log(error);
        res.status(500).json({ title: "errors", msg: error.message }).end();
    }
}



