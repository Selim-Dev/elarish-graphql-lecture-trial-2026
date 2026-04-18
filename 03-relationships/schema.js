// Schema is IDENTICAL to the in-memory version. That's the point of
// GraphQL — the schema is the contract, it doesn't care about storage.

export const typeDefs = `#graphql
  type Author {
    id: ID!
    name: String!
    books: [Book!]!
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
  }

  type Query {
    books: [Book!]!
    authors: [Author!]!
  }
`;
