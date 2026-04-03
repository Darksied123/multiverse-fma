#!/bin/bash
set -e
pnpm install --frozen-lockfile
pnpm --filter db push

if [ -n "$DATABASE_URL" ]; then
  echo "Migrating vote choice values: fuck -> date"
  psql "$DATABASE_URL" -c "UPDATE votes SET choice = 'date' WHERE choice = 'fuck';" || echo "Warning: vote choice migration failed (may already be migrated)"
fi

echo "Seeding characters..."
pnpm --filter @workspace/scripts run seed-characters
