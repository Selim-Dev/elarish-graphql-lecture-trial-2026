// Tiny helpers around JWT.
import jwt from 'jsonwebtoken';
import { User } from './models/User.js';

export const signToken = (user) =>
  jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

// Verify a token and return the matching User document, or null.
export const userFromToken = async (token) => {
  if (!token) return null;
  try {
    const { sub } = jwt.verify(token, process.env.JWT_SECRET);
    return User.findById(sub);
  } catch {
    return null; // invalid or expired
  }
};
