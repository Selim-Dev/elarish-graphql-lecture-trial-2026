// Builds the GraphQL context for each request.
// - Parses the Authorization header.
// - Looks up the user.
// - Exposes `requireAuth` / `requireRole` as methods on context.

import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { store } from '../db/index.js';
import { unauthenticated, forbidden } from '../utils/errors.js';

const userFromToken = (token) => {
  if (!token) return null;
  try {
    const { sub } = jwt.verify(token, env.jwtSecret);
    return store.users.find((u) => u.id === sub) ?? null;
  } catch {
    return null;
  }
};

export const buildContext = async ({ req }) => {
  const header = req.headers.authorization ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  const user = userFromToken(token);

  return {
    user,
    requireAuth: () => {
      if (!user) throw unauthenticated('You must be logged in');
      return user;
    },
    requireRole: (role) => {
      if (!user) throw unauthenticated('You must be logged in');
      if (user.role !== role) throw forbidden(`Requires ${role} role`);
      return user;
    },
  };
};
