# Lesson 3 — Relationships (now with MongoDB + Mongoose)

## Setup

```bash
cp .env.example .env       # then paste your MongoDB URI
npm install
npm start
```

## What changed from lessons 1–2

We now store data in **MongoDB** via **Mongoose**. The GraphQL schema didn't change one bit — and that's a huge teaching point.

> The GraphQL schema is the contract. The storage behind it can be anything:
> in-memory array, Postgres, REST API, Mongo. The client can't tell the difference.

## The 3 new files

```
models/
  Author.js    ← schema for authors collection
  Book.js      ← schema for books collection (with ref to Author)
db.js          ← connects to MongoDB + seeds demo data
```

## Mongoose essentials

### Schema → Model

```js
const authorSchema = new mongoose.Schema({ name: String }, { timestamps: true });
export const Author = mongoose.model('Author', authorSchema);
```

- `Schema` describes one document.
- `model()` gives you a class to `.find()`, `.create()`, `.findById()`, etc.
- The collection name is the **lower-case plural** of the model name (`Author` → `authors`).

### References (foreign keys)

```js
author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }
```

Book documents store only the author's `_id`. To resolve the related author we call `Author.findById(book.author)`.

### `_id` vs `id`

Mongo uses `_id` (ObjectId). GraphQL asks for `id`. Mongoose ships with a virtual `id` string getter, so `doc.id` works automatically. No code change in the schema.

## Try these in Sandbox

```graphql
query {
  books {
    id
    title
    author { id name }
  }
}

query {
  authors {
    name
    books { title }
  }
}
```

## Classroom talking points

1. **We put the DB connect call before `apollo.start()`.** Why? If Mongo is down we fail fast — no point starting an HTTP server that can't answer anything.
2. **Resolvers are now `async`.** Apollo awaits Promises returned from resolvers automatically — you can write `() => Book.find()` and it works.
3. **Watch the N+1.** Fetching 100 books fires 100 `findById` calls for authors. We’ll fix that later with **DataLoader**.

## Faster alternative: `.populate()`

Mongoose can join at the DB level:

```js
books: () => Book.find().populate('author'),
```

After `.populate()`, `book.author` is the full Author document (not an id), so the `Book.author` resolver can just return it directly. For this lesson we do the manual lookup so students see the nested-resolver concept clearly — swap to `.populate()` in real apps.
