// The SCHEMA is the contract between client and server.
// It is written in SDL (Schema Definition Language).
//
// Scalar types built into GraphQL: Int, Float, String, Boolean, ID
// Custom types:    type, enum, input, interface, union
// Modifiers:       !  = non-null    [Type] = list of Type

export const typeDefs = `#graphql
  # An ENUM is a fixed set of values — great for categories.
  enum Genre {
    TECH
    FICTION
  }

  # An OBJECT TYPE describes an entity in your API.
  # The "!" means "this field can never be null".
  type Book {
    id: ID!
    title: String!
    pages: Int!
    genre: Genre!
  }

  # Query is the ROOT TYPE for reading data.
  # Every field here is something a client can ask for.
  type Query {
    # Return every book.
    books: [Book!]!

    # Return a single book by id (nullable — may not exist).
    book(id: ID!): Book

    # Filter by genre — argument is required.
    booksByGenre(genre: Genre!): [Book!]!
  }
`;
