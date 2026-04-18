// We use `let` because mutations will change this array.
export let books = [
  { id: '1', title: 'The Pragmatic Programmer', pages: 352 },
  { id: '2', title: 'Clean Code',               pages: 464 },
];

// Simple id generator (good enough for a classroom demo).
let nextId = 3;
export const generateId = () => String(nextId++);
