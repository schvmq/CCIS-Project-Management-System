# Database Migrations

This directory contains SQL migration files managed by `node-pg-migrate`.

## Conventions

- Migrations are numbered sequentially: `001_description.sql`, `002_description.sql`, etc.
- Each migration file should be idempotent where possible.
- Always provide both UP and DOWN migration logic.
- Test migrations locally before committing.

## Commands

Run these from the `server/` directory:

```bash
# Create a new migration file
npm run migrate:create -- <migration-name>

# Run all pending migrations
npm run migrate:up

# Rollback the last migration
npm run migrate:down

# Run migrations with a specific database URL
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname npm run migrate:up
```

## Notes

- The migration tool (`node-pg-migrate`) is installed in the server package.
- Migrations are stored here (at the repository root level) so they are shared
  between both developers and are not buried inside the server directory.
- The `node-pg-migrate` configuration in `server/package.json` points to this
  directory via `"migrationsDir": "../database/migrations"`.
