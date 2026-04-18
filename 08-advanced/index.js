// Lesson 8 — advanced query features (client-side) + error handling.
// The server is small; most of this lesson is in the Sandbox queries.

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { GraphQLError } from 'graphql';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

const products = [
  { id: '1', name: 'Keyboard', price: 120, stock: 12 },
  { id: '2', name: 'Mouse',    price:  45, stock:  3 },
  { id: '3', name: 'Monitor',  price: 300, stock:  0 },
];

const typeDefs = `#graphql
  type Product {
    id: ID!
    name: String!
    price: Float!
    stock: Int!
  }

  type Query {
    product(id: ID!): Product
    products: [Product!]!
  }

  type Mutation {
    # Buying returns the updated product; fails if out of stock.
    buy(id: ID!, quantity: Int!): Product!
  }
`;

const resolvers = {
  Query: {
    product:  (_p, { id }) => products.find((p) => p.id === id),
    products: () => products,
  },

  Mutation: {
    buy: (_p, { id, quantity }) => {
      // Input validation — BAD_USER_INPUT.
      if (quantity < 1) {
        throw new GraphQLError('Quantity must be >= 1', {
          extensions: { code: 'BAD_USER_INPUT', field: 'quantity' },
        });
      }
      const product = products.find((p) => p.id === id);
      if (!product) {
        throw new GraphQLError('Product not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }
      if (product.stock < quantity) {
        throw new GraphQLError('Out of stock', {
          extensions: { code: 'OUT_OF_STOCK', available: product.stock },
        });
      }
      product.stock -= quantity;
      return product;
    },
  },
};

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  // In production turn this OFF — it leaks stack traces.
  includeStacktraceInErrorResponses: false,
});
await apollo.start();

const app = express();
app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(apollo));

app.listen(4000, () =>
  console.log('🚀 Ready at http://localhost:4000/graphql'),
);
