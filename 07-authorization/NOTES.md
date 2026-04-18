# Lesson 7 — Authorization

## Three common patterns

| Pattern | Helper | Example |
|---------|--------|---------|
| Must be logged in | `requireAuth(user)` | `addBook` |
| Must have a role | `requireRole(user, 'ADMIN')` | `promoteUser` |
| Must own the resource | inline `ownerId === user.id` | `deleteBook` |

## Why check in the resolver, not the schema?

Because authorization depends on **data** (owner id, organization id, etc.),
not just the field name. The resolver is the only place that has:

- the args,
- the context (current user),
- the loaded entity.

## Error codes

Return a `GraphQLError` with a stable `extensions.code`:

| Code            | Meaning                        |
|-----------------|--------------------------------|
| `UNAUTHENTICATED` | Not logged in — client should redirect to login. |
| `FORBIDDEN`     | Logged in but not allowed.     |
| `BAD_USER_INPUT`| Validation failed.             |

## Try it

Use the **Headers** tab to switch identities:

```
X-User-Id: 1    # alice, role USER
X-User-Id: 2    # bob,   role ADMIN
```

### As alice (user):

```graphql
mutation { addBook(title: "new book") { id owner { email } } }  # OK
mutation { deleteBook(id: "2") }                                # FORBIDDEN — it's bob's book
mutation { promoteUser(id: "1") { role } }                      # FORBIDDEN — needs ADMIN
```

### As bob (admin):

```graphql
mutation { deleteBook(id: "1") }               # OK — admin override
mutation { promoteUser(id: "1") { role } }     # OK
```

## Advanced (mention, don’t live-code): schema directives

You can also write `@auth` directives in the schema and enforce them with a
transformer. Powerful but adds complexity — skip for beginners, introduce once
they’re comfortable with resolver guards.
