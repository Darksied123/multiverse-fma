/**
 * Uses Fandom wiki API to find real image URLs for characters.
 * For each universe, searches the wiki for the character name and retrieves images.
 */

async function searchFandomImages(wiki, characterName) {
  try {
    // Search for the character page
    const searchUrl = `https://${wiki}.fandom.com/api.php?action=query&list=search&srsearch=${encodeURIComponent(characterName)}&srnamespace=0&srlimit=3&format=json&origin=*`;
    const searchRes = await fetch(searchUrl, { headers: { "User-Agent": "MultiVerse-FMA/1.0" } });
    const searchData = await searchRes.json();
    const results = searchData?.query?.search ?? [];
    if (results.length === 0) return null;

    // Get page images from the first result
    const pageTitle = results[0].title;
    const imagesUrl = `https://${wiki}.fandom.com/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=pageimages&pithumbsize=500&format=json&origin=*`;
    const imgRes = await fetch(imagesUrl, { headers: { "User-Agent": "MultiVerse-FMA/1.0" } });
    const imgData = await imgRes.json();
    const pages = imgData?.query?.pages ?? {};
    const page = Object.values(pages)[0];
    const thumbUrl = page?.thumbnail?.source;
    if (thumbUrl) return { charName: characterName, wiki, pageTitle, url: thumbUrl };
    
    // Try getting images listed on the page
    const imagesUrl2 = `https://${wiki}.fandom.com/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=images&imlimit=5&format=json&origin=*`;
    const imgRes2 = await fetch(imagesUrl2, { headers: { "User-Agent": "MultiVerse-FMA/1.0" } });
    const imgData2 = await imgRes2.json();
    const pages2 = imgData2?.query?.pages ?? {};
    const page2 = Object.values(pages2)[0];
    const images = page2?.images ?? [];
    if (images.length > 0) {
      // Get first image URL
      const firstImg = images[0].title;
      const imgInfoUrl = `https://${wiki}.fandom.com/api.php?action=query&titles=${encodeURIComponent(firstImg)}&prop=imageinfo&iiprop=url&format=json&origin=*`;
      const infoRes = await fetch(imgInfoUrl, { headers: { "User-Agent": "MultiVerse-FMA/1.0" } });
      const infoData = await infoRes.json();
      const infoPages = infoData?.query?.pages ?? {};
      const infoPage = Object.values(infoPages)[0];
      const url = infoPage?.imageinfo?.[0]?.url;
      if (url) return { charName: characterName, wiki, pageTitle, url };
    }
    
    return null;
  } catch (e) {
    return null;
  }
}

// Characters to look up
const lookups = [
  // NieR: Automata
  { wiki: "nier", chars: ["2B", "9S (NieR)", "A2 (NieR)"] },
  // Resident Evil  
  { wiki: "residentevil", chars: ["Jill Valentine", "Ada Wong", "Leon S. Kennedy", "Lady Dimitrescu", "Claire Redfield"] },
  // Street Fighter
  { wiki: "streetfighter", chars: ["Chun-Li", "Cammy White", "Juri Han", "Ryu", "Ken Masters", "Karin Kanzuki"] },
  // Devil May Cry
  { wiki: "devilmaycry", chars: ["Dante (Devil May Cry)", "Vergil (Devil May Cry)", "Lady (Devil May Cry)", "Trish (Devil May Cry)", "Nico (Devil May Cry)"] },
  // Tekken
  { wiki: "tekken", chars: ["Nina Williams", "Christie Monteiro", "Asuka Kazama", "Lars Alexandersson", "Jin Kazama"] },
  // Avatar: Korra
  { wiki: "avatar", chars: ["Korra", "Asami Sato", "Lin Beifong", "Mako (Avatar)", "Bolin"] },
  // Arcane
  { wiki: "arcane", chars: ["Vi (Arcane)", "Caitlyn (Arcane)", "Jayce (Arcane)", "Viktor (Arcane)"] },
  // Castlevania
  { wiki: "castlevania", chars: ["Sypha Belnades", "Alucard (Castlevania)", "Trevor Belmont"] },
  // Invincible
  { wiki: "invincible", chars: ["Mark Grayson", "Atom Eve", "Debbie Grayson", "Omni-Man"] },
  // The Boys
  { wiki: "the-boys-franchise", chars: ["Billy Butcher", "Annie January", "Queen Maeve", "Homelander"] },
  // Berserk
  { wiki: "berserk", chars: ["Guts", "Griffith (Berserk)", "Casca", "Farnese de Vandimion"] },
  // FMA
  { wiki: "fma", chars: ["Roy Mustang", "Riza Hawkeye", "Olivier Mira Armstrong", "Izumi Curtis", "Alex Louis Armstrong"] },
  // Tokyo Ghoul
  { wiki: "tokyoghoul", chars: ["Ken Kaneki", "Touka Kirishima", "Shuu Tsukiyama", "Rize Kamishiro"] },
  // HxH
  { wiki: "hunterxhunter", chars: ["Hisoka Morow", "Leorio Paradinight", "Bisky"] },
  // Manhwa
  { wiki: "omniscient-readers-viewpoint", chars: ["Kim Dokja", "Yoo Joonghyuk", "Han Sooyoung", "Lee Hyunsung", "Jung Heewon"] },
  { wiki: "second-life-ranker", chars: ["Yeonwoo", "Rebecca Cha", "Edora", "Shanon"] },
];

const results = [];
for (const group of lookups) {
  process.stdout.write(`Searching ${group.wiki}...\n`);
  const batchResults = await Promise.all(group.chars.map(c => searchFandomImages(group.wiki, c)));
  for (const r of batchResults) {
    if (r) {
      results.push(r);
      console.log(`  ✅ ${r.charName}: ${r.url.slice(0, 80)}...`);
    } else {
      const name = group.chars[batchResults.indexOf(r)];
      console.log(`  ❌ ${name}: NOT FOUND`);
    }
  }
}

console.log("\n=== FOUND IMAGE URLS ===");
for (const r of results) {
  console.log(`${r.charName} (${r.wiki}): ${r.url}`);
}
