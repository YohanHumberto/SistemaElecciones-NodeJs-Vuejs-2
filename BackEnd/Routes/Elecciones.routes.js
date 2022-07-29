const express = require('express');
const router = express.Router();

const AdminIsAuthMiddleware = require('../Middleware/AdminIsAuth');
const EleccionesController = require('../Controllers/EleccionesController');

router.get('/elecciones/GetAll', AdminIsAuthMiddleware, EleccionesController.GetAllElecciones);
router.post('/elecciones/agregar', AdminIsAuthMiddleware, EleccionesController.PostAddElecciones);
router.get('/elecciones/chagestate:id', AdminIsAuthMiddleware, EleccionesController.GetChangeStateEleccionToFalse);
router.get('/elecciones/resultados:IdEleccion', AdminIsAuthMiddleware, EleccionesController.GetResultadosElecciones);

module.exports = router;