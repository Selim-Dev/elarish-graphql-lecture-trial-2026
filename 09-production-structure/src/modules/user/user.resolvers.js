// Resolvers delegate to the service. No business logic here.
import { userService } from './user.service.js';

export const userResolvers = {
  Query: {
    me: (_p, _a, ctx) => ctx.user,
  },

  Mutation: {
    login: (_p, { email, password }) => userService.login(email, password),
  },
};
