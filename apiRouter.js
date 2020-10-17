// Imports
const express = require('express');
const usersCtrl = require('./controllers/usersCtrl');
const postsReportCtrl = require('./controllers/postsReportCtrl');
const apiRouter = express.Router();
const authenticate_handler = require("./middleware/authentif_handler");
const jwtUtils = require('./utils/jwt.utils');

// Router
exports.router = (() => {
    // Users routes
    apiRouter.post('/users/login', usersCtrl.login);
    apiRouter.post('/users/register', usersCtrl.register);

    // Posts routes
    apiRouter.post('/postreports/post', authenticate_handler, postsReportCtrl.createPostReport);

    // Gets routes
    apiRouter.get('/postreports', postsReportCtrl.getAllPostReport);

    return apiRouter;
})();

