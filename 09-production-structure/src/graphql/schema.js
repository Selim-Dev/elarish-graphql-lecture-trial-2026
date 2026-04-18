// Compose ALL modules into a single schema.
// Each module contributes: typeDefs + resolvers.
//
// The `rootTypeDefs` declares the empty Query/Mutation so modules
// can use `extend type Query` safely.

import { makeExecutableSchema } from '@graphql-tools/schema';

import { userTypeDefs, userResolvers } from '../modules/user/index.js';
import { bookTypeDefs, bookResolvers } from '../modules/book/index.js';

const rootTypeDefs = `#graphql
  type Query
  type Mutation
`;

// Deep-merge resolver maps. Only two modules here, but the pattern
// scales — just push more into these arrays.
const mergeResolvers = (list) =>
  list.reduce((acc, cur) => {
    for (const key of Object.keys(cur)) {
      acc[key] = { ...(acc[key] ?? {}), ...cur[key] };
    }
    return acc;
  }, {});

export const schema = makeExecutableSchema({
  typeDefs:  [rootTypeDefs, userTypeDefs, bookTypeDefs],
  resolvers: mergeResolvers([userResolvers, bookResolvers]),
});
