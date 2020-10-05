// Imports
const models = require('../models');

// Routes
module.exports = {
    createPostReport: (req, res) => {
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
    }
}