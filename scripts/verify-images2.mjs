/**
 * Extracts all imageUrl FW() calls from seed-characters.ts
 * and checks if they resolve to real images.
 */
import { readFileSync } from "fs";

const content = readFileSync("scripts/src/seed-characters.ts", "utf8");

// Extract lines that have both a name and imageUrl
const lineRegex = /name: "([^"]+)", universe: "([^"]+)"[^\n]*imageUrl: (FW|DDragon|GI|GIE|HSR_ID|OW|AK|MV|P)\(/g;

// More robust: parse the whole file line by line
const lines = content.split("\n");
const chars = [];

for (const line of lines) {
  if (!line.includes("imageUrl:") || !line.includes('name: "')) continue;
  
  const nameMatch = line.match(/name: "([^"]+)"/);
  const univMatch = line.match(/universe: "([^"]+)"/);
  if (!nameMatch || !univMatch) continue;
  
  const name = nameMatch[1];
  const universe = univMatch[1];

  let imageUrl = null;

  // FW("wiki", "path") — note path might contain commas in query strings
  const fwMatch = line.match(/FW\("([^"]+)",\s*"([^"]+)"\)/);
  if (fwMatch) {
    imageUrl = `https://static.wikia.nocookie.net/${fwMatch[1]}/images/${fwMatch[2]}`;
  }

  const ddMatch = line.match(/DDragon\("([^"]+)"\)/);
  if (ddMatch) imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${ddMatch[1]}_0.jpg`;

  const giMatch = line.match(/GIE?\("([^"]+)"\)/);
  if (giMatch) imageUrl = `https://enka.network/ui/UI_AvatarIcon_${giMatch[1]}.png`;

  const hsrMatch = line.match(/HSR_ID\((\d+)\)/);
  if (hsrMatch) imageUrl = `https://cdn.jsdelivr.net/gh/Mar-7th/StarRailRes@master/icon/character/${hsrMatch[1]}.png`;

  const owMatch = line.match(/OW\("([^"]+)"\)/);
  if (owMatch) imageUrl = `https://d1u1mce87gyfbn.cloudfront.net/hero/${owMatch[1]}/hero-select-portrait.png`;

  const akMatch = line.match(/AK\("([^"]+)"\)/);
  if (akMatch) imageUrl = `https://raw.githubusercontent.com/ArknightsAssets/ArknightsAssets/cn/assets/torappu/dynamicassets/arts/charportraits/${akMatch[1]}.png`;

  const mvMatch = line.match(/MV\("([^"]+)"\)/);
  if (mvMatch) imageUrl = `https://i.annihil.us/u/prod/marvel/i/mg/${mvMatch[1]}/portrait_incredible.jpg`;

  // P() = placeholder, skip
  if (!imageUrl) continue;

  chars.push({ name, universe, imageUrl });
}

console.log(`Parsed ${chars.length} characters from seed file.`);

// Filter to only new universes
const newUniverses = new Set([
  "Omniscient Reader", "Second Life Ranker", "Return of the Mad Demon",
  "NieR: Automata", "Resident Evil", "Street Fighter", "Devil May Cry", "Tekken",
  "Avatar: Legend of Korra", "Arcane", "Castlevania",
  "Invincible", "The Boys",
  "Berserk", "Fullmetal Alchemist", "Tokyo Ghoul", "Hunter x Hunter"
]);

const toCheck = chars.filter(c => newUniverses.has(c.universe));
console.log(`Checking ${toCheck.length} new-universe characters...`);

const broken = [];
const ok = [];

async function checkUrl(char) {
  try {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 10000);
    const res = await fetch(char.imageUrl, {
      method: "HEAD",
      signal: ctrl.signal,
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (compatible; bot)" }
    });
    clearTimeout(timeout);
    if (res.ok) {
      ok.push(char);
    } else {
      broken.push({ ...char, status: res.status });
    }
  } catch (e) {
    broken.push({ ...char, status: e.name === "AbortError" ? "TIMEOUT" : "ERROR" });
  }
}

// Check in batches of 8
for (let i = 0; i < toCheck.length; i += 8) {
  const batch = toCheck.slice(i, i + 8);
  await Promise.all(batch.map(checkUrl));
  process.stdout.write(`  Checked ${Math.min(i + 8, toCheck.length)}/${toCheck.length}\r`);
}
process.stdout.write("\n");

console.log(`\nResults: ${ok.length} OK, ${broken.length} broken`);
if (broken.length > 0) {
  console.log("\nBroken URLs:");
  for (const b of broken) {
    console.log(`  [${b.status}] ${b.universe} > ${b.name}`);
    console.log(`           ${b.imageUrl}`);
  }
}
