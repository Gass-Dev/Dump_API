// const jwtUtils = require('../utils/jwt.utils');

// Imports
const modelPostReport = require('../models').PostReport;

// Routes
module.exports = {

    // createPostReport : (data)=>{

    //     data.idUsers = 2
    //     data.idReports = 3

    //     modelPostReport.create(data)
    // }

    createPostReport: (req, res) => {
        // Params
        // const headersAuth = req.headers["authorization"];
        // const userId = jwtUtils.getUserId(headersAuth, res);
        // if (userId < 0){
        //     return res.status(401).json({error: "please authenticate to access"})
        // }

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

        if(report !== ("encombrant" || "déchet" || "insalubrité")){
            return res.status(400).json({ error:"please choose one type of report"});
        }

        // models.PostReports.findOne({
        //     where: { id: userId }
        // })
        //     .then((userFound) => {
        //         if(userFound) {
                    let newPost = models.PostReports.create({
                        numberStreet: numberstreet,
                        idUser: res.body.userId,
                        street: street,
                        postalCode: postalcode,
                        city: city,
                        report: report
                    })
                    .then((newPost)=> {
                        return res.status(201).json({newPost})
                    })
                    .catch((err) => {
                        //console.log(err)
                        return res.status(500).json({
                            'error': 'cannot add post'
                        });
                    });
                // } else {
                //     return res.status(409).json({
                //         'error': 'post already exist'
                //     });
                // }
            // })
            // .catch((err) => {
            //     return res.status(500).json({
            //         'error': 'unable //to verify post'
            //     });
            // });
    }
}