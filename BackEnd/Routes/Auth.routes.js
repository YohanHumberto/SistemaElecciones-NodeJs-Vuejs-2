const express = require('express');
const router = express.Router();

const AdminIsAuthMiddleware = require('../Middleware/AdminIsAuth');
const ElectorIsAuthMiddleware = require('../Middleware/ElectorIsAuth');
const AuthController = require('../Controllers/AuthController');

router.post('/login-admin', AuthController.PostLoginAdmin);
router.get('/logout-admin', AdminIsAuthMiddleware, AuthController.GetLogoutAdmin);

router.post('/login-elector', AuthController.PostLoginElector);
router.get('/logout-elector', ElectorIsAuthMiddleware, AuthController.GetLogoutElector);

module.exports = router;