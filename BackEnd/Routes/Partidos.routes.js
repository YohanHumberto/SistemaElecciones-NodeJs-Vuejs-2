const express = require('express');
const router = express.Router();

const AdminIsAuthMiddleware = require('../Middleware/AdminIsAuth');
const PartidosController = require('../Controllers/PartidosController');

router.get('/partidos/GetAll', AdminIsAuthMiddleware, PartidosController.GetAllPartidos);
router.post('/partidos/agregar', AdminIsAuthMiddleware, PartidosController.PostAddPartidos);
router.get('/partidos/GetById:id', AdminIsAuthMiddleware, PartidosController.GetPartidosById);
router.post('/partidos/editar:id', AdminIsAuthMiddleware, PartidosController.PostEditPartidos);
router.get('/partidos/changeestado:id', AdminIsAuthMiddleware, PartidosController.GetChangeEstadoPartidos);

module.exports = router;