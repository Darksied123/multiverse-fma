/** Final targeted searches */

async function getThumb(wiki, pageTitle) {
  try {
    const url = `https://${wiki}.fandom.com/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=pageimages&pithumbsize=500&format=json&origin=*`;
    const res = await fetch(url, { headers: { "User-Agent": "MultiVerse-FMA/1.0" } });
    const data = await res.json();
    const pages = data?.query?.pages ?? {};
    const page = Object.values(pages)[0];
    return page?.thumbnail?.source ?? null;
  } catch { return null; }
}

async function listImages(wiki, pageTitle) {
  try {
    const url = `https://${wiki}.fandom.com/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=images&imlimit=10&format=json&origin=*`;
    const res = await fetch(url, { headers: { "User-Agent": "MultiVerse-FMA/1.0" } });
    const data = await res.json();
    const pages = data?.query?.pages ?? {};
    const page = Object.values(pages)[0];
    return (page?.images ?? []).map(i => i.title);
  } catch { return []; }
}

async function getFileInfo(wiki, fileTitle) {
  try {
    const url = `https://${wiki}.fandom.com/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url&format=json&origin=*`;
    const res = await fetch(url, { headers: { "User-Agent": "MultiVerse-FMA/1.0" } });
    const data = await res.json();
    const pages = data?.query?.pages ?? {};
    const page = Object.values(pages)[0];
    return page?.imageinfo?.[0]?.url ?? null;
  } catch { return null; }
}

// DMC character pages
console.log("=== DMC direct page images ===");
const dmcPages = ["Dante", "Lady", "Trish", "Nico"];
for (const p of dmcPages) {
  const images = await listImages("devilmaycry", p);
  console.log(`\n${p} images:`);
  for (const img of images.slice(0, 5)) console.log(`  ${img}`);
  const thumb = await getThumb("devilmaycry", p);
  console.log(`  thumb: ${thumb}`);
}

// The Boys - try correct wiki name
console.log("\n=== THE BOYS correct wiki ===");
const boysWikis = ["the-boys-franchise", "theboys"];
for (const wiki of boysWikis) {
  const r = await getThumb(wiki, "Billy Butcher");
  console.log(`${wiki}/Billy Butcher: ${r}`);
}

// Try Amazon wiki
const r2 = await getThumb("the-boys-franchise", "Main Page");
console.log(`franchise wiki main page thumb: ${r2}`);

// Avatar Mako fix
console.log("\n=== AVATAR MAKO ===");
const makoImages = await listImages("avatar", "Mako");
console.log("Mako page images:");
for (const img of makoImages.slice(0, 8)) console.log(`  ${img}`);
const makoThumb = await getThumb("avatar", "Mako");
console.log(`Mako thumb: ${makoThumb}`);

// Return of the Mad Demon - does it have a fandom wiki?
console.log("\n=== RETURN OF THE MAD DEMON ===");
const rotmdWikis = ["return-of-mad-demon", "return-of-the-mad-demon", "rotmd"];
for (const wiki of rotmdWikis) {
  try {
    const r = await fetch(`https://${wiki}.fandom.com/api.php?action=query&list=allpages&aplimit=5&format=json&origin=*`, { headers: { "User-Agent": "Multi/1.0" } });
    const d = await r.json();
    const exists = d?.query?.allpages?.length > 0;
    console.log(`${wiki}: exists=${exists}`);
    if (exists) {
      const pages = d.query.allpages;
      console.log(`  pages: ${pages.map(p => p.title).join(", ")}`);
    }
  } catch(e) {
    console.log(`${wiki}: error - ${e.message}`);
  }
}
