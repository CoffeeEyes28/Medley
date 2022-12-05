const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');


const app = express();

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
    introspection: true,
    playground: true,
});

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware( { app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`🎵 Now listening on localhost:${PORT}`);
            console.log(` Use GraphQL @ http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
};

startApolloServer(typeDefs, resolvers);