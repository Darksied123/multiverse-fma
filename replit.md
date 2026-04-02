# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite + Tailwind CSS + wouter (routing)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server (port from PORT env)
│   └── multiverse-fma/     # React + Vite frontend game app
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Multiverse FMA Game

A full-stack web game where users assign Marry/Date/Avoid to 3 randomly selected characters per round across 44 universes.

### Features
- **356 characters** across **44 universes** — all with real images, 0 placeholders
- Dark comic-book neon aesthetic (magenta, yellow, cyan accents)
- Global stat tracking and leaderboard with 5-minute caching
- Image proxy for external CDN images (Fandom wikis, game CDNs)
- Cookie-free anonymous voting
- **i18n**: EN / 日本語 / ES (react-i18next, browser language detection)
- **Electron desktop app** (`electron-app/`) — wraps deployed URL, buildable to .exe/.dmg

### Universes (44)
Marvel, DC, One Piece, Attack on Titan, Naruto, Dragon Ball, My Hero Academia, Bleach, Fairy Tail, High School DxD, Jujutsu Kaisen, One Punch Man, Akame ga Kill, Demon Slayer, Chainsaw Man, Spy x Family, Sword Art Online, Black Clover, Tower of God, Persona 5, Final Fantasy, Fate, Genshin Impact, Honkai Impact 3rd, Honkai: Star Rail, Azur Lane, Girls Frontline, Epic Seven, Solo Leveling, Game of Thrones, The Witcher, Soul Land, Fire Emblem, League of Legends, Overwatch, Smite, Arknights, Zenless Zone Zero, NIKKE, AFK Journey, Wuthering Waves, DanMachi, Leveling with the Gods, The Beginning After the End

### Important Notes
- **NEVER create requirements.txt** — Replit treats it as Python and errors on `pip install`
- **Seed script**: `pnpm --filter @workspace/scripts run seed-characters`
- **DB push**: `pnpm --filter @workspace/db run push`
- **Broken symlink fix**: If drizzle-orm build fails, re-link: `rm artifacts/api-server/node_modules/drizzle-orm && ln -s ../../../node_modules/.pnpm/drizzle-orm@0.45.1_@types+pg@8.18.0_pg@8.20.0/node_modules/drizzle-orm artifacts/api-server/node_modules/drizzle-orm`
- **Unicode chars in seed**: Use Node.js scripts to modify seed-characters.ts (box-drawing chars break `edit` tool string matching)

### Frontend Routes
- `/` — Home page with hero banner
- `/game` — Gameplay (3 character cards, assign Marry/Date/Avoid)
- `/results` — Round results with global stats
- `/stats` — Global leaderboard (Most Married, Most Dated, Most Avoided)

### API Routes (mounted at `/api`)
- `GET /api/health` — Health check
- `GET /api/characters/round` — Get 3 random characters for a round
- `POST /api/votes` — Submit votes for a round
- `GET /api/stats/global` — Global leaderboard data
- `GET /api/stats/character/:id` — Character-specific stats
- `GET /api/proxy/image?url=` — Image proxy for external CDN images

### Image Sources
- Fandom wiki CDN (`static.wikia.nocookie.net`) — most characters
- Riot DDragon CDN — League of Legends
- HoYoverse CDN — Genshin Impact
- jsDelivr/StarRailRes — Honkai: Star Rail
- ArknightsAssets GitHub — Arknights
- Blizzard CDN — Overwatch
- Marvel CDN — some Marvel characters

### Key Commands
- `pnpm --filter @workspace/scripts run seed-characters` — Reseed all character data
- `pnpm --filter @workspace/db run push` — Push schema changes to DB
- `pnpm --filter @workspace/api-server run dev` — Start API server
- `pnpm --filter @workspace/multiverse-fma run dev` — Start frontend dev server

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`, global JSON error handler
- Routes: `src/routes/index.ts` mounts sub-routers
- Image proxy: `src/routes/proxy.ts` — proxies external CDN images for cross-origin display
- Stats: `src/routes/stats.ts` — global leaderboard and character stats with cache headers
- Depends on: `@workspace/db`, `@workspace/api-zod`

### `artifacts/multiverse-fma` (`@workspace/multiverse-fma`)

React + Vite + Tailwind CSS frontend. Uses wouter for client-side routing, React Query for data fetching.

- Pages: `src/pages/` — home, game, results, stats, not-found
- Components: `src/components/` — character-card, navbar, footer
- Dark neon theme with comic-book fonts (Bangers)

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL.

- Tables: `characters` (id, name, universe, gender, imageUrl, ageNote), `votes` (id, characterId, choice, roundId, createdAt)
- Indexes on votes(character_id), votes(choice), votes(round_id), compound index, characters(gender), characters(universe)

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`).

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec.

### `scripts` (`@workspace/scripts`)

Utility scripts package. Run via `pnpm --filter @workspace/scripts run <script>`.
- `seed-characters` — Seeds 305 characters across 41 universes with real image URLs
