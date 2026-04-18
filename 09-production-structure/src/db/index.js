// Swap this file for Prisma / Mongoose / Knex / etc. in a real project.
// The rest of the app only talks to the repositories, never the raw data.

import bcrypt from 'bcryptjs';

export const store = {
  users: [
    { id: '1', email: 'alice@demo.io', passwordHash: bcrypt.hashSync('alice123', 8), role: 'USER'  },
    { id: '2', email: 'bob@demo.io',   passwordHash: bcrypt.hashSync('bob123',   8), role: 'ADMIN' },
  ],
  books: [
    { id: '1', title: 'Clean Code', ownerId: '1' },
    { id: '2', title: 'Dune',       ownerId: '2' },
  ],
};
