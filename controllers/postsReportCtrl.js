// Imports
const models = require('../models');
const async = require('async');
const jwtUtils = require('../utils/jwt.utils');

// Routes
module.exports = {
    createPostReport: (req, res) => {
        // Params
        const post = {
            numberstreet = req.body.numberstreet,
            street = req.body.street,
            postalcode = req.body.postalcode,
            city = req.body.city,
        };
        console.log(post.numberstreet);
    }
}