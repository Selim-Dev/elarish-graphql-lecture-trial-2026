# Lesson 9 — Professional folder structure

This is how real GraphQL projects are organized. Compare it to the earlier
single-file lessons — same concepts, but split for **scale**, **testing**,
and **team collaboration**.

## The layout

```
09-production-structure/
├── .env.example            # template for env vars (never commit the real .env)
├── package.json
└── src/
    ├── index.js            # entry point — builds app, starts listening
    ├── app.js              # builds the Express app (no .listen here)
    │
    ├── config/
    │   └── env.js          # single source of truth for env vars
    │
    ├── db/
    │   └── index.js        # database / ORM (swap for Prisma, Mongoose, etc.)
    │
    ├── middleware/
    │   └── auth.js         # builds GraphQL context (user, guards)
    │
    ├── utils/
    │   └── errors.js       # consistent GraphQLError helpers
    │
    ├── graphql/
    │   └── schema.js       # composes all modules into one schema
    │
    └── modules/            # one folder per feature
        ├── user/
        │   ├── user.schema.js      # types + "extend type Query/Mutation"
        │   ├── user.service.js     # business logic (tests target this)
        │   ├── user.resolvers.js   # thin — delegates to service
        │   └── index.js            # barrel re-export
        └── book/
            ├── book.schema.js
            ├── book.service.js
            ├── book.resolvers.js
            └── index.js
```

## The big ideas

### 1) Modular schema with `extend`

Each module declares its own slice of the schema:

```graphql
extend type Query {
  books: [Book!]!
}
```

`graphql/schema.js` provides an empty root `type Query` once, then all modules
extend it. Adding a feature = adding a folder, not editing one giant file.

### 2) Resolvers are thin — services do the work

```
Resolver  →  Service  →  DB
```

- **Resolver** — only parses args and checks auth.
- **Service** — the real business logic. Testable without GraphQL.
- **DB layer** — the only place that knows how data is stored.

This is the same layered architecture you'd use in a REST app.

### 3) Context carries capabilities, not just data

`buildContext` puts `requireAuth()` and `requireRole()` **as methods on context**.
Resolvers stay clean:

```js
addBook: (_p, { input }, ctx) => {
  const user = ctx.requireAuth();
  return bookService.add(user.id, input);
},
```

### 4) Config out of code

`src/config/env.js` is the **only** file that touches `process.env`. Everyone
else imports `env.jwtSecret`, `env.port`. If you switch secret managers later,
you change one file.

### 5) `app.js` vs `index.js` split

`app.js` builds the app but **doesn't listen**. Tests can import `buildApp()`,
fire HTTP requests at it (e.g. with `supertest`), and never open a port.

## Running

```bash
cp .env.example .env
npm install
npm start
```

Try a full round trip:

```graphql
mutation { login(email: "alice@demo.io", password: "alice123") {
  token  user { id email role }
}}
```

Paste the token as `Authorization: Bearer …` and try:

```graphql
query    { me { email role } }
query    { books { id title owner { email } } }
mutation { addBook(input: { title: "My new book" }) { id title } }
```

## What to add next (production checklist)

- Replace `src/db/index.js` with a real DB client (Prisma recommended).
- Add **DataLoader** for `Book.owner` to batch user lookups.
- Add **rate limiting** middleware on `/graphql`.
- Set `includeStacktraceInErrorResponses: false` in production Apollo.
- Add structured logging (pino/winston) — log request + user id + operation name.
- Add request-id middleware and pass it into context for tracing.
- Use **query complexity / depth limits** to prevent abusive queries.
