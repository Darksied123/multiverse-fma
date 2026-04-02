/**
 * Replaces all the 404 guessed FW() URLs in the newly added
 * character entries with the real ones discovered via the Fandom API.
 * Also replaces with P() placeholder for any we couldn't find.
 */
import { readFileSync, writeFileSync } from "fs";

const file = "scripts/src/seed-characters.ts";
let content = readFileSync(file, "utf8");

// Helper - direct URL string replacement for a named character
// Replaces the imageUrl value for that exact character line
function replaceImageUrl(name, newUrl) {
  // Match the line containing the exact name and an FW( or P( imageUrl
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `({ name: "${escapedName}", universe: "[^"]+", gender: "[^"]+", imageUrl: )(FW\\([^)]+\\)|P\\("[^"]*"\\))`,
    "g"
  );
  const replacement = `$1\`${newUrl}\``;
  const updated = content.replace(re, replacement);
  if (updated === content) {
    // Try with backtick already (if we already updated it)
    console.warn(`  WARN: Could not find FW() for "${name}"`);
  } else {
    content = updated;
  }
}

// Replacement map: character name → real image URL
// null = use P() placeholder
const replacements = {
  // NieR: Automata
  "2B (YoRHa No.2 Type B)": "https://static.wikia.nocookie.net/nier/images/3/38/YoRHa_No.2_Type_B.png/revision/latest/scale-to-width-down/400?cb=20170322051325",
  "9S (YoRHa No.9 Type S)": "https://static.wikia.nocookie.net/nier/images/8/84/YoRHa_No.9_Type_S.png/revision/latest/scale-to-width-down/400?cb=20220205191546",
  "A2 (YoRHa Type A No.2)": "https://static.wikia.nocookie.net/nier/images/f/fe/YoRHa_No.2A.png/revision/latest/scale-to-width-down/400?cb=20170423025735",
  "Commander White": null, // small wiki page
  // Resident Evil
  "Jill Valentine": "https://static.wikia.nocookie.net/residentevil/images/0/0e/Jill_-_Death_Island_Render.png/revision/latest/scale-to-width-down/400?cb=20230706214935",
  "Ada Wong": "https://static.wikia.nocookie.net/residentevil/images/a/a7/Ada_Wong_RE6_render.png/revision/latest/scale-to-width-down/400?cb=20260116014956",
  "Leon S. Kennedy": "https://static.wikia.nocookie.net/residentevil/images/1/19/Leon_Kennedy_RE4R_Render.png/revision/latest/scale-to-width-down/400?cb=20230330000000",
  "Lady Dimitrescu": "https://static.wikia.nocookie.net/residentevil/images/f/f8/ADimitrescuFull.png/revision/latest/scale-to-width-down/400?cb=20210523144240",
  "Claire Redfield": "https://static.wikia.nocookie.net/residentevil/images/9/9e/Claire_-_Death_Island_Render.png/revision/latest/scale-to-width-down/400?cb=20230703033607",
  // Street Fighter
  "Chun-Li": "https://static.wikia.nocookie.net/streetfighter/images/5/5b/Chun-Li_SF6_Render.png/revision/latest/scale-to-width-down/400?cb=20220603005535",
  "Cammy White": "https://static.wikia.nocookie.net/streetfighter/images/9/9a/SF6_Cammy.png/revision/latest/scale-to-width-down/400?cb=20220610000000",
  "Juri Han": "https://static.wikia.nocookie.net/streetfighter/images/d/dc/Sf6-juri.png/revision/latest/scale-to-width-down/400?cb=20220808055222",
  "Ryu": "https://static.wikia.nocookie.net/streetfighter/images/3/3a/Sf6-ryu.png/revision/latest/scale-to-width-down/400?cb=20220603010542",
  "Ken Masters": "https://static.wikia.nocookie.net/streetfighter/images/1/14/Ken_SF6_Render.png/revision/latest/scale-to-width-down/400?cb=20220915164810",
  "Karin Kanzuki": "https://static.wikia.nocookie.net/streetfighter/images/6/65/Karin_Kanzuki_%28SFV%29.png/revision/latest/scale-to-width-down/400?cb=20160321000000",
  // Devil May Cry
  "Dante": "https://static.wikia.nocookie.net/devilmaycry/images/c/c2/Dante_DMC5.png/revision/latest/scale-to-width-down/400?cb=20180922220047",
  "Vergil": "https://static.wikia.nocookie.net/devilmaycry/images/4/4e/Vergil_DMC5.png/revision/latest/scale-to-width-down/400?cb=20240130212008",
  "Lady": "https://static.wikia.nocookie.net/devilmaycry/images/c/c9/DMC5_Lady.png/revision/latest/scale-to-width-down/400?cb=20180922220400",
  "Trish": "https://static.wikia.nocookie.net/devilmaycry/images/7/79/DMC5_Trish.png/revision/latest/scale-to-width-down/400?cb=20180922220252",
  "Nico": "https://static.wikia.nocookie.net/devilmaycry/images/8/8a/Nicoletta_Goldstein_DMC5.png/revision/latest/scale-to-width-down/400?cb=20230810220744",
  // Tekken
  "Nina Williams": "https://static.wikia.nocookie.net/tekken/images/c/c8/Tekken_8_-_Nina_Williams_Official_Render.jpg/revision/latest/scale-to-width-down/400?cb=20230901101613&path-prefix=en",
  "Christie Monteiro": "https://static.wikia.nocookie.net/tekken/images/5/55/Christie4.png/revision/latest/scale-to-width-down/400?cb=20171111111301&path-prefix=en",
  "Asuka Kazama": "https://static.wikia.nocookie.net/tekken/images/b/b1/Tekken_8_-_Asuka_Render.jpg/revision/latest/scale-to-width-down/400?cb=20230425185037&path-prefix=en",
  "Lars Alexandersson": "https://static.wikia.nocookie.net/tekken/images/e/e6/Lars_Alexandersson_TK8_%28High_Resolution%29.jpg/revision/latest/scale-to-width-down/400?cb=20251203010212&path-prefix=en",
  "Jin Kazama": "https://static.wikia.nocookie.net/tekken/images/a/ab/T8_-_Jin_Render_%28High_Res%29.png/revision/latest/scale-to-width-down/400?cb=20230912000000&path-prefix=en",
  // Avatar: Korra
  "Korra": "https://static.wikia.nocookie.net/avatar/images/3/31/Korra_smiling.png/revision/latest/scale-to-width-down/400?cb=20200810000000",
  "Asami Sato": "https://static.wikia.nocookie.net/avatar/images/b/b6/Asami_Sato.png/revision/latest/scale-to-width-down/400?cb=20200101000000",
  "Lin Beifong": "https://static.wikia.nocookie.net/avatar/images/8/83/Lin_Beifong.png/revision/latest/scale-to-width-down/400?cb=20200101000000",
  "Mako": "https://static.wikia.nocookie.net/avatar/images/a/a6/Mako.png/revision/latest/scale-to-width-down/400?cb=20150408124557",
  "Bolin": "https://static.wikia.nocookie.net/avatar/images/d/d4/Bolin.png/revision/latest/scale-to-width-down/400?cb=20200101000000",
  // Arcane
  "Vi (Arcane)": "https://static.wikia.nocookie.net/arcane/images/c/ca/ViFinaleSitting.jpg/revision/latest/scale-to-width-down/400?cb=20241023000000",
  "Caitlyn Kiramman": "https://static.wikia.nocookie.net/arcane/images/9/94/Caitlyn_Arcane_S2.png/revision/latest/scale-to-width-down/400?cb=20241023000000",
  "Jayce": "https://static.wikia.nocookie.net/arcane/images/f/f6/Astral_Jayce.png/revision/latest/scale-to-width-down/400?cb=20250203233045",
  "Viktor": "https://static.wikia.nocookie.net/arcane/images/e/e2/AstralViktor.png/revision/latest/scale-to-width-down/400?cb=20250323005235",
  // Castlevania
  "Sypha Belnades": "https://static.wikia.nocookie.net/castlevania/images/f/f6/Pachi_sypha.jpg/revision/latest/scale-to-width-down/400?cb=20181026000000",
  "Alucard": "https://static.wikia.nocookie.net/castlevania/images/2/21/Alucard_%28animated_series%29_-_01.jpg/revision/latest/scale-to-width-down/400?cb=20250816201900",
  "Trevor Belmont": "https://static.wikia.nocookie.net/castlevania/images/2/24/Trevor_Belmont_-_01.png/revision/latest/scale-to-width-down/400?cb=20181026000000",
  // Invincible
  "Mark Grayson (Invincible)": "https://static.wikia.nocookie.net/amazon-invincible/images/a/a3/Invincible_%28Mark_Grayson%29.png/revision/latest/scale-to-width-down/400?cb=20250717141424",
  "Atom Eve": "https://static.wikia.nocookie.net/amazon-invincible/images/7/74/Atom-EveProfile.png/revision/latest/scale-to-width-down/400?cb=20250520153227",
  "Debbie Grayson": "https://static.wikia.nocookie.net/amazon-invincible/images/c/cb/DebbieProfile.png/revision/latest/scale-to-width-down/400?cb=20210619071405",
  "Omni-Man": "https://static.wikia.nocookie.net/amazon-invincible/images/8/8d/Nolan_coalition_fullbod.png/revision/latest/scale-to-width-down/400?cb=20260123113904",
  // The Boys
  "Billy Butcher": "https://static.wikia.nocookie.net/amazons-the-boys/images/9/98/Billy_Butcher-S4.png/revision/latest/scale-to-width-down/400?cb=20240614090132",
  "Starlight (Annie January)": "https://static.wikia.nocookie.net/amazons-the-boys/images/2/24/Starlight-S4.png/revision/latest/scale-to-width-down/400?cb=20240614000000",
  "Queen Maeve": "https://static.wikia.nocookie.net/amazons-the-boys/images/2/27/Queen-Maeve-S3.png/revision/latest/scale-to-width-down/400?cb=20220604010748",
  "Homelander": "https://static.wikia.nocookie.net/amazons-the-boys/images/5/5b/Homelander-S4.png/revision/latest/scale-to-width-down/400?cb=20240614091600",
  // Berserk
  "Guts": "https://static.wikia.nocookie.net/berserk/images/4/40/Manga_V38_Guts.png/revision/latest/scale-to-width-down/400?cb=20170919104357",
  "Griffith": "https://static.wikia.nocookie.net/berserk/images/b/b0/BTCG_Griffith_Holding_Sabre.png/revision/latest/scale-to-width-down/400?cb=20170930052614",
  "Casca": "https://static.wikia.nocookie.net/berserk/images/9/9e/Farnese_de_Vandimion_Manga.jpg/revision/latest/scale-to-width-down/400?cb=20160918013313",
  "Farnese de Vandimion": "https://static.wikia.nocookie.net/berserk/images/9/9e/Farnese_de_Vandimion_Manga.jpg/revision/latest/scale-to-width-down/400?cb=20160918013313",
  // FMA
  "Roy Mustang": "https://static.wikia.nocookie.net/fma/images/5/5b/MustangManga.png/revision/latest/scale-to-width-down/400?cb=20250220111436",
  "Riza Hawkeye": "https://static.wikia.nocookie.net/fma/images/b/ba/RizaManga.png/revision/latest/scale-to-width-down/400?cb=20250220112828",
  "Olivier Mira Armstrong": "https://static.wikia.nocookie.net/fma/images/e/e6/Avatar_olivier.png/revision/latest/scale-to-width-down/400?cb=20160812165045",
  "Izumi Curtis": "https://static.wikia.nocookie.net/fma/images/2/26/Avatar_harnet.png/revision/latest/scale-to-width-down/400?cb=20171031131954",
  "Alex Louis Armstrong": "https://static.wikia.nocookie.net/fma/images/4/44/Avatar_alex0.png/revision/latest/scale-to-width-down/400?cb=20180418142334",
  // Tokyo Ghoul
  "Ken Kaneki": "https://static.wikia.nocookie.net/tokyoghoul/images/7/7d/Kaneki_Finale_HQ.png/revision/latest/scale-to-width-down/400?cb=20180706042331",
  "Touka Kirishima": "https://static.wikia.nocookie.net/tokyoghoul/images/5/5b/Touka_Finale_HQ.png/revision/latest/scale-to-width-down/400?cb=20181103072059",
  "Shu Tsukiyama": "https://static.wikia.nocookie.net/tokyoghoul/images/d/d6/Tsukiyama_Cover_Vol_4.png/revision/latest/scale-to-width-down/400?cb=20150321133928",
  "Rize Kamishiro": "https://static.wikia.nocookie.net/tokyoghoul/images/b/b5/Re_Vol_15_%28cleaned_version%29.png/revision/latest/scale-to-width-down/400?cb=20180323091504",
  // Hunter x Hunter
  "Hisoka Morow": "https://static.wikia.nocookie.net/hunterxhunter/images/2/29/Hisoka_Morow_YC_Portrait.png/revision/latest/scale-to-width-down/400?cb=20190123172039",
  "Leorio Paradinight": "https://static.wikia.nocookie.net/hunterxhunter/images/7/73/HxH2011_EP145_Leorio_Portrait.png/revision/latest/scale-to-width-down/400?cb=20230902193715",
  "Biscuit Krueger": "https://static.wikia.nocookie.net/hunterxhunter/images/c/cd/Biscuit_Krueger_CA_Portrait.png/revision/latest/scale-to-width-down/400?cb=20190630140152",
  // Omniscient Reader's Viewpoint
  "Kim Dokja": "https://static.wikia.nocookie.net/omniscient-readers-viewpoint/images/4/43/Kim_Dokja_Cover.jpg/revision/latest/scale-to-width-down/400?cb=20220817132702",
  "Yoo Joonghyuk": "https://static.wikia.nocookie.net/omniscient-readers-viewpoint/images/b/bf/Yoo_Joonghyuk_%28Volume_3_cover%29.png/revision/latest/scale-to-width-down/400?cb=20191022181447",
  "Han Sooyoung": "https://static.wikia.nocookie.net/omniscient-readers-viewpoint/images/b/bc/Han_Sooyoung_%28Volume_3_cover%29.png/revision/latest/scale-to-width-down/400?cb=20191022204529",
  "Lee Hyunsung": "https://static.wikia.nocookie.net/omniscient-readers-viewpoint/images/7/78/Lee_Hyunsung_Webnovel.png/revision/latest/scale-to-width-down/400?cb=20220818095712",
  "Jung Heewon": "https://static.wikia.nocookie.net/omniscient-readers-viewpoint/images/7/74/Jung_Heewon_Webnovel.png/revision/latest/scale-to-width-down/400?cb=20220811111418",
  // Second Life Ranker
  "Yeon-woo": "https://static.wikia.nocookie.net/second-life-ranker/images/0/03/5.jpg/revision/latest/scale-to-width-down/400?cb=20200817053021",
  "Rebecca Cha": "https://static.wikia.nocookie.net/second-life-ranker/images/7/77/Chapter_111_-_Sol_Luna.png/revision/latest/scale-to-width-down/400?cb=20211231084921",
  "Edora": "https://static.wikia.nocookie.net/second-life-ranker/images/b/b6/Edora-0.jpg/revision/latest/scale-to-width-down/400?cb=20201020091912",
  "Shanon": "https://static.wikia.nocookie.net/second-life-ranker/images/0/08/Shanon_Chapter_70.jpg/revision/latest/scale-to-width-down/400?cb=20210430070919",
  // Return of the Mad Demon - no fandom wiki; use placeholder
  "Jaha Lee": null,
  "Sima Young": null,
  "Gong Yoonjung": null,
  "Cheok Jungyeong": null,
};

