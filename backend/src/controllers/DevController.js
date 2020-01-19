const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessages } = require('../websocket')

module.exports = {

    async index(req, res) {
        const devs = await Dev.find()

        return res.json(devs)
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body

        let dev = await Dev.findOne({
            github_username
        })

        if(!dev){
            const response = await axios.get(`https://api.github.com/users/${github_username}`)
            let {name = login, avatar_url, bio} = response.data
        
            const techsArray = parseStringAsArray(techs)
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })

            const sendSocketMessageTo = findConnections(
                {latitude, longitude}, techsArray
            )

            sendMessages(sendSocketMessageTo, 'new-dev', dev)
        }
    
    
    
        return res.json(dev)
    },

    async destroy(req, res){
        await Dev.findOneAndDelete({
            _id: req.params.id
        })

        return res.json({})
    },

    async update(req, res){
        const dev = await Dev.findOneAndUpdate({_id: req.params.id}, {name: req.body.name})

        return res.json(dev)
    }
}