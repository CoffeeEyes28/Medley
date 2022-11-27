const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
    users: [User]!
    user(userId: ID!): User
    me: User
}

type User {
    _id: ID
    username: String!
    email: String!
    medley: [Record]
    topFour: [Record]
    reactions: [Reaction]
    reacted: [Reaction]
    medleyTotal: Int
    reactionCount: Int
    reactedCount: Int
}

type Record {
    _id: ID
    artist: String!
    album_name: String!
    image: String!
}

type Reaction {
    _id: ID
    reactionId: String
    username: String
}

type Auth {
    token: ID!
    user: User
}

input SaveRecordInput {
    artist: String
    album_name: String
    image: String
}






type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveRecord(input: SaveRecordInput): User
    saveTop(input: SaveRecordInput): User
    removeRecord(_id: ID): User
    addReaction(userId: ID!, username: String!): Reaction
    removeReaction(reactionId: ID!, userId: ID!): Reaction
}
`;




module.exports = typeDefs;