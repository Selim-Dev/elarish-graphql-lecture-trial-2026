// Builds the Express app. Kept separate from `index.js` so tests
// can import and run it without listening on a port.

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import { schema } from './graphql/schema.js';
import { buildContext } from './middleware/auth.js';

export const buildApp = async () => {
  const apollo = new ApolloServer({ schema });
  await apollo.start();

  const app = express();
  app.get('/health', (_req, res) => res.json({ ok: true }));
  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(apollo, { context: buildContext }),
  );
  return app;
};
