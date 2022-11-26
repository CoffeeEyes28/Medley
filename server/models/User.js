
const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const recordSchema = require('./Record');
const reactionSchema = require('./Reaction');

const userSchema = new Schema({
    username: {
        type: String,
        required: true, 
        unique: true, 
    },
    email: {
        type: String, 
        required: true, 
        unique: true, 
        match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
        type: String,
        required: true,
    },

    medley: [recordSchema],

    topFour: [recordSchema],

    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reaction'
        },
    ],

    reacted: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reaction'
        },
    ],


},
{
    toJSON: {
        virtuals: true,
    }
}

);





userSchema.pre('save', async function (next) {
    if(this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  userSchema.virtual('medleyTotal').get(function () {
    return this.medley.length;
  });

  userSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });


  userSchema.virtual('reactedCount').get(function () {
    return this.reacted.length;
  });


const User = model('User', userSchema);

module.exports = User;