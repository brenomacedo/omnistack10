import socketio from 'socket.io-client'
import { BASEURL } from 'react-native-dotenv

const socket = socketio(process.env.BASEURL, {
    autoConnect: false
})

function connect(latitude, longitude, techs){

    socket.io.opts.query = {
        latitude, longitude, techs
    }
    socket.connect()
}

function disconnect(){
    if(socket.connect){
        socket.disconnect()
    }
}

function subscribeToNewDevs(subscribeFunction){
    socket.on('new-dev', subscribeFunction)
}

export {
    connect,
    disconnect,
    subscribeToNewDevs
}
