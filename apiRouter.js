// Imports
const express = require('express');
const apiRouter = express.Router();

const authenticate_handler = require('./middleware/authentif_handler');

const usersCtrl = require('./controllers/usersCtrl');
const postsReportCtrl = require('./controllers/postsReportCtrl');

const models = require('./models');

// Router
exports.router = (() => {

    apiRouter.get("/user/me", authenticate_handler, async (request, response) => {
        const user = await models.User.findByPk(request.user.userId);
        response.status(200).json(user);
    });

    // Users routes
    apiRouter.post('/users/login', usersCtrl.login);
    apiRouter.post('/users/register', usersCtrl.register);

    // Posts routes
    apiRouter.post('/postreports/post', authenticate_handler, postsReportCtrl.createPostReport);

    // Gets routes
    apiRouter.get('/postreports', authenticate_handler, postsReportCtrl.getAllPostReport);
    // apiRouter.get('register', authenticate_handler, usersCtrl.getAllUser);
    // apiRouter.get('register/:id', authenticate_handler, usersCtrl.getOneUser);
    // apiRouter.get("/posts", authenticate_handler, postsReportCtrl.getAllPost);
    // apiRouter.get("/posts/:id", authenticate_handler, postsReportCtrl.getOnePost);

    // Patch routes
    // apiRouter.patch("register/:id", authenticate_handler, usersCtrl.editUser);
    // apiRouter.patch("postreports/:id", authenticate_handler, postsReportCtrl.editPost);

    // Delete routes
    // apiRouter.delete("/users/register/:id", authenticate_handler, usersCtrl.deleteUser);
    // apiRouter.delete("/users/postreports/:id", authenticate_handler, postsReportCtrl.deletePost);

    return apiRouter;
})();

