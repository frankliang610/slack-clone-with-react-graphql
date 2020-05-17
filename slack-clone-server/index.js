import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';

const PORT = 3003;
const app = express();
app.use(cors('*'));

import models from './models';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: '/graphql',
    settings: {
      'editor.theme': 'light'
    }
  },
  context: {
    models,
    user: {
      id: 1
    }
  }
});


server.applyMiddleware({ app });

models.sequelize.sync().then(() => {
  app.listen({ port: PORT }, () => {
    console.log(`🚀 Server is runing on ${PORT} port`);
  });
});


