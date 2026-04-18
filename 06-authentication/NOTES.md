# Lesson 6 — Authentication (who are you?)

## The golden rule

> **Authentication = identity.**  Who is the caller?
> **Authorization = permission.** What are they allowed to do?

Lesson 6 covers identity. Lesson 7 covers permission.

## The flow

```
1.  Client → Mutation: login(email, password)
2.  Server → returns { token, user }
3.  Client stores token (localStorage / cookie)
4.  Client → every future request sends:
        Authorization: Bearer <token>
5.  Server context parses token → puts `user` on context
6.  Resolvers read context.user
```

## Try it

### Step 1 — Log in

```graphql
mutation {
  login(email: "alice@demo.io", password: "alice123") {
    token
    user { id email }
  }
}
```

### Step 2 — Send the token

Copy the token. In Sandbox, click **Headers** and add:

```
Authorization: Bearer eyJhbGciOi...
```

### Step 3 — Identify yourself

```graphql
query { me { id email } }
```

Without the header → `me` is `null`.
With a valid header → your user object.

## Important talking points

- **Never store plain passwords.** Use `bcrypt`. (One-way hash + salt.)
- **Never put secrets in code in real projects.** Use `process.env.JWT_SECRET`.
- **JWTs are signed, not encrypted** — don’t put secrets in the payload.
- `GraphQLError` with `extensions.code` is the standard way to return typed errors.
