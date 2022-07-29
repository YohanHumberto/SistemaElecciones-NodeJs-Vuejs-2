const express = require('express');
const router = express.Router();

const AdminIsAuthMiddleware = require('../Middleware/AdminIsAuth');
const PuestoElectivoController = require('../Controllers/PuestoElectivoController');
const ElectorIsAuthMiddleware = require('../Middleware/ElectorIsAuth');


router.get('/puesto-electivo/GetAll', AdminIsAuthMiddleware, PuestoElectivoController.GetAllPuestoElectivo);
router.post('/puesto-electivo/agregar', AdminIsAuthMiddleware, PuestoElectivoController.PostAddPuestoElectivo);
router.get('/puesto-electivo/GetById:id', AdminIsAuthMiddleware, PuestoElectivoController.GetPuestoElectivoById);
router.post('/puesto-electivo/editar:id', AdminIsAuthMiddleware, PuestoElectivoController.PostEditPuestoElectivo);
router.get('/puesto-electivo/changeestado:id', AdminIsAuthMiddleware, PuestoElectivoController.GetchangeestadoPuestoElectivo);

router.get('/puesto-electivo/GetByDIdentidad/:DIdentidad', ElectorIsAuthMiddleware, PuestoElectivoController.GetPuestosElectoralesByDIdentidad);

module.exports = router;