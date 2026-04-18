# Lesson 5 — Context (Mongoose edition)

## Setup

```bash
cp .env.example .env
npm install
npm start
```

## Two questions answered

### Q1. What is context?

A fresh object Apollo builds **per HTTP request** and passes to every resolver as the 3rd argument.

### Q2. Why inject models through it instead of importing them directly?

- **Testability** — a unit test can pass `{ models: mockModels }` without touching Mongo.
- **Decoupling** — resolvers don't know which file defined the model.
- **Per-request state** — if you ever run two tenants with separate DBs, you swap models per request.

## The code

```js
// db.js
export const models = { Book };          // one bag of models

// index.js
expressMiddleware(apollo, {
  context: async ({ req }) => ({ models, req }),
});

// resolvers — read models from context
books: (_p, _a, { models }) => models.Book.find(),
```

## Try it

```graphql
query { books { id title } }
```

Add a header `X-User: alice` then:

```graphql
query { whoAmI }
```

→ `{ "data": { "whoAmI": "alice" } }`

## What’s next

Lesson 6 builds on this: `context` will also carry the currently-logged-in `user`, parsed from a JWT header.
