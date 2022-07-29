const express = require('express');
const router = express.Router();

const AuthRoutes = require("./Auth.routes");
const CandidatosRoutes = require("./Candidatos.routes");
const CiudadanosRoutes = require("./Ciudadanos.routes");
const EleccionesRoutes = require("./Elecciones.routes");
const PartidosRoutes = require("./Partidos.routes");
const PuestoElectivoRoutes = require("./PuestoElectivo.routes");
const VotoRoutes = require("./Voto.routes");


router.use(AuthRoutes);
router.use(CandidatosRoutes);
router.use(CiudadanosRoutes);
router.use(EleccionesRoutes);
router.use(PartidosRoutes);
router.use(PuestoElectivoRoutes);
router.use(VotoRoutes);


module.exports = router;