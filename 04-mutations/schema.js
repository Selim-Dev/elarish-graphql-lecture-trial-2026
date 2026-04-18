// Mutations are just like queries — they take args and return data —
// but they signal WRITE intent. Convention: name them with a verb
// (addBook, updateBook, deleteBook).
//
// `input` types are used ONLY as mutation arguments.
// You cannot use a regular `type` as an argument — that's the rule.

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
