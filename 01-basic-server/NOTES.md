# Lesson 1 — Apollo Server + Express

## What students should leave with

- GraphQL needs **two things**: a schema and resolvers.
- Apollo is just a library that turns those into an HTTP endpoint.
- Express is the HTTP server; Apollo plugs into it as middleware.

## The 4 moving parts

```
  typeDefs  ──┐
              ├──►  ApolloServer  ──►  expressMiddleware  ──►  Express
  resolvers ──┘
```

## Talking points

1. **Why GraphQL vs REST?**
   - One endpoint (`/graphql`) instead of many.
   - Client picks exactly which fields it wants.
   - Strongly typed — the schema is the contract.

2. **Why Apollo?**
   - Most popular GraphQL server in Node.
   - Ships with a built-in UI (Apollo Sandbox) at `/graphql`.

3. **Run it**

   ```bash
   npm install
   npm start
   ```

   Open **http://localhost:4000/graphql** — paste:

   ```graphql
   query {
     hello
   }
   ```

   You should see:

   ```json
   { "data": { "hello": "Hello, GraphQL!" } }
   ```

## Common student confusion

- “Why `#graphql` inside the string?” → just a comment so editors highlight it.
- “Why `await apollo.start()`?” → Apollo needs to boot before Express mounts it.
- “Can I skip Express?” → Yes, `@apollo/server/standalone` exists, but in real apps you’ll want Express for REST routes, static files, etc.
