const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { sequelize } = require('./models');
const cors = require('cors');

const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')
const contextMiddleware = require('./util/contextMiddleware')

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: cors(corsOptions),
    context: contextMiddleware
  })

  
const app = express();

server.start().then(res => {
    server.applyMiddleware({ app });
    app.listen({ port: 4000 }, () => 
        console.log(`🚀  Server ready at ${server.graphqlPath}`),
        sequelize.authenticate()
            .then(()=> console.log('Database connected !'))
            .catch((error) => console.log(error))
    );
});
