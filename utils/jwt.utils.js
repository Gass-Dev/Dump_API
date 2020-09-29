// Imports
const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'aj1dh6fhvrj44jdsj25fdlsfdkq9snf64kdsnc7djkscn2';
// Exported functions
module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
    JWT_SIGN_SECRET,
    {
        expiresIn: '1h'
    })
    },
}