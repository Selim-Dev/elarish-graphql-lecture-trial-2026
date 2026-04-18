// Module-owned schema — only the types and fields this module cares about.
export const userTypeDefs = `#graphql
  enum Role { USER  ADMIN }

  type User {
    id: ID!
    email: String!
    role: Role!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    login(email: String!, password: String!): AuthPayload!
  }
`;
