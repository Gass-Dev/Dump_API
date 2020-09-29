// Imports
const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwt.utils");
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
        const numberstreet = req.body.numberstreet;
        const street = req.body.street;
        const postalcode = req.body.postalcode;
        const city = req.body.city;
        //console.log(username, email, password, firstname, lastname, numberstreet, street, postalcode, city)
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
                                numberstreet: numberstreet,
                                street: street,
                                postalCode: postalcode,
                                city: city
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
    login: (req, res) => {
        // Params
        let email    = req.body.email;
        let password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({'error': 'missing parameters' });
        }

        // To do verify mail regex & password login
        models.User.findOne({
            where: {email: email}
        })
        .then((userFound) => {
            if (userFound) {
                bcrypt.compare(password, userFound.password, (errBycrypt, resBycrypt) => {
                    if(resBycrypt) {
                        return res.status(200).json({
                            'userId': userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
                    } else {
                        return res.status(403).json({ "error": "invalid password" });
                    }
                });
            } else {
                return res.status(404).json({ 'error': 'user not exist un DB' });
            }
        })
        .catch((err) => {
            return res.status(500).json({ 'error': 'unable to verify user' });
        });
    }
}