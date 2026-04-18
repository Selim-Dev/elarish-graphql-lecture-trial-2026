// Tiny helpers around JWT. In production use a real secret from env.
import jwt from 'jsonwebtoken';
import { users } from './data.js';

const JWT_SECRET = 'classroom-demo-secret-do-not-use-in-prod';

// Create a signed token from a user object.
export const signToken = (user) =>
  jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h',
  });

// Verify a token and return the matching user, or null.
export const userFromToken = (token) => {
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return users.find((u) => u.id === payload.sub) ?? null;
  } catch {
    return null; // invalid or expired
  }
};
