// Users now have a `role` — USER or ADMIN.
export const users = [
  { id: '1', email: 'alice@demo.io', role: 'USER'  },
  { id: '2', email: 'bob@demo.io',   role: 'ADMIN' },
];

// Books have an `ownerId` — the user who created it.
export let books = [
  { id: '1', title: "Alice's book", ownerId: '1' },
  { id: '2', title: "Bob's book",   ownerId: '2' },
];
