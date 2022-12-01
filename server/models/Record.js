
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
    topFour: {
        type: Boolean,
        default: false
    }
})


module.exports = recordSchema;