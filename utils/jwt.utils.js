const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'aj1dh6fhvrj44jdsj25fdlsfdkq9snf64kdsnc7djkscn2';
// Exported functions
module.exports = {
    generateTokenForUser: function (userData) {
        return jwt.sign({
            userId: userData.id,
        },
            JWT_SIGN_SECRET,
            {
                expiresIn: '10h'
            })
    },
    parseAuthorization: function (authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getUserId: function (authorization, res) {
        const userId = -1;
        var token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null) {
                    userId = jwtToken.userId
                }
            } catch (err) {
                res.status(401).json({ error: "invalid token" })
            }
        }
        return userId;
    }
}

