export const bookTypeDefs = `#graphql
  type Book {
    id: ID!
    title: String!
    owner: User!
  }

  input AddBookInput { title: String! }

  extend type Query {
    books: [Book!]!
    book(id: ID!): Book
  }

  extend type Mutation {
    addBook(input: AddBookInput!): Book!
    deleteBook(id: ID!): Boolean!
  }
`;
