module.exports = (req, res, next) => {

    if (!req.session.ElectorIsAuthenticated) {
        return res.json({ Estado: false, msg: 'No esta autenticado como elector' });
    }

    next();
}