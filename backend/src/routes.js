const { Router } = require('express')
const routes = Router()
const axios = require('axios')
const Dev = require('./models/Dev')
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)
routes.get('/search', SearchController.index)
routes.put('/devs/:id', DevController.update)
routes.delete('/devs/:id', DevController.destroy)

module.exports = routes