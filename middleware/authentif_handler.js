const jwtUtils = require('../utils/jwt.utils');

module.exports = (req, res, next) => {
    const headersAuth = req.headers["authorization"];
    const userId = jwtUtils.getUserId(headersAuth, res);
    if (userId < 0) {
        return res.status(401).json({
            'error': 'please authenticate to access'
        });
    };
    console.log("on passe par le authentif_handler", userId);
    req.userId = userId;
    req.body.userId = userId;
    next();
}