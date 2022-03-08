require('@babel/register');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { makeExecutableSchema }  = require('@graphql-tools/schema');
const resolvers = require('../../graphql/resolvers');
const typeDefs = require('../../graphql/typeDefs');
const { sequelize } = require('../../models');
const { createServer } = require('http');

const app = express();
const httpServer = createServer(app);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});


module.exports = async () => {
  global.httpServer = httpServer;
  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => global.httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀  Test server ready at http://localhost:4000${server.graphqlPath}`);
  sequelize.authenticate()
    .then(()=> console.log('Database connected !'))
    .catch((error) => console.log(error))
};
