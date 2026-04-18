// ─────────────────────────────────────────────────────────────
// Lesson 7 — Authorization (what are you allowed to do?)
// ─────────────────────────────────────────────────────────────
// Patterns shown:
//   1. Require any logged-in user           → requireAuth
//   2. Require a specific role              → requireRole
//   3. Require ownership of a resource      → inline check
//
// Rule of thumb: authorization belongs INSIDE resolvers
// (or thin helpers they call). Never inside the schema.

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { GraphQLError } from 'graphql';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import { users, books } from './data.js';
import { userFromRequest, requireAuth, requireRole } from './auth.js';

const typeDefs = `#graphql
  enum Role { USER  ADMIN }

  type User { id: ID!  email: String!  role: Role! }
  type Book { id: ID!  title: String!  owner: User! }

  type Query {
    me: User
    books: [Book!]!
  }

  type Mutation {
    # Any logged-in user can add.
    addBook(title: String!): Book!

    # Only the owner (or an admin) can delete.
    deleteBook(id: ID!): Boolean!

    # ADMIN-only.
    promoteUser(id: ID!): User!
  }
`;

const resolvers = {
  Query: {
    me:    (_p, _a, { user }) => user,
    books: () => books,
  },

  Book: {
    owner: (book) => users.find((u) => u.id === book.ownerId),
  },

  Mutation: {
    addBook: (_p, { title }, { user }) => {
      requireAuth(user);                            // pattern 1
      const book = { id: String(books.length + 1), title, ownerId: user.id };
      books.push(book);
      return book;
    },

    deleteBook: (_p, { id }, { user }) => {
      requireAuth(user);
      const book = books.find((b) => b.id === id);
      if (!book) return false;

      // pattern 3: ownership OR admin
      const canDelete = book.ownerId === user.id || user.role === 'ADMIN';
      if (!canDelete) {
        throw new GraphQLError('Not your book', {
          extensions: { code: 'FORBIDDEN' },
        });
      }
      books = books.filter((b) => b.id !== id);
      return true;
    },

    promoteUser: (_p, { id }, { user }) => {
      requireRole(user, 'ADMIN');                   // pattern 2
      const target = users.find((u) => u.id === id);
      if (!target) throw new GraphQLError('User not found');
      target.role = 'ADMIN';
      return target;
    },
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
    context: async ({ req }) => ({ user: userFromRequest(req) }),
  }),
);

app.listen(4000, () =>
  console.log('🚀 Ready at http://localhost:4000/graphql'),
);
