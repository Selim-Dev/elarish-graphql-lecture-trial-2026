// ─────────────────────────────────────────────────────────────
// Lesson 6 — Authentication with JWT (Mongoose edition)
// ─────────────────────────────────────────────────────────────
// Flow:
//   1. Client → Mutation: login(email, password)
//   2. Server verifies password (bcrypt), returns a JWT.
//   3. Client stores the JWT; sends it on future requests as:
//          Authorization: Bearer <token>
//   4. Context parses the header and puts `user` on context.
//   5. Resolvers read `context.user` to decide what to do.

import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { GraphQLError } from 'graphql';

import { connectDB } from './db.js';
import { User } from './models/User.js';
import { signToken, userFromToken } from './auth.js';

const typeDefs = `#graphql
  type User  { id: ID!  email: String! }
  type AuthPayload { token: String!  user: User! }

  type Query {
    me: User   # null unless a valid token was sent
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
  }
`;

const resolvers = {
  Query: {
    me: (_p, _a, { user }) => user,
  },

  Mutation: {
    login: async (_p, { email, password }) => {
      const user = await User.findOne({ email: email.toLowerCase() });
      const ok = user && (await user.comparePassword(password));
      if (!ok) {
        throw new GraphQLError('Invalid email or password', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }
      return { token: signToken(user), user };
    },
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
    context: async ({ req }) => {
      const header = req.headers.authorization ?? '';
      const token = header.startsWith('Bearer ') ? header.slice(7) : null;
      const user = await userFromToken(token);
      return { user };
    },
  }),
);

app.listen(4000, () =>
  console.log('🚀 Ready at http://localhost:4000/graphql'),
);
