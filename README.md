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
| Manhwa | Omniscient Reader, Second Life Ranker, Solo Leveling, Solo Leveling: Ragnarok, Soul Land, Return of the Mad Demon, Leveling with the Gods, The Beginning After the End, Trash of the Count's Family, Academy's Genius Swordsman, Swordmaster's Youngest Son, Star-Embracing Swordmaster, Reformation of the Deadbeat Noble, Return of the Disaster-Class Hero, The Knight King Who Returned with a God, The Player That Can't Level Up, Player Who Returned 10,000 Years Later, Pick Me Up: Infinite Gacha, Moby Dick (manhwa) |
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

- **Node.js 24+** — use [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) to manage versions
- **pnpm** — `npm install -g pnpm`
- **PostgreSQL** database (local or remote)

### 0. Install Node.js 24 via nvm

**macOS / Linux (bash/zsh):**
```bash
# Install nvm (skip if already installed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc   # or ~/.zshrc

# Install and use Node 24
nvm install 24
nvm use 24
node --version     # should print v24.x.x
```

**Windows (PowerShell) — requires [nvm-windows](https://github.com/coreybutler/nvm-windows/releases):**
```powershell
# Install and use Node 24
nvm install 24
nvm use 24
node --version     # should print v24.x.x
```

### 1. Clone and install dependencies

**bash:**
```bash
git clone https://github.com/Darksied123/multiverse-fma.git
cd multiverse-fma
pnpm install
```

**PowerShell:**
```powershell
git clone https://github.com/Darksied123/multiverse-fma.git
Set-Location multiverse-fma
pnpm install
```

### 2. Configure environment variables

Create a `.env` file in the project root — this works on all platforms:

```env
# Required — PostgreSQL connection string
DATABASE_URL="postgresql://user:password@localhost:5432/multiverse_fma"

# Required — port for the API server
PORT=8080

# Required for the frontend — URL of the running API server
API_URL="http://localhost:8080"
```

Or set them inline in your shell for the current session:

**bash:**
```bash
export DATABASE_URL="postgresql://user:password@localhost:5432/multiverse_fma"
export PORT=8080
export API_URL="http://localhost:8080"
```

**PowerShell:**
```powershell
$env:DATABASE_URL = "postgresql://user:password@localhost:5432/multiverse_fma"
$env:PORT = "8080"
$env:API_URL = "http://localhost:8080"
```

### 3. Set up the database

```bash
# Push the Drizzle schema to your database
pnpm --filter @workspace/db run push

# Seed all 500 characters
pnpm --filter @workspace/scripts run seed-characters

# (Optional) Verify all 500 image URLs return HTTP 200
pnpm --filter @workspace/scripts run check-images
```

> These `pnpm` commands work the same in PowerShell.

### 4. Start both servers

Run each in a separate terminal:

**bash:**
```bash
# Terminal 1 — API server
pnpm --filter @workspace/api-server run dev

# Terminal 2 — Frontend
pnpm --filter @workspace/multiverse-fma run dev
```

**PowerShell:**
```powershell
# Terminal 1 — API server
pnpm --filter @workspace/api-server run dev

# Terminal 2 — Frontend
pnpm --filter @workspace/multiverse-fma run dev
```

Then open the URL printed by Vite (usually `http://localhost:5173`).

---

## Desktop App (Electron)

The `electron-app/` directory wraps the hosted app as a native desktop app.

```bash
cd electron-app
npm install

# Run in development (opens the live Replit-hosted app)
npm start

# Build a distributable installer
npm run dist:win    # Windows (.exe via NSIS)
npm run dist:mac    # macOS (.dmg)
npm run dist:linux  # Linux (.AppImage)
```

> Requires Node.js 18+. Icons are already included in `electron-app/build/`.

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

## License

MIT
