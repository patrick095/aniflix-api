const express = require('express')
const routes = express.Router()
const authMiddleware = require('./middlewares/auth')
const animesController = require('./controllers/animesController')

routes.use(authMiddleware)

// change animes
routes.post('/newanime', animesController.createAnime)
routes.post('/editanime', animesController.editAnime)
routes.delete('/deleteanime', animesController.deleteAnime)

module.exports = routes