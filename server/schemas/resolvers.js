const { AuthenticationError } = require('apollo-server-express');
const { User, Reaction } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {

        users: async () => {
            return User.find();
        },

        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
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
            if(context.user){
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $addToSet: { topFour: input } },
                    {new: true, runValidators: true}
                );
                return updatedUser;
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
            }
            throw new AuthenticationError('You need to be logged in!');
        }
        
    },

};

module.exports = resolvers;