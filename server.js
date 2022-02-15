const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { sequelize } = require('./models')

const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')

const server = new ApolloServer({
    typeDefs,
    resolvers,
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
