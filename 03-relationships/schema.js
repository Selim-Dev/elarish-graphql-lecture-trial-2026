// Notice: Book has an `author` field (type Author)
//         and Author has a `books` field (list of Book).
// Neither one actually exists on the raw data objects — we will
// *resolve* them on demand in the resolvers file.

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
