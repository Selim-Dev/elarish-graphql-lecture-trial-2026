import 'dotenv/config';

// One place that reads env vars. Resolvers import from here,
// never from `process.env` directly.
export const env = {
  port:      Number(process.env.PORT) || 4000,
  jwtSecret: process.env.JWT_SECRET   || 'dev-secret',
};
