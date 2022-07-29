const express = require('express');
const router = express.Router();

const AdminIsAuthMiddleware = require('../Middleware/AdminIsAuth');
const CandidatosController = require('../Controllers/CandidatosController');
const ElectorIsAuthMiddleware = require('../Middleware/ElectorIsAuth');


router.get('/candidatos/GetAll', AdminIsAuthMiddleware, CandidatosController.GetAllCandidatos);
router.get('/candidatos/GetById:id', AdminIsAuthMiddleware, CandidatosController.GetCandidatosById);
router.post('/candidatos/agregar', AdminIsAuthMiddleware, CandidatosController.PostAddCandidato);
router.post('/candidatos/editar:id', AdminIsAuthMiddleware, CandidatosController.PostEditCandidatos);
router.get('/candidatos/changeestado:id', AdminIsAuthMiddleware, CandidatosController.GetChangeEstadoCandidatos);

router.get('/puestos-electorales/candidatos:puesto/:DIdentidad', ElectorIsAuthMiddleware, CandidatosController.GetCandidatosByDIdentidadAndPuesto);


module.exports = router;