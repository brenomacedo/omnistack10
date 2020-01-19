const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')
const http = require('http')
const server = http.Server(app)
const { setupWebsocket } = require('./websocket')
require('dotenv').config()
setupWebsocket(server)

mongoose.connect('mongodb://'+process.env.HOST+'/'+process.env.DATABASE, { useNewUrlParser: true })


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(routes)



server.listen(3333)