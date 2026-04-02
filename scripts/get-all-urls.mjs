/**
 * Gets complete URLs for all new universe characters
 */

async function getThumb(wiki, page) {
  try {
    const url = `https://${wiki}.fandom.com/api.php?action=query&titles=${encodeURIComponent(page)}&prop=pageimages&pithumbsize=400&format=json&origin=*`;
    const res = await fetch(url, { headers: { "User-Agent": "MultiVerse-FMA/1.0" } });
    const d = await res.json();
    const p = Object.values(d?.query?.pages ?? {})[0];
    return p?.thumbnail?.source ?? null;
  } catch { return null; }
}

async function searchAndGetThumb(wiki, searchQuery, pageTitle) {
  try {
    if (pageTitle) return await getThumb(wiki, pageTitle);
    const url = `https://${wiki}.fandom.com/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchQuery)}&srnamespace=0&srlimit=1&format=json&origin=*`;
    const res = await fetch(url, { headers: { "User-Agent": "MultiVerse-FMA/1.0" } });
    const d = await res.json();
    const results = d?.query?.search ?? [];
    if (!results.length) return null;
    return await getThumb(wiki, results[0].title);
  } catch { return null; }
}

const lookups = [
  // NieR: Automata
  { key: "2B", wiki: "nier", page: "YoRHa No.2 Type B" },
  { key: "9S", wiki: "nier", page: "YoRHa No.9 Type S" },
  { key: "A2", wiki: "nier", page: "YoRHa Type A No.2" },
  { key: "Commander", wiki: "nier", page: "Commander" },
  // Resident Evil
  { key: "Jill", wiki: "residentevil", page: "Jill Valentine" },
  { key: "Ada", wiki: "residentevil", page: "Ada Wong" },
  { key: "Leon", wiki: "residentevil", page: "Leon S. Kennedy" },
  { key: "Dimitrescu", wiki: "residentevil", page: "Alcina Dimitrescu" },
  { key: "Claire", wiki: "residentevil", page: "Claire Redfield" },
  // Street Fighter
  { key: "ChunLi", wiki: "streetfighter", page: "Chun-Li" },
  { key: "Cammy", wiki: "streetfighter", page: "Cammy White" },
  { key: "Juri", wiki: "streetfighter", page: "Juri Han" },
  { key: "Ryu", wiki: "streetfighter", page: "Ryu" },
  { key: "Ken", wiki: "streetfighter", page: "Ken Masters" },
  { key: "Karin", wiki: "streetfighter", page: "Karin Kanzuki" },
  // Devil May Cry
  { key: "Dante_DMC", wiki: "devilmaycry", page: "Dante" },
  { key: "Vergil_DMC", wiki: "devilmaycry", page: "Vergil" },
  { key: "Lady_DMC", wiki: "devilmaycry", page: "Lady" },
  { key: "Trish_DMC", wiki: "devilmaycry", page: "Trish" },
  { key: "Nico_DMC", wiki: "devilmaycry", page: "Nico" },
  // Tekken
  { key: "Nina", wiki: "tekken", page: "Nina Williams" },
  { key: "Christie", wiki: "tekken", page: "Christie Monteiro" },
  { key: "Asuka_T", wiki: "tekken", page: "Asuka Kazama" },
  { key: "Lars", wiki: "tekken", page: "Lars Alexandersson" },
  { key: "Jin", wiki: "tekken", page: "Jin Kazama" },
  // Avatar: Korra
  { key: "Korra", wiki: "avatar", page: "Korra" },
  { key: "Asami", wiki: "avatar", page: "Asami Sato" },
  { key: "Lin", wiki: "avatar", page: "Lin Beifong" },
  { key: "Mako_A", wiki: "avatar", page: "Mako" },
  { key: "Bolin", wiki: "avatar", page: "Bolin" },
  // Arcane
  { key: "Vi_Arcane", wiki: "arcane", page: "Vi" },
  { key: "Caitlyn_Arcane", wiki: "arcane", page: "Caitlyn" },
  { key: "Jayce_Arcane", wiki: "arcane", page: "Jayce Talis" },
  { key: "Viktor_Arcane", wiki: "arcane", page: "Viktor" },
  // Castlevania
  { key: "Sypha", wiki: "castlevania", page: "Sypha Belnades" },
  { key: "Alucard_CV", wiki: "castlevania", page: "Alucard (animated series)" },
  { key: "Trevor_CV", wiki: "castlevania", page: "Trevor Belmont" },
  // Invincible
  { key: "Mark_Inv", wiki: "amazon-invincible", page: "Mark Grayson" },
  { key: "Eve_Inv", wiki: "amazon-invincible", page: "Atom Eve" },
  { key: "Debbie_Inv", wiki: "amazon-invincible", page: "Debbie Grayson" },
  { key: "Omni_Inv", wiki: "amazon-invincible", page: "Omni-Man" },
  // The Boys
  { key: "Butcher_Boys", wiki: "amazons-the-boys", page: "Billy Butcher" },
  { key: "Starlight_Boys", wiki: "amazons-the-boys", page: "Starlight" },
  { key: "Maeve_Boys", wiki: "amazons-the-boys", page: "Queen Maeve" },
  { key: "Homelander_Boys", wiki: "amazons-the-boys", page: "Homelander" },
  // Berserk
  { key: "Guts_B", wiki: "berserk", page: "Guts" },
  { key: "Griffith_B", wiki: "berserk", page: "Griffith" },
  { key: "Casca_B", wiki: "berserk", page: "Casca" },
  { key: "Farnese_B", wiki: "berserk", page: "Farnese de Vandimion" },
  // FMA
  { key: "Mustang_FMA", wiki: "fma", page: "Roy Mustang" },
  { key: "Hawkeye_FMA", wiki: "fma", page: "Riza Hawkeye" },
  { key: "Olivier_FMA", wiki: "fma", page: "Olivier Mira Armstrong" },
  { key: "Izumi_FMA", wiki: "fma", page: "Izumi Curtis" },
  { key: "Alex_FMA", wiki: "fma", page: "Alex Louis Armstrong" },
  // Tokyo Ghoul
  { key: "Kaneki_TG", wiki: "tokyoghoul", page: "Ken Kaneki" },
  { key: "Touka_TG", wiki: "tokyoghoul", page: "Touka Kirishima" },
  { key: "Tsukiyama_TG", wiki: "tokyoghoul", page: "Shuu Tsukiyama" },
  { key: "Rize_TG", wiki: "tokyoghoul", page: "Rize Kamishiro" },
  // HxH
  { key: "Hisoka_HxH", wiki: "hunterxhunter", page: "Hisoka Morow" },
  { key: "Leorio_HxH", wiki: "hunterxhunter", page: "Leorio Paradinight" },
  { key: "Biscuit_HxH", wiki: "hunterxhunter", page: "Biscuit Krueger" },
  // Omniscient Reader
  { key: "KimDokja_ORV", wiki: "omniscient-readers-viewpoint", page: "Kim Dokja" },
  { key: "YooJoonghyuk_ORV", wiki: "omniscient-readers-viewpoint", page: "Yoo Joonghyuk" },
  { key: "HanSooyoung_ORV", wiki: "omniscient-readers-viewpoint", page: "Han Sooyoung" },
  { key: "LeeHyunsung_ORV", wiki: "omniscient-readers-viewpoint", page: "Lee Hyunsung" },
  { key: "JungHeewon_ORV", wiki: "omniscient-readers-viewpoint", page: "Jung Heewon" },
  // Second Life Ranker
  { key: "Yeonwoo_SLR", wiki: "second-life-ranker", page: "Yeonwoo" },
  { key: "Rebecca_SLR", wiki: "second-life-ranker", page: "Rebecca Cha" },
  { key: "Edora_SLR", wiki: "second-life-ranker", page: "Edora" },
  { key: "Shanon_SLR", wiki: "second-life-ranker", page: "Shanon" },
];

const results = {};
// Run in batches of 10
for (let i = 0; i < lookups.length; i += 10) {
  const batch = lookups.slice(i, i + 10);
  const resolved = await Promise.all(batch.map(l => 
    searchAndGetThumb(l.wiki, l.page, l.page).then(url => ({ key: l.key, url }))
  ));
  for (const r of resolved) {
    results[r.key] = r.url;
    process.stdout.write(`${r.url ? "✅" : "❌"} ${r.key}\n`);
  }
}

console.log("\n\n=== JSON MAP ===");
console.log(JSON.stringify(results, null, 2));
