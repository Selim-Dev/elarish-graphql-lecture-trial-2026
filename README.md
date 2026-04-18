# GraphQL Course — Code Examples

Hands-on, progressive examples for teaching GraphQL with **Apollo Server** + **Express**.

Each lesson is a **self-contained folder**. Students can `cd` into one, `npm install`, and `npm start` to run it.

## Lesson order

| # | Folder | Topic |
|---|--------|-------|
| 1 | [01-basic-server](01-basic-server/) | Apollo Server + Express boilerplate |
| 2 | [02-schema-and-queries](02-schema-and-queries/) | Schema Definition Language, scalar types, queries |
| 3 | [03-relationships](03-relationships/) | Nested types, relational resolvers |
| 4 | [04-mutations](04-mutations/) | Creating, updating, deleting data |
| 5 | [05-context](05-context/) | Sharing state across resolvers |
| 6 | [06-authentication](06-authentication/) | Login + JWT in context |
| 7 | [07-authorization](07-authorization/) | Roles, protected resolvers, directives |
| 8 | [08-advanced](08-advanced/) | Variables, aliases, fragments, error handling |
| 9 | [09-production-structure](09-production-structure/) | Professional folder structure (modular) |

## How to teach

1. **Live demo** each folder — open `index.js` and walk through it line-by-line.
2. Point students at the `NOTES.md` in each lesson for the concept summary.
3. Open Apollo Sandbox at `http://localhost:4000/graphql` to run queries live.

## Prerequisites

- Node.js 18+
- Basic JavaScript (functions, arrow functions, objects, arrays)
- Familiar with REST APIs (so students see the contrast)

---

Happy teaching!
