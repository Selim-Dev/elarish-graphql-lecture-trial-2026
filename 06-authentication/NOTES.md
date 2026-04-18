# Lesson 6 — Authentication (Mongoose edition)

## Setup

```bash
cp .env.example .env
npm install
npm start
```

First boot seeds `alice@demo.io` / `alice123` and `bob@demo.io` / `bob123`.

## The golden rule

> **Authentication = identity.**  Who is the caller?
> **Authorization = permission.** What are they allowed to do?

Lesson 6 = identity. Lesson 7 = permission.

## What's new vs. the in-memory version

### 1. Schema methods + hooks — Mongoose’s superpower

```js
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});
```

- The `pre('save')` hook runs every time a `User` is saved.
- `isModified('password')` prevents re-hashing an already-hashed password on updates.
- Result: **nobody can accidentally insert a plain-text password.** The model enforces it.

```js
userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};
```

Adds `user.comparePassword('abc')` to every user document — the natural place for that logic.

### 2. `lowercase: true` + `unique: true`

Mongoose lowercases the email on save, and Mongo refuses duplicates at the DB level.

### 3. `userFromToken` is now async

It has to look up a document, so resolvers `await` it inside the `context` builder.

## The flow

```
1.  Client → Mutation: login(email, password)
2.  Server verifies password → returns { token, user }
3.  Client stores token (localStorage / cookie)
4.  Client → future requests send:
        Authorization: Bearer <token>
5.  Server context parses token → puts `user` on context
6.  Resolvers read context.user
```

## Try it

```graphql
# Step 1 — log in
mutation {
  login(email: "alice@demo.io", password: "alice123") {
    token
    user { id email }
  }
}
```

Copy the token → Sandbox **Headers** tab:

```
Authorization: Bearer <paste-token>
```

```graphql
# Step 2 — identify yourself
query { me { id email } }
```

- Without the header → `me` is `null`.
- With a valid header → your user document.

## Classroom talking points

- **Never store plain passwords.** One-way hash (bcrypt) with salt.
- **Secrets belong in env.** Already moved `JWT_SECRET` to `.env`.
- **JWTs are signed, not encrypted.** Don't put secrets in the payload.
- **`GraphQLError` with `extensions.code`** is the standard typed-error pattern.
