const express = require('express');
const router = express.Router();

const VotoController = require('../Controllers/VotoController');
const ElectorIsAuthMiddleware = require('../Middleware/ElectorIsAuth');

router.post('/Voto/:DIdentidad', ElectorIsAuthMiddleware, VotoController.PostRealizarVoto);

module.exports = router;