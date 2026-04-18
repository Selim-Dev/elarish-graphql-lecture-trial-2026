// ─────────────────────────────────────────────────────────────
// Lesson 5 — Context (Mongoose edition)
// ─────────────────────────────────────────────────────────────
// CONTEXT is an object built PER REQUEST. It's the standard place
// to put things every resolver may need:
//   - the database / models
//   - the currently-logged-in user (covered in Lesson 6)
//   - request-scoped loaders (DataLoader)
//
// Why put `models` on context instead of importing them directly?
//   ✅ Tests can swap in mocks per request.
//   ✅ You never couple a resolver to a specific import path.
//   ✅ Scales to multi-tenant apps (different DB per request).

import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import { connectDB, models } from './db.js';

const typeDefs = `#graphql
  type Book { id: ID!  title: String! }

  type Query {
    books: [Book!]!
    book(id: ID!): Book

    # Demo field — echoes a header back to prove context has `req`.
    whoAmI: String
  }
`;

const resolvers = {
  Query: {
    // 3rd arg is the CONTEXT. Destructure what you need from it.
    books:   (_p, _a, { models })    => models.Book.find(),
    book:    (_p, { id }, { models }) => models.Book.findById(id),
    whoAmI:  (_p, _a, { req })       => req.headers['x-user'] ?? 'anonymous',
  },
};

await connectDB();

const apollo = new ApolloServer({ typeDefs, resolvers });
await apollo.start();

const app = express();
app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  expressMiddleware(apollo, {
    // Runs ONCE PER REQUEST. Return value = context.
    context: async ({ req }) => ({ models, req }),
  }),
);

app.listen(4000, () =>
  console.log('🚀 Ready at http://localhost:4000/graphql'),
);
