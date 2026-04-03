# Multiverse FMA

A full-stack web game where you assign **Marry**, **Date**, or **Avoid** to three characters per round drawn from 78 universes — Marvel, DC, anime, manga, manhwa, video games, cartoons, and more.

![Multiverse FMA](artifacts/multiverse-fma/public/opengraph.jpg)

---

## What It Is

Each round you're shown 3 random characters from across the multiverse. You must assign a unique fate to each one — marry, date, or avoid — then lock in your votes. After submitting you see how the rest of the world voted for those same characters, with live global percentages.

The leaderboard tracks the most married, most dated, and most avoided characters across all players.

---

## Characters

**500 characters** across **78 universes**, all strictly 18+ adults:

| Category | Universes |
|---|---|
| Western Comics | Marvel, DC, Invincible, The Boys |
| Anime | One Piece, Attack on Titan, Naruto, Dragon Ball, My Hero Academia, Bleach, Fairy Tail, High School DxD, Jujutsu Kaisen, One Punch Man, Akame ga Kill, Demon Slayer, Chainsaw Man, Spy x Family, Sword Art Online, Black Clover, Tower of God, DanMachi, Mato Seihei no Slave |
| Manga | Berserk, Fullmetal Alchemist, Tokyo Ghoul, Hunter x Hunter |
| Manhwa | Omniscient Reader, Second Life Ranker, Solo Leveling, Solo Leveling: Ragnarok, Soul Land, Return of the Mad Demon, Leveling with the Gods, The Beginning After the End, Trash of the Count's Family, Academy's Genius Swordsman, Swordmaster's Youngest Son, Star-Embracing Swordmaster, Reformation of the Deadbeat Noble, Return of the Disaster-Class Hero, The Knight King Who Returned with a God, The Player That Can't Level Up, Player Who Returned 10,000 Years Later, Pick Me Up, Infinite Gacha, Moby Dick |
| Adult Manhwa | Perfect Half, Shuumatsu no Harem: Fantasia, MILF Hunting in Another World, A Secret Lesson With My Younger Sister |
| Video Games | NieR: Automata, Resident Evil, Street Fighter, Devil May Cry, Tekken, League of Legends, Overwatch, Smite, Fire Emblem, Persona 5, Final Fantasy, Fate, Genshin Impact, Honkai Impact 3rd, Honkai: Star Rail, Zenless Zone Zero, Wuthering Waves, Arknights, NIKKE, Girls Frontline, Azur Lane, Epic Seven, AFK Journey |
| Cartoons | Avatar: Legend of Korra, Arcane, Castlevania |
| TV / Books | Game of Thrones, The Witcher |

**500 of 500** characters use real sourced images (Fandom wiki CDN, game CDNs). Zero placeholders.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, wouter (routing), React Query |
| Backend | Express 5, Node.js 24 |
| Database | PostgreSQL + Drizzle ORM |
| Monorepo | pnpm workspaces, TypeScript project references |
| i18n | EN / JA / ES (react-i18next) |
| Fonts | Bangers (Google Fonts) — comic-book display font |

---

## Project Structure

```
multiverse-fma/
├── artifacts/
│   ├── api-server/          # Express API (characters, votes, stats, image proxy)
│   └── multiverse-fma/      # React + Vite frontend
├── electron-app/            # Electron desktop app wrapper
├── lib/
│   ├── db/                  # Drizzle schema + PostgreSQL connection
│   ├── api-spec/            # OpenAPI 3.1 spec + Orval codegen config
│   ├── api-client-react/    # Generated React Query hooks
│   └── api-zod/             # Generated Zod schemas
├── scripts/
│   └── src/
│       └── seed-characters.ts   # Seeds all 500 characters
├── pnpm-workspace.yaml
└── replit.md
```

---

## Running Locally

### Prerequisites

- Node.js 20+
- pnpm (`npm install -g pnpm`)
- PostgreSQL database

### Setup

```bash
# Install dependencies
pnpm install

# Set your database URL
export DATABASE_URL="postgresql://user:password@localhost:5432/multiverse_fma"

# Push the schema to your database
pnpm --filter @workspace/db run push

# Seed the characters
pnpm --filter @workspace/scripts run seed-characters
```

### Start the servers

```bash
# API server (port 8080 by default, or set PORT env var)
pnpm --filter @workspace/api-server run dev

# Frontend (set API_URL to point to your API server)
pnpm --filter @workspace/multiverse-fma run dev
```

---

## API Routes

All routes are mounted at `/api`:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/healthz` | Health check |
| `GET` | `/api/characters` | Get 3 random characters for a round |
| `GET` | `/api/characters/all` | Get all characters |
| `POST` | `/api/stats/submit` | Submit round choices `{ choices: [{characterId, choice}] }` — server generates `roundId` |
| `GET` | `/api/stats/global` | Global leaderboard (top married/dated/avoided) |
| `GET` | `/api/stats/character/:characterId` | Stats for a specific character |
| `GET` | `/api/proxy/image?url=` | Proxy for external CDN images |

### Vote choices

`"marry"` | `"date"` | `"avoid"`

---

## Game Flow

```
Home → /game (3 random chars) → assign marry/date/avoid → lock in
     → /results (your choices + global % breakdown)
     → /game again (next round) or /stats (leaderboard)
```

---

## Database Schema

**characters**
- `id`, `name`, `universe`, `gender`, `imageUrl`, `ageNote`
- Indexed on `gender`, `universe`

**votes**
- `id`, `characterId`, `choice`, `roundId`, `createdAt`
- Indexed on `characterId`, `choice`, `roundId`, and a compound index

---

## Seeding

Characters are defined in `scripts/src/seed-characters.ts` using CDN helpers:

```ts
DDragon("Ahri")           // League of Legends
GI("Shougun")             // Genshin Impact
HSR_ID(1005)              // Honkai: Star Rail
AK("char_263_skadi_2")    // Arknights
OW("widowmaker")          // Overwatch
FW("kimetsu-no-yaiba", "path/to/image.png")  // Fandom wiki
"https://..."             // Direct URL (for video game wikis)
```

To reseed: `pnpm --filter @workspace/scripts run seed-characters`

---

## Desktop App (Electron)

The `electron-app/` directory contains a cross-platform desktop wrapper.

See `electron-app/README.md` for build instructions.

---

## License

MIT
