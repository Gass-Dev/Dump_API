// Imports
const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwt.utils");
const models = require('../models');

// Routes
module.exports = {
    register: (req, res) => {
        // Params
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let numberstreet = req.body.numberstreet;
        let street = req.body.street;
        let postalcode = req.body.postalcode;
        let city = req.body.city;
        // console.log(username, email, password, firstname, lastname, numberstreet, street, postalcode, city)
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
        models.Users.findOne({
            attributes: ['email'],
            where: {
                email: email
            },
        })
            .then((userFound) => {
                if (!userFound) {
                    bcrypt.hash(password, 5, (err, bcryptedPassword) => {
                        let newUser = models.Users.create({
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
                                // console.log(err)
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
        console.log("email",email);
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
        models.Users.findOne({
            where: {
                email: email
            },
        })
            .then((userFound) => {
                if (userFound) {
                    const json = JSON.parse(JSON.stringify(userFound))
                    console.log("json",json)
                    
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