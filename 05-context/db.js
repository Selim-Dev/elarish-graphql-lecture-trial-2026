// Imagine this is a real database — we expose a few functions
// and inject this whole object into the resolver `context`.

const books = [
  { id: '1', title: 'The Pragmatic Programmer' },
  { id: '2', title: 'Clean Code' },
];

export const db = {
  findAllBooks: () => books,
  findBookById: (id) => books.find((b) => b.id === id),
};
