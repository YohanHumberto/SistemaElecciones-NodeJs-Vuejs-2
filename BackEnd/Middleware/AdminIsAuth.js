const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];

    jwt.verify(token, 'Secret Password', (err, user) => {
        if (err) {
            res.status(401).json({
                Estatus: false,
                error: 'Token inválido'
            })
        } else {
            if (!user?.IsAdmin) {
                res.status(401).json({
                    Estatus: false,
                    error: 'not authorized you need to be an administrator to access'
                })
            }
        }
    });

    next();
}