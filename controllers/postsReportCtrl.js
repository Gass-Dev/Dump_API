// Imports
const models = require("../models");
const jwtUtils = require("../utils/jwt.utils");

// Routes
module.exports = {
    createPostReport: (req, res) => {
        // Getting auth header
        const headerAuth = req.headers["authorization"];
        // const userId = jwtUtils.getUserId(headerAuth);

        // Params
        const userId = req.body.userId;
        const numberstreet = req.body.numberStreet;
        const street = req.body.street;
        const postalcode = req.body.postalCode;
        const city = req.body.city;
        const report = req.body.report;

        if (
            numberstreet == null ||
            street == null ||
            postalcode == null ||
            city == null ||
            report == null
        ) {
            return res.status(400).json({
                error: "please fill every input",
            });
        }

        if (report == ("encombrant" || "déchet" || "insalubrité")) {
            return res
                .status(400)
                .json({
                    error: "please choose one type of report"
                });
        }

        let newPost = models.PostReport.create({
            idUser: userId,
            report: report,
            numberStreet: numberstreet,
            street: street,
            postalCode: postalcode,
            city: city,
        })
            .then((newPost) => {
                return res.status(201).json({
                    newPost
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    error: "cannot add post",
                });
            });
    },

    getAllPostReport: (req, res) => {
        models.PostReport.findAll()
            .then((posts) => {
                return res.status(201).json({
                    posts
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    error: "cannot add post",
                });
            });
    },
};