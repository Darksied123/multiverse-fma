/**
 * Focused search for characters that got wrong/missing results.
 */

async function searchFandomImages(wiki, characterName, searchTermOverride) {
  try {
    const searchTerm = searchTermOverride || characterName;
    const searchUrl = `https://${wiki}.fandom.com/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&srnamespace=0&srlimit=3&format=json&origin=*`;
    const searchRes = await fetch(searchUrl, { headers: { "User-Agent": "MultiVerse-FMA/1.0" } });
    const searchData = await searchRes.json();
    const results = searchData?.query?.search ?? [];
    if (results.length === 0) return { name: characterName, url: null, note: "no search results" };

    const pageTitle = results[0].title;
    const imagesUrl = `https://${wiki}.fandom.com/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=pageimages&pithumbsize=500&format=json&origin=*`;
    const imgRes = await fetch(imagesUrl, { headers: { "User-Agent": "MultiVerse-FMA/1.0" } });
    const imgData = await imgRes.json();
    const pages = imgData?.query?.pages ?? {};
    const page = Object.values(pages)[0];
    const thumbUrl = page?.thumbnail?.source;
    if (thumbUrl) return { name: characterName, url: thumbUrl, page: pageTitle };
    return { name: characterName, url: null, note: `no thumb on page "${pageTitle}"` };
  } catch (e) {
    return { name: characterName, url: null, note: e.message };
  }
}

async function getFileUrl(wiki, filename) {
  try {
    const url = `https://${wiki}.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json&origin=*`;
    const res = await fetch(url, { headers: { "User-Agent": "MultiVerse-FMA/1.0" } });
    const data = await res.json();
    const pages = data?.query?.pages ?? {};
    const page = Object.values(pages)[0];
    return page?.imageinfo?.[0]?.url ?? null;
  } catch { return null; }
}

// Find Invincible and The Boys (truncated previously)
console.log("=== INVINCIBLE ===");
const invPairs = [
  ["invincible", "Mark Grayson"],
  ["invincible", "Atom Eve"],
  ["invincible", "Debbie Grayson"],
  ["invincible", "Omni-Man"],
];
for (const [wiki, name] of invPairs) {
  const r = await searchFandomImages(wiki, name);
  console.log(`${name}: ${r.url || r.note}`);
}

console.log("\n=== THE BOYS ===");
const boysPairs = [
  ["the-boys-franchise", "Billy Butcher"],
  ["the-boys-franchise", "Annie January"],
  ["the-boys-franchise", "Queen Maeve"],
  ["the-boys-franchise", "Homelander"],
];
for (const [wiki, name] of boysPairs) {
  const r = await searchFandomImages(wiki, name);
  console.log(`${name}: ${r.url || r.note}`);
}

// Fix Devil May Cry (search by character name on the article)
console.log("\n=== DEVIL MAY CRY (corrected) ===");
const dmcPairs = [
  ["devilmaycry", "Dante", "Dante Devil May Cry character"],
  ["devilmaycry", "Vergil"],
  ["devilmaycry", "Lady", "Lady Devil May Cry"],
  ["devilmaycry", "Trish", "Trish Devil May Cry"],
  ["devilmaycry", "Nico", "Nico Devil May Cry 5"],
];
for (const [wiki, name, override] of dmcPairs) {
  const r = await searchFandomImages(wiki, name, override);
  console.log(`${name}: ${r.url || r.note} (page: ${r.page})`);
}

// Fix Arcane problematic ones
console.log("\n=== ARCANE (corrected) ===");
const arcanePairs = [
  ["arcane", "Jayce"],
  ["arcane", "Viktor"],
];
for (const [wiki, name] of arcanePairs) {
  const r = await searchFandomImages(wiki, name);
  console.log(`${name}: ${r.url || r.note} (page: ${r.page})`);
}

// Fix Castlevania Alucard
console.log("\n=== CASTLEVANIA Alucard ===");
const r = await searchFandomImages("castlevania", "Alucard", "Alucard Netflix");
console.log(`Alucard: ${r.url || r.note} (page: ${r.page})`);

// Fix Avatar Mako
console.log("\n=== AVATAR Mako ===");
const r2 = await searchFandomImages("avatar", "Mako", "Mako Legend of Korra");
console.log(`Mako: ${r2.url || r2.note} (page: ${r2.page})`);

// Try known good DMC file names
console.log("\n=== DMC Known File Names ===");
const dmcFiles = [
  "Dante_DMC5_artwork.png",
  "Dante_DMC5.jpg",
  "Dante_2019_artwork.png",
  "Vergil_DMC5_artwork.png",
  "Lady_DMC5.png",
  "Trish_DMC5.png",
];
for (const f of dmcFiles) {
  const url = await getFileUrl("devilmaycry", f);
  if (url) console.log(`✅ ${f}: ${url}`);
}
