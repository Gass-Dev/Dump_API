// Imports
const express = require('express');
const usersCtrl = require('./controllers/usersCtrl');
const postsReportCtrl = require('./controllers/postsReportCtrl');
const apiRouter = express.Router();
const authenticate_handler = require("./middleware/authentif_handler");

// Router
exports.router = (() => {

    // Users routes
    apiRouter.post('/users/login', usersCtrl.login);
    apiRouter.post('/users/register', usersCtrl.register);

    // Posts routes
    apiRouter.post('/postreports/post', authenticate_handler,  (req, res)=>{
        postsReportCtrl.createPostReport(req.body)
    });

    return apiRouter;
})();