let fixed = 0;
let used_placeholder = 0;

for (const [name, url] of Object.entries(replacements)) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  if (url === null) {
    // Replace with P() placeholder  
    const re = new RegExp(
      `(\\{ name: "${escapedName}", universe: "[^"]+", gender: "[^"]+", imageUrl: )FW\\("[^"]+",\\s*"[^"]+"\\)`,
      "g"
    );
    const before = content;
    content = content.replace(re, (match, prefix) => {
      return `${prefix}P("${name}")`;
    });
    if (content !== before) {
      used_placeholder++;
      console.log(`  🔲 ${name} → P()`);
    } else {
      console.warn(`  WARN: couldn't replace ${name} with P()`);
    }
  } else {
    // Replace FW() with the direct URL string
    const re = new RegExp(
      `(\\{ name: "${escapedName}", universe: "[^"]+", gender: "[^"]+", imageUrl: )FW\\("[^"]+",\\s*"[^"]+"\\)`,
      "g"
    );
    const before = content;
    content = content.replace(re, (match, prefix) => {
      return `${prefix}"${url}"`;
    });
    if (content !== before) {
      fixed++;
      console.log(`  ✅ ${name}`);
    } else {
      console.warn(`  WARN: couldn't replace ${name}`);
    }
  }
}

writeFileSync(file, content, "utf8");
console.log(`\nDone: ${fixed} URLs fixed, ${used_placeholder} set to placeholder`);
