// ─────────────────────────────────────────────────────────────
// Lesson 5 — Context
// ─────────────────────────────────────────────────────────────
// CONTEXT is an object shared by every resolver in a single
// request. It's the standard place to put things like:
//   - the database connection
//   - the currently-logged-in user
//   - request-scoped loaders (DataLoader)
//
// Apollo BUILDS a fresh context object FOR EACH REQUEST, by
// calling the `context` function you pass to expressMiddleware.

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import { db } from './db.js';

const typeDefs = `#graphql
  type Book { id: ID!  title: String! }

  type Query {
    books: [Book!]!
    book(id: ID!): Book

    # Demo field that echoes a header back — uses context.req.
    whoAmI: String
  }
`;

const resolvers = {
  Query: {
    // 3rd argument is the CONTEXT. Destructure what you need.
    books:   (_p, _a, { db })     => db.findAllBooks(),
    book:    (_p, { id }, { db }) => db.findBookById(id),
    whoAmI:  (_p, _a, { req })    =>
      req.headers['x-user'] ?? 'anonymous',
  },
};

const apollo = new ApolloServer({ typeDefs, resolvers });
await apollo.start();

const app = express();
app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  expressMiddleware(apollo, {
    // This runs ONCE PER REQUEST. Whatever you return here
    // becomes the 3rd argument of every resolver.
    context: async ({ req }) => ({
      db,
      req, // so resolvers can read headers, IP, etc.
    }),
  }),
);

app.listen(4000, () =>
  console.log('🚀 Ready at http://localhost:4000/graphql'),
);
