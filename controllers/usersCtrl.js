// Imports
const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwt.utils");
const models = require('../models');

// Routes
module.exports = {
    register: (req, res) => {
        // Params
        let username = req.body.userName;
        let email = req.body.email;
        let password = req.body.password;
        let firstname = req.body.firstName;
        let lastname = req.body.lastName;
        let numberstreet = req.body.numberStreet;
        let street = req.body.street;
        let postalcode = req.body.postalCode;
        let city = req.body.city;

        if (
            username == null ||
            email == null ||
            password == null ||
            firstname == null ||
            lastname == null ||
            numberstreet == null ||
            street == null ||
            postalcode == null ||
            city == null
        ) {
            return res.status(400).json({
                error: "missing parameters"
            });
        }

        models.User.findOne({
            attributes: ['email'],
            where: { email: email },
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
                            numberStreet: numberstreet,
                            street: street,
                            postalCode: postalcode,
                            city: city
                        })
                            .then((newUser) => {
                                return res.status(201).json({
                                    userId: newUser.id,
                                })
                            })
                            .catch((err) => {
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

    login: (req, res) => {
        // Params
        let email = req.body.email;
        let password = req.body.password;

        if (
            email == null ||
            password == null
        ) {
            return res.status(400).json({
                error: 'missing parameters'
            });
        }

        // To do verify mail regex & password login
        models.User.findOne({
            where: { email: email },
        })
            .then((userFound) => {
                if (userFound) {
                    const json = JSON.parse(JSON.stringify(userFound))

                    bcrypt.compare(password, json.password, (errBycrypt, resBycrypt) => {
                        if (resBycrypt) {
                            return res.status(200).json({
                                'userId': json.id,
                                'token': jwtUtils.generateTokenForUser(json)
                            });
                        } else {
                            return res.status(403).json({
                                "error": "invalid password"
                            });
                        }
                    });
                } else {
                    return res.status(404).json({
                        'error': 'user not exist un DB'
                    });
                }
            })
            .catch((err) => {
                return res.status(500).json({
                    'error': err
                });
            });
    }
}

