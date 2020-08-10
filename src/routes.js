const express = require('express');
const routes = express.Router();
const usersController = require('./controllers/usersController.js');
const animesController = require('./controllers/animesController.js');
const categoriesController = require('./controllers/categoriesController.js');

//rotas
// routes.get('/', (req, res) => res.send('ANIFLIX API HOME!'))
routes.get('/animes', animesController.showAll)
routes.get('/categories', categoriesController.showAll)
routes.get('/anime', animesController.selectAnime)

// // //login
routes.post('/signin', usersController.signin)
routes.post('/signup', usersController.signup)


module.exports = routes;
