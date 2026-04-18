// Two "tables" — authors and books. Notice `authorId` is the FK.
export const authors = [
  { id: '1', name: 'Andy Hunt' },
  { id: '2', name: 'Robert C. Martin' },
  { id: '3', name: 'Frank Herbert' },
];

export const books = [
  { id: '1', title: 'The Pragmatic Programmer', authorId: '1' },
  { id: '2', title: 'Clean Code',               authorId: '2' },
  { id: '3', title: 'Clean Architecture',       authorId: '2' },
  { id: '4', title: 'Dune',                     authorId: '3' },
];
