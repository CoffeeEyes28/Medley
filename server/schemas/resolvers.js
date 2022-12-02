const { AuthenticationError } = require('apollo-server-express');
const { User, Reaction } = require('../models');
const { signToken } = require('../utils/auth');
const mongoose = require('mongoose');

const resolvers = {
    Query: {

        users: async () => {
            return User.find();
        },

        user: async (parent, { username }) => {
            return User.findOne({ username: new RegExp('^'+username+'$', "i") });
        },

        me: async (parent, args, context) => {
            if(context.user){

                return User.findOne({ _id: context.user._id});
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user){
                throw new AuthenticationError('No user found with this email');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw){
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },

        saveRecord: async (parent, { input }, context) => {
            console.log("ADDMEDLEY")
            if(context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { medley: input } }, 
                    {new: true, runValidators: false}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        saveTop: async (parent, { input }, context) => {
            console.log("TOPFOUR")
            if(context.user){
                const userArray = await User.findOne({ _id: context.user._id})
                const topFourLength = userArray.topFour.length
                if (topFourLength < 4) {
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id},
                        { $addToSet: { topFour: input } },
                        {new: true, runValidators: false}
                    );
                    return updatedUser;
                } else {
                    return "Top Four already exists";
                } 
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        updateTop: async (parent, { input, topFourId }, context) => {
          console.log(input, ' ', topFourId)
            if(context.user) {
                const updatedTopFour = await User.updateOne( { _id: context.user._id, "topFour._id": topFourId}, 
              
                {
                    $set: {
                        "topFour.$.artist": input.artist,
                        "topFour.$.album_name": input.album_name,
                        "topFour.$.image": input.image,
                    }
                },

                { arrayFilters: [ {_id: topFourId }], upsert: true},
                
                )
               
                return updatedTopFour;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        removeRecord: async (parent, { _id }, context, error) => {
            console.log('Record Id', _id)
            if(context.user){
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $pull: { medley: { _id } } },
                    {new: true}
                );
                if(error) console.log(error)
          console.log("updatedUser", updatedUser)
        return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },


        addReaction: async (parent, { userId, username }, context, error ) => {
            if (context.user) {
                const reaction = await Reaction.create({
                    username: context.user.username,
                    
                });

                await User.findOneAndUpdate(
                    { _id: userId },
                    {$addToSet: { reactions: reaction._id}}
                );
                
              
                await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: { reacted: reaction._id } },
                );
                    if(error)console.log(error);
                return reaction;

            }
            throw new AuthenticationError('You need to be logged in!');
        },

        removeReaction: async (parent, { reactionId, userId }, context, error) => {
            if(context.user) {
                const removeReaction = await User.findOneAndUpdate(
                    {_id: userId},
                    {$pull: {reactions: reactionId}},
                    {new: true},
                );
                    const removeReacted = await User.findOneAndUpdate(
                        {_id: context.user._id},
                        {$pull: {reacted: reactionId} },
                        {new: true},
                    );
                    return removeReaction && removeReacted;
            }
            throw new AuthenticationError('You need to be logged in!');
            
        }
        
    },

};

module.exports = resolvers;