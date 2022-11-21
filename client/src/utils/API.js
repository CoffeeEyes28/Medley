import axios from 'axios';
const key = process.env.REACT_APP_API_KEY
const secret = process.env.REACT_APP_API_SECRET


const search = (query) =>
axios.get(`https://api.discogs.com/database/search?q=${query}&key=${key}&secret=${secret}`)

export default search;