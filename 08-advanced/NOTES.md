# Lesson 8 — Advanced query features & error handling

Most of this lesson happens in **Apollo Sandbox**. The server is small on purpose.

## 1) Variables — never inline user input in the query string

```graphql
query GetProduct($id: ID!) {
  product(id: $id) { id name price }
}
```

Variables panel:

```json
{ "id": "1" }
```

Why: the same query string can be cached, parsed once, and reused.

## 2) Aliases — renaming fields in the response

```graphql
query {
  keyboard: product(id: "1") { name price }
  mouse:    product(id: "2") { name price }
}
```

Without aliases both would be called `product` and collide.

## 3) Fragments — reusable field sets

```graphql
fragment ProductCard on Product {
  id
  name
  price
}

query {
  products { ...ProductCard }
  featured: product(id: "1") { ...ProductCard stock }
}
```

## 4) Directives — `@include` / `@skip`

```graphql
query GetProduct($id: ID!, $detailed: Boolean!) {
  product(id: $id) {
    id
    name
    stock @include(if: $detailed)
    price @skip(if: $detailed)
  }
}
```

## 5) Error handling

Throw `GraphQLError` with a stable `extensions.code`:

```graphql
mutation { buy(id: "3", quantity: 1) { name stock } }
```

Response:

```json
{
  "errors": [{
    "message": "Out of stock",
    "extensions": { "code": "OUT_OF_STOCK", "available": 0 }
  }],
  "data": { "buy": null }
}
```

Key idea: **`data` and `errors` coexist**. A partial response is the norm — some fields can succeed while others fail.

## 6) The N+1 problem (mention, don’t live-code)

When `Book.author` does a DB lookup, 100 books → 100 queries.
Fix = **DataLoader**: put a `loader` on context, batches `authorId`s into one `WHERE id IN (...)` call per request.
