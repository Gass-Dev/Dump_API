// Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require('../models');

// Routes
module.exports = {
    register: (req, res) => {
        // Params
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const address = req.body.address;
        //console.log(username, email, password, firstname, lastname, address)
        if (
            username == null ||
            email == null ||
            password == null ||
            firstname == null ||
            lastname == null ||
            address == null
        ) {
            return res.status(400).json({
                error: "missing parameters"
            });
        }

        models.User.findOne({
                attributes: ['email'],
                where: {
                    email: email
                }
            })
            .then((userFound) => {
                if (!userFound) {
                    bcrypt.hash(password, 5, (err, bcryptedPassword) => {
                        let newUser = models.User.create({
                                email: email,
                                userName: username,
                                password: bcryptedPassword,
                                firstName: firstname,
                                lastName: lastname,
                                address: address
                            })
                            .then((newUser) => {
                                return res.status(201).json({
                                    'userId': newUser.id
                                })
                            })
                            .catch((err) => {
                                console.log(err)
                                return res.status(500).json({
                                    'error': 'cannot add user'
                                });
                            });
                    });

                } else {
                    return res.status(409).json({
                        'error': 'user already exist'
                    });
                }
            })
            .catch((err) => {
                return res.status(500).json({
                    'error': 'unable //to verify user'
                });
            });
    },

    login: (req, res) => {},
}