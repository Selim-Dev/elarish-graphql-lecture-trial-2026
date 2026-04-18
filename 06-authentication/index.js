// ─────────────────────────────────────────────────────────────
// Lesson 6 — Authentication with JWT
// ─────────────────────────────────────────────────────────────
// Flow:
//   1. Client calls `login(email, password)` mutation.
//   2. Server verifies password (bcrypt), returns a JWT.
//   3. Client stores the JWT and sends it on future requests as:
//          Authorization: Bearer <token>
//   4. Context parses the header and puts `user` on context.
//   5. Resolvers read `context.user` to decide what to do.

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { GraphQLError } from 'graphql';

import { users } from './data.js';
import { signToken, userFromToken } from './auth.js';

const typeDefs = `#graphql
  type User  { id: ID!  email: String! }
  type AuthPayload { token: String!  user: User! }

  type Query {
    # Returns null if no valid token was sent.
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
  }
`;

const resolvers = {
  Query: {
    // `user` comes from the context — see below.
    me: (_p, _a, { user }) => user,
  },

  Mutation: {
    login: async (_p, { email, password }) => {
      const user = users.find((u) => u.email === email);
      const ok = user && (await bcrypt.compare(password, user.passwordHash));
      if (!ok) {
        // GraphQLError is the idiomatic way to return errors.
        throw new GraphQLError('Invalid email or password', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }
      return { token: signToken(user), user };
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
    context: async ({ req }) => {
      // "Authorization: Bearer <token>"  →  "<token>"
      const header = req.headers.authorization ?? '';
      const token = header.startsWith('Bearer ') ? header.slice(7) : null;
      const user = userFromToken(token);
      return { user };
    },
  }),
);

app.listen(4000, () =>
  console.log('🚀 Ready at http://localhost:4000/graphql'),
);
