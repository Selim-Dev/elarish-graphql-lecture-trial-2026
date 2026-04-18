import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import { connectDB } from './db.js';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';

await connectDB();

const apollo = new ApolloServer({ typeDefs, resolvers });
await apollo.start();

const app = express();
app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(apollo));

app.listen(4000, () =>
  console.log('🚀 Ready at http://localhost:4000/graphql'),
);
