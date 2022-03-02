const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { sequelize } = require('./models');
const { createServer } = require('http');
const { execute, subscribe }  = require('graphql');
const { SubscriptionServer }  = require('subscriptions-transport-ws');
const { makeExecutableSchema }  = require('@graphql-tools/schema');;

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');
// const contextMiddleware = require('./util/contextMiddleware');

const { PubSub } = require('graphql-subscriptions');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config/env.json');
const pubsub = new PubSub();

(async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
    // context for the mutation
    context: (context) => {
      let token;
      if (context.req && context.req.headers.authorization) {
        token = context.req.headers.authorization.split('Bearer ')[1];
      } else if (context.connection && context.connection.context.Authorization) {
        token = context.connection.context.Authorization.split('Bearer ')[1];
      }

      if (token) {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
          context.user = decodedToken;
        });
      }
      context.pubsub = pubsub;

      return context;
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  
  const subscriptionServer = SubscriptionServer.create({
    // This is the `schema` we just created.
    schema,
    // These are imported from `graphql`.
    execute,
    subscribe,
    async onConnect(connectionParams, webSocket, context) {
      console.log('Connected');
      let user;
      if (connectionParams.Authorization) {
        let token = connectionParams.Authorization.split('Bearer ')[1]
        
        await jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
          user = decodedToken;
        });
      }
      // context for subscription
      return { pubsub, user };
    },
    async onDisconnect(websocket){
      console.log('Disconnected');
    }
  }, {
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // This `server` is the instance returned from `new ApolloServer`.
    path: server.graphqlPath,
  });

  await server.start();
  server.applyMiddleware({ app });

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`);
  sequelize.authenticate()
            .then(()=> console.log('Database connected !'))
            .catch((error) => console.log(error))
})(typeDefs, resolvers);

