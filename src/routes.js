const express = require('express');

const UserController = require('./controllers/UsersController');
const SessionController = require('./controllers/SessionController');
const multer = require('multer');
const uploads = multer();
const routes = express.Router();
const multerCONF = require("./config/multer");
const auth = require("./middleware/authentication");

routes.post('/user', multer(multerCONF).single("file") , SessionController.register);
routes.post('/login', uploads.none(), SessionController.login);

routes.use(auth)
routes.get('/user/:id', UserController.find);
routes.patch('/user/:id', multer(multerCONF).single("file") , UserController.patch);
routes.delete('/user/:id', uploads.none(), UserController.purge);

routes.get('/user', UserController.index);


module.exports = routes;