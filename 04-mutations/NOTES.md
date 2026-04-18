# Lesson 4 — Mutations (Mongoose edition)

## Setup

```bash
cp .env.example .env
npm install
npm start
```

## What changed

Same schema as before — only the **resolvers** now use Mongoose.

| Operation | Before (array)      | Now (Mongoose)                                  |
|-----------|---------------------|-------------------------------------------------|
| List      | `books`             | `Book.find()`                                   |
| Get one   | `books.find(...)`   | `Book.findById(id)`                             |
| Create    | `push`              | `Book.create(input)`                            |
| Update    | `Object.assign`     | `Book.findByIdAndUpdate(id, input, { new: true })` |
| Delete    | `splice`            | `Book.findByIdAndDelete(id)`                    |

## Important options

- **`{ new: true }`** on `findByIdAndUpdate` returns the **new** document.
  Without it Mongoose gives you the document as it was BEFORE the update. Classic bug source.
- **`{ runValidators: true }`** re-runs schema rules (`required`, `min`, etc.) on updates.
  Mongoose skips them by default on `findByIdAndUpdate`.

## Try it

```graphql
mutation {
  addBook(input: { title: "Dune", pages: 688 }) { id title }
}

mutation {
  updateBook(id: "<paste id>", input: { title: "Dune (revised)" }) {
    id title pages
  }
}

mutation { deleteBook(id: "<paste id>") }
```

## Classroom talking points

1. **IDs change format.** In lessons 1–2 the ids were "1", "2". Now they're 24-char hex (`65a1f9...`). That's a MongoDB ObjectId. The GraphQL `ID` scalar is just a string — it doesn't care.
2. **Validation errors.** Try `addBook(input: { title: "", pages: -5 })`. Mongoose throws, Apollo wraps it in an error, the client sees `"errors": [...]`.
3. **Atomic updates.** `findByIdAndUpdate` is one DB round trip. Doing `findById → edit → save` would be two, and creates a race condition.
