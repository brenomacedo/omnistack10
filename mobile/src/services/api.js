import axios from 'axios'
import { BASEURL } from 'react-native-dotenv
const api = axios.create({
    baseURL: process.env.BASEURL
})

export default api
