const express = require('express');
const router = express.Router();

const AdminIsAuthMiddleware = require('../Middleware/AdminIsAuth');
const CiudadanosController = require('../Controllers/CiudadanosController');

router.get('/ciudadanos/GetAll', AdminIsAuthMiddleware, CiudadanosController.GetAllCiudadanos);
router.post('/ciudadanos/agregar', AdminIsAuthMiddleware, CiudadanosController.PostAddCiudadanos);
router.get('/ciudadanos/GetById:id', AdminIsAuthMiddleware, CiudadanosController.GetCiudadanoById);
router.post('/ciudadanos/editar:id', AdminIsAuthMiddleware, CiudadanosController.PostEditCiudadanos);
router.get('/ciudadanos/changeestado:id', AdminIsAuthMiddleware, CiudadanosController.GetChangeEstadoCiudadanos);

module.exports = router;