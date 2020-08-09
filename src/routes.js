const express = require('express');
const routes = express.Router();
const usersController = require('./controllers/usersController.js');
const animesController = require('./controllers/animesController.js');

//rotas
// routes.get('/', (req, res) => res.send('ANIFLIX API HOME!'))
routes.get('/animes', animesController.showAll)


// // //login
routes.post('/signin', usersController.signin)
routes.post('/signup', usersController.signup)
routes.post('/update', usersController.updateUser)

module.exports = routes;
