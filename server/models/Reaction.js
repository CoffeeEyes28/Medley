const { Schema, model } = require('mongoose');



const reactionSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
    },
);

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;