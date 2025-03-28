module.exports.isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(403).json("Forbidden.");
    }
    next();
}
