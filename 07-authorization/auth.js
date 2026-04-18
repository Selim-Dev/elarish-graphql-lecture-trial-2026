// Simple "fake login" — for this lesson we skip JWT and just let the
// client pick a user via a header, so students focus on AUTHORIZATION,
// not JWT details (covered in Lesson 6).

import { users } from './data.js';
import { GraphQLError } from 'graphql';

// Read `X-User-Id: <id>` from the request and return the matching user.
export const userFromRequest = (req) => {
  const id = req.headers['x-user-id'];
  return users.find((u) => u.id === id) ?? null;
};

// ─── Guards ────────────────────────────────────────────────
// These are small, reusable helpers resolvers call first.
// If the check fails they throw — so the resolver never runs.

export const requireAuth = (user) => {
  if (!user) {
    throw new GraphQLError('You must be logged in', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
  return user;
};

export const requireRole = (user, role) => {
  requireAuth(user);
  if (user.role !== role) {
    throw new GraphQLError(`Requires ${role} role`, {
      extensions: { code: 'FORBIDDEN' },
    });
  }
  return user;
};
