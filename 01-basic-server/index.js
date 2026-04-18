// ─────────────────────────────────────────────────────────────
// Lesson 1 — The smallest possible Apollo Server + Express app
// ─────────────────────────────────────────────────────────────
// Goal: prove that a GraphQL server can run, and understand
// the 4 moving parts:
//   1. typeDefs  — the schema (what the API looks like)
//   2. resolvers — the functions that return data
//   3. ApolloServer — wraps typeDefs + resolvers
//   4. Express   — the HTTP server Apollo plugs into

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

// 1) The schema — describes the shape of the API.
//    Here we define ONE query called `hello` that returns a String.
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// 2) Resolvers — functions that produce the data for each field.
//    The field name in the schema must match the key here.
const resolvers = {
  Query: {
    hello: () => 'Hello, GraphQL!',
  },
};

// 3) Build the Apollo Server.
const apollo = new ApolloServer({ typeDefs, resolvers });

// Apollo must be started before being attached to Express.
await apollo.start();

// 4) Build the Express app and mount GraphQL at /graphql.
const app = express();
app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(apollo));

app.listen(4000, () => {
  console.log('🚀 GraphQL ready at http://localhost:4000/graphql');
});
