// Imports
const models = require('../models');
const jwtUtils = require("../utils/jwt.utils");

// Routes
module.exports = {
    createPostReport: (req, res) => {
        // Getting auth header
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        // Params
        let numberstreet = req.body.numberstreet;
        let street = req.body.street;
        let postalcode = req.body.postalcode;
        let city = req.body.city;
        let report = req.body.report;

        if (
            numberstreet == null ||
            street == null ||
            postalcode == null ||
            city == null ||
            report == null
        ) {
            return res.status(400).json({
                error: "please fill every input"
            });
        }

        if (report == ("encombrant" || "déchet" || "insalubrité")) {
            return res.status(400).json({ error: "please choose one type of report" });
        }

        models.User.findOne({
            attributes: ['userId'],
            where: { id: userId }

                .then((userFound) => {
                    document(null, userFound);
                })
                .catch((err) => {
                    return res.status(500).json({
                        'error': err
                    });
                })
        })

        let newPost = models.PostReport.create({
            numberStreet: numberstreet,
            idUser: req.body.userId,
            street: street,
            postalCode: postalcode,
            city: city,
            report: report
        })
            .then((newPost) => {
                return res.status(201).json({ newPost })
            })
            .catch((err) => {
                return res.status(500).json({
                    'error': 'cannot add post'
                });
            });
    },
    getAllPostReport: (req, res) => {
        models.PostReport.findAll()
            .then((posts) => {
                return res.status(201).json({ posts })
            })
            .catch((err) => {
                return res.status(500).json({
                    'error': 'cannot add post'
                });
            });
    }
}