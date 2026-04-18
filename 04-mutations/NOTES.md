# Lesson 4 — Mutations

## What students should leave with

- `Query` = read. `Mutation` = write. Technically both can do anything, but this is the convention.
- Use **input types** for mutation arguments. This keeps the schema clean.
- A mutation returns a type — usually the object that was created or updated. This lets the client ask for whatever fields it wants back, in the same round trip.

## Try these in Sandbox

```graphql
# Create
mutation {
  addBook(input: { title: "Dune", pages: 688 }) {
    id
    title
  }
}

# Update (only title)
mutation {
  updateBook(id: "3", input: { title: "Dune (revised)" }) {
    id
    title
    pages
  }
}

# Delete
mutation {
  deleteBook(id: "3")
}
```

## Classroom tip

Ask: **“Why do we return the whole book from `addBook` instead of just `true`?”**
→ So the client doesn’t need a second round trip to read the new id/fields.
