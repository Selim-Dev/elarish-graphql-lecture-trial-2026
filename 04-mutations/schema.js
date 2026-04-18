// Schema is unchanged — same contract, different storage.

export const typeDefs = `#graphql
  type Book {
    id: ID!
    title: String!
    pages: Int!
  }

  input AddBookInput {
    title: String!
    pages: Int!
  }

  input UpdateBookInput {
    title: String
    pages: Int
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    addBook(input: AddBookInput!): Book!
    updateBook(id: ID!, input: UpdateBookInput!): Book
    deleteBook(id: ID!): Boolean!
  }
`;
