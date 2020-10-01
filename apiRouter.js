// Imports
const express = require('express');
const usersCtrl = require('./controllers/usersCtrl');
const apiRouter = express.Router();

// Router
exports.router = (() => {

    // Users routes
    apiRouter.post('/users/login', usersCtrl.login);
    apiRouter.post('/users/register', usersCtrl.register);

    // Posts routes
    apiRouter.post('/Post_Reports/post_report', postsReportCtrl.postReport);
    

    return apiRouter;
})();

