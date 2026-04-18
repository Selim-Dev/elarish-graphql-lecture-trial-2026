// Business logic lives here — resolvers stay thin.
// Tests target this file directly (no GraphQL setup needed).

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { store } from '../../db/index.js';
import { badInput } from '../../utils/errors.js';

export const userService = {
  findById: (id) => store.users.find((u) => u.id === id) ?? null,

  async login(email, password) {
    const user = store.users.find((u) => u.email === email);
    const ok = user && (await bcrypt.compare(password, user.passwordHash));
    if (!ok) throw badInput('Invalid email or password');

    const token = jwt.sign({ sub: user.id }, env.jwtSecret, { expiresIn: '1h' });
    return { token, user };
  },
};
