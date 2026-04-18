# Lesson 5 — Context

## What students should leave with

- **Context = per-request shared bag.** One fresh object per HTTP request.
- It's the standard place to inject `db`, the logged-in `user`, and request-scoped utilities.
- Resolvers read it as the 3rd argument: `(parent, args, context, info)`.

## Where it’s set

In `expressMiddleware`:

```js
expressMiddleware(apollo, {
  context: async ({ req }) => ({ db, req }),
});
```

That function runs for **every request**. Returned object = context.

## Why not globals?

Because context is **per-request**, two requests can't accidentally share data.
If you put the logged-in user on a global you would get session bleed between users.

## Demo

Send a request with a custom header in Sandbox (Headers tab):

```
X-User: alice
```

Then query:

```graphql
query { whoAmI }
```

→ `{ "data": { "whoAmI": "alice" } }`

## What’s next

This sets us up for **authentication** (lesson 6). We’ll parse a JWT from the
`Authorization` header inside the context function and put the user on `context`.
