import bcrypt from 'bcryptjs';

// Pre-hashed passwords so students don't have to run a seed step.
// Plain passwords: alice -> "alice123", bob -> "bob123".
export const users = [
  { id: '1', email: 'alice@demo.io', passwordHash: bcrypt.hashSync('alice123', 8) },
  { id: '2', email: 'bob@demo.io',   passwordHash: bcrypt.hashSync('bob123',   8) },
];
