import axios from 'axios';
const key = process.env.REACT_APP_API_KEY_FM



const search = (query) =>
axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${query}&api_key=${key}&format=json`)

export default search;