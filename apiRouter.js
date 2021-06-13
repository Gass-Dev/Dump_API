// Imports
const express = require('express');
const apiRouter = express.Router();

const authenticate_handler = require('./middleware/authentif_handler');

const usersCtrl = require('./controllers/usersCtrl');
const postsReportCtrl = require('./controllers/postsReportCtrl');

const models = require('./models');

// Router
exports.router = (() => {

    apiRouter.get("/user/me", authenticate_handler, async (req, res) => {
        const user = await models.User.findByPk(req.userId);
        res.status(200).json(user);
    });

    // Users routes posts
    apiRouter.post('/users/login', usersCtrl.login);
    apiRouter.post('/users/register', usersCtrl.register);

    // Posts routes
    apiRouter.post('/post_reports/post', postsReportCtrl.createPostReport);

    // Gets routes
    apiRouter.get('/post_reports/post', postsReportCtrl.getAllPostReport);

    // apiRouter.get("/posts", postsReportCtrl.getAllPost);
    // apiRouter.get("/posts/:id", postsReportCtrl.getOnePost);

    // Patch routes
    // apiRouter.patch("register/:id", usersCtrl.editUser);
    // apiRouter.patch("postreports/:id", postsReportCtrl.editPost);

    // Delete routes
    // apiRouter.delete("/users/postreports/:id", postsReportCtrl.deletePost);

    return apiRouter;
})();

