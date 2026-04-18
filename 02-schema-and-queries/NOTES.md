# Lesson 2 — Schema & Queries

## What students should leave with

- The **schema** is a contract: it tells the client what it *can* ask for.
- Every field in the schema needs a matching **resolver** function.
- Arguments on a query (like `book(id: ID!)`) show up as the 2nd parameter of the resolver.

## SDL cheat sheet

| SDL         | Meaning                              |
|-------------|--------------------------------------|
| `String`    | scalar — text                        |
| `Int`       | scalar — 32-bit integer              |
| `Float`     | scalar — double-precision number     |
| `Boolean`   | scalar — true/false                  |
| `ID`        | scalar — unique identifier (string)  |
| `String!`   | non-null (required)                  |
| `[String!]` | list of non-null strings             |
| `[String!]!`| non-null list of non-null strings    |
| `enum`      | fixed set of values                  |
| `type`      | object type (an entity)              |

## Try these queries in Sandbox

```graphql
# 1. Ask for all books (but only title + pages)
query {
  books { title pages }
}

# 2. Ask for one book by id
query {
  book(id: "1") { id title genre }
}

# 3. Filter by genre
query {
  booksByGenre(genre: FICTION) { title }
}
```

## Classroom tip

Ask students: **“What happens if the client only asks for `title`?”**
→ The server won’t even look up `pages`. That’s the killer feature: the client controls the payload.
