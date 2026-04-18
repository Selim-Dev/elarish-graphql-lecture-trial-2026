// Small helpers so we throw consistent errors across the app.
import { GraphQLError } from 'graphql';

const mk = (code) => (message, extra = {}) =>
  new GraphQLError(message, { extensions: { code, ...extra } });

export const unauthenticated = mk('UNAUTHENTICATED');
export const forbidden       = mk('FORBIDDEN');
export const badInput        = mk('BAD_USER_INPUT');
export const notFound        = mk('NOT_FOUND');
