/**
 * Verifies each imageUrl in seed-characters.ts by doing a HEAD request.
 * Outputs a JSON report of broken URLs.
 */
import { readFileSync } from "fs";

const content = readFileSync("scripts/src/seed-characters.ts", "utf8");

// Extract all imageUrl values
const urlRegex = /\{ name: "([^"]+)", universe: "([^"]+)", gender: "[^"]+", imageUrl: ([^,]+), ageNote: "[^"]*" \}/g;

const chars = [];
for (const m of content.matchAll(urlRegex)) {
  const [, name, universe, imageExpr] = m;
  // Evaluate the expression to get the URL
  let imageUrl = imageExpr.trim();
  // Handle FW("wiki","path") calls
  if (imageUrl.startsWith("FW(")) {
    const inner = imageUrl.slice(3, -1);
    const parts = inner.match(/"([^"]+)",\s*"([^"]+)"/);
    if (parts) {
      imageUrl = `https://static.wikia.nocookie.net/${parts[1]}/images/${parts[2]}`;
    }
  } else if (imageUrl.startsWith("DDragon(")) {
    const n = imageUrl.match(/"([^"]+)"/)?.[1];
    imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${n}_0.jpg`;
  } else if (imageUrl.startsWith("GI(")) {
    const n = imageUrl.match(/"([^"]+)"/)?.[1];
    imageUrl = `https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_${n}.png`;
  } else if (imageUrl.startsWith("GIE(")) {
    const n = imageUrl.match(/"([^"]+)"/)?.[1];
    imageUrl = `https://enka.network/ui/UI_AvatarIcon_${n}.png`;
  } else if (imageUrl.startsWith("HSR_ID(")) {
    const n = imageUrl.match(/\((\d+)\)/)?.[1];
    imageUrl = `https://cdn.jsdelivr.net/gh/Mar-7th/StarRailRes@master/icon/character/${n}.png`;
  } else if (imageUrl.startsWith("OW(")) {
    const n = imageUrl.match(/"([^"]+)"/)?.[1];
    imageUrl = `https://d1u1mce87gyfbn.cloudfront.net/hero/${n}/hero-select-portrait.png`;
  } else if (imageUrl.startsWith("AK(")) {
    const n = imageUrl.match(/"([^"]+)"/)?.[1];
    imageUrl = `https://raw.githubusercontent.com/ArknightsAssets/ArknightsAssets/cn/assets/torappu/dynamicassets/arts/charportraits/${n}.png`;
  } else if (imageUrl.startsWith("MV(")) {
    const n = imageUrl.match(/"([^"]+)"/)?.[1];
    imageUrl = `https://i.annihil.us/u/prod/marvel/i/mg/${n}/portrait_incredible.jpg`;
  } else if (imageUrl.startsWith("P(")) {
    imageUrl = null; // placeholder — skip
  }
  if (imageUrl) chars.push({ name, universe, imageUrl });
}

console.log(`Checking ${chars.length} character images (sampling new universes)...`);

// Filter to only new universes for speed
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
    const timeout = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(char.imageUrl, { method: "HEAD", signal: ctrl.signal, redirect: "follow" });
    clearTimeout(timeout);
    if (res.ok || res.status === 200) {
      ok.push(char);
    } else {
      broken.push({ ...char, status: res.status });
    }
  } catch (e) {
    broken.push({ ...char, status: "TIMEOUT/ERROR" });
  }
}

// Check in batches of 10
for (let i = 0; i < toCheck.length; i += 10) {
  const batch = toCheck.slice(i, i + 10);
  await Promise.all(batch.map(checkUrl));
  process.stdout.write(`  Checked ${Math.min(i + 10, toCheck.length)}/${toCheck.length}\r`);
}
process.stdout.write("\n");

console.log(`\nResults: ${ok.length} OK, ${broken.length} broken`);
if (broken.length > 0) {
  console.log("\nBroken:");
  for (const b of broken) {
    console.log(`  [${b.status}] ${b.universe} - ${b.name}`);
    console.log(`          ${b.imageUrl}`);
  }
}
