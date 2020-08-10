const express = require('express')
const routes = express.Router()
const authMiddleware = require('./middlewares/auth')
const animesController = require('./controllers/animesController')
const usersController = require('./controllers/usersController')
const categoriesController = require('./controllers/categoriesController')

routes.use(authMiddleware)

// change animes
routes.post('/newanime', animesController.createAnime)
routes.post('/editanime', animesController.editAnime)
routes.delete('/deleteanime', animesController.deleteAnime)

//renovar token
routes.post('/renewtoken', usersController.renewtoken)
routes.post('/updateuser', usersController.updateUser)

//categorias
routes.post('/newcategory', categoriesController.createCategory)
routes.post('/editcategory', categoriesController.editCategory)
routes.post('/deletecategory', categoriesController.deleteCategory)

module.exports = routes