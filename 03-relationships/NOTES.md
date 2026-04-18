# Lesson 3 — Relationships (the magic of nested resolvers)

## What students should leave with

- Resolvers are **not only** on `Query`. You can define them on any object type.
- Nested resolvers run **lazily**: only if the client actually asks for that field.
- This is how GraphQL “joins” across data sources without a JOIN statement.

## The flow

Client sends:

```graphql
query {
  books {
    title
    author { name }
  }
}
```

Server runs:

1. `Query.books` → returns array of raw book records.
2. For each book, client asked for `author`, so `Book.author(book)` runs → returns the matching Author.
3. For each author, client asked for `name`, so the default resolver reads `author.name`.

## Try this — circular queries are legal!

```graphql
query {
  authors {
    name
    books {
      title
      author { name }   # back to the author
    }
  }
}
```

## Foreshadowing: the N+1 problem

If `Book.author` hit a real database, fetching 100 books would fire **100 author queries**.
The fix is **DataLoader** — batching + caching per request. We’ll revisit that briefly in Lesson 8.
