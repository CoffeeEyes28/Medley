
const { Schema } = require('mongoose');

const recordSchema = new Schema({
    artist: {
        type: String,
        required: true,
    },
    album_name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
<<<<<<< HEAD
    topFour: {
        type: Boolean,
        default: false
=======
    topFour:{
        type: Boolean,
        default: false

>>>>>>> main
    }
})


module.exports = recordSchema;