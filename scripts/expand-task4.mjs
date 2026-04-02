import { readFileSync, writeFileSync } from "fs";

const file = "scripts/src/seed-characters.ts";
const content = readFileSync(file, "utf8");

const FW = (wiki, path) =>
  `FW("${wiki}", "${path}")`;

const newChars = `
  // ═══════════════════════════════════════════════════════════════════════════
  // MANHWA
  // ═══════════════════════════════════════════════════════════════════════════

  // ── OMNISCIENT READER'S VIEWPOINT (5) ─────────────────────────────────────
  { name: "Kim Dokja", universe: "Omniscient Reader", gender: "male", imageUrl: FW("omniscient-readers-viewpoint", "1/16/Kim_Dokja_Webtoon.png/revision/latest/scale-to-width-down/400?cb=20230916120000"), ageNote: "Adult (28)" },
  { name: "Yoo Joonghyuk", universe: "Omniscient Reader", gender: "male", imageUrl: FW("omniscient-readers-viewpoint", "4/4e/Yoo_Joonghyuk_Webtoon.png/revision/latest/scale-to-width-down/400?cb=20230916120000"), ageNote: "Adult" },
  { name: "Han Sooyoung", universe: "Omniscient Reader", gender: "female", imageUrl: FW("omniscient-readers-viewpoint", "c/c7/Han_Sooyoung_Webtoon.png/revision/latest/scale-to-width-down/400?cb=20230916120000"), ageNote: "Adult" },
  { name: "Lee Hyunsung", universe: "Omniscient Reader", gender: "male", imageUrl: FW("omniscient-readers-viewpoint", "8/8b/Lee_Hyunsung_Webtoon.png/revision/latest/scale-to-width-down/400?cb=20230916120000"), ageNote: "Adult" },
  { name: "Jung Heewon", universe: "Omniscient Reader", gender: "female", imageUrl: FW("omniscient-readers-viewpoint", "5/5e/Jung_Heewon_Webtoon.png/revision/latest/scale-to-width-down/400?cb=20230916120000"), ageNote: "Adult" },

  // ── SECOND LIFE RANKER (4) ─────────────────────────────────────────────────
  { name: "Yeon-woo", universe: "Second Life Ranker", gender: "male", imageUrl: FW("second-life-ranker", "a/a3/Yeonwoo_Manhwa.png/revision/latest/scale-to-width-down/400?cb=20220101120000"), ageNote: "Adult (25)" },
  { name: "Rebecca Cha", universe: "Second Life Ranker", gender: "female", imageUrl: FW("second-life-ranker", "6/63/Rebecca_Manhwa.png/revision/latest/scale-to-width-down/400?cb=20220101120000"), ageNote: "Adult" },
  { name: "Edora", universe: "Second Life Ranker", gender: "female", imageUrl: FW("second-life-ranker", "3/34/Edora_Manhwa.png/revision/latest/scale-to-width-down/400?cb=20220101120000"), ageNote: "Adult" },
  { name: "Shanon", universe: "Second Life Ranker", gender: "male", imageUrl: FW("second-life-ranker", "2/2e/Shanon_Manhwa.png/revision/latest/scale-to-width-down/400?cb=20220101120000"), ageNote: "Adult" },

  // ── RETURN OF THE MAD DEMON (4) ──────────────────────────────────────────
  { name: "Jaha Lee", universe: "Return of the Mad Demon", gender: "male", imageUrl: FW("return-of-the-mad-demon", "3/3a/Jaha_Lee_Manhwa.png/revision/latest/scale-to-width-down/400?cb=20230101120000"), ageNote: "Adult" },
  { name: "Sima Young", universe: "Return of the Mad Demon", gender: "female", imageUrl: FW("return-of-the-mad-demon", "9/9c/Sima_Young_Manhwa.png/revision/latest/scale-to-width-down/400?cb=20230101120000"), ageNote: "Adult" },
  { name: "Gong Yoonjung", universe: "Return of the Mad Demon", gender: "female", imageUrl: FW("return-of-the-mad-demon", "5/5b/Gong_Yoonjung_Manhwa.png/revision/latest/scale-to-width-down/400?cb=20230101120000"), ageNote: "Adult" },
  { name: "Cheok Jungyeong", universe: "Return of the Mad Demon", gender: "male", imageUrl: FW("return-of-the-mad-demon", "7/7a/Cheok_Jungyeong_Manhwa.png/revision/latest/scale-to-width-down/400?cb=20230101120000"), ageNote: "Adult" },

  // ═══════════════════════════════════════════════════════════════════════════
  // VIDEO GAMES
  // ═══════════════════════════════════════════════════════════════════════════

  // ── NIER: AUTOMATA (4) ─────────────────────────────────────────────────────
  { name: "2B (YoRHa No.2 Type B)", universe: "NieR: Automata", gender: "female", imageUrl: FW("nier", "4/4d/2B_-_Character_Artwork.png/revision/latest/scale-to-width-down/400?cb=20170611020614"), ageNote: "Adult android" },
  { name: "9S (YoRHa No.9 Type S)", universe: "NieR: Automata", gender: "male", imageUrl: FW("nier", "3/30/9S_-_Character_Artwork.png/revision/latest/scale-to-width-down/400?cb=20170611020614"), ageNote: "Adult android" },
  { name: "A2 (YoRHa Type A No.2)", universe: "NieR: Automata", gender: "female", imageUrl: FW("nier", "f/f1/A2_artwork.png/revision/latest/scale-to-width-down/400?cb=20170611020614"), ageNote: "Adult android" },
  { name: "Commander White", universe: "NieR: Automata", gender: "female", imageUrl: FW("nier", "5/52/Commander_Artwork.png/revision/latest/scale-to-width-down/400?cb=20170611020614"), ageNote: "Adult" },

  // ── RESIDENT EVIL (5) ──────────────────────────────────────────────────────
  { name: "Jill Valentine", universe: "Resident Evil", gender: "female", imageUrl: FW("residentevil", "8/8d/Jill_Valentine_RE3R.png/revision/latest/scale-to-width-down/400?cb=20200420152534"), ageNote: "Adult (23+)" },
  { name: "Ada Wong", universe: "Resident Evil", gender: "female", imageUrl: FW("residentevil", "1/13/Ada_Wong_RE4R.png/revision/latest/scale-to-width-down/400?cb=20230324140520"), ageNote: "Adult" },
  { name: "Leon S. Kennedy", universe: "Resident Evil", gender: "male", imageUrl: FW("residentevil", "5/5a/Leon_RE4R.png/revision/latest/scale-to-width-down/400?cb=20230324140520"), ageNote: "Adult (27)" },
  { name: "Lady Dimitrescu", universe: "Resident Evil", gender: "female", imageUrl: FW("residentevil", "d/d6/Lady_Alcina_Dimitrescu_RE8.png/revision/latest/scale-to-width-down/400?cb=20210508140520"), ageNote: "Adult" },
  { name: "Claire Redfield", universe: "Resident Evil", gender: "female", imageUrl: FW("residentevil", "6/6c/Claire_Redfield_REV2.png/revision/latest/scale-to-width-down/400?cb=20150118140520"), ageNote: "Adult (19+)" },

  // ── STREET FIGHTER (6) ─────────────────────────────────────────────────────
  { name: "Chun-Li", universe: "Street Fighter", gender: "female", imageUrl: FW("streetfighter", "7/7a/Chun_Li_SF6.png/revision/latest/scale-to-width-down/400?cb=20230602120000"), ageNote: "Adult" },
  { name: "Cammy White", universe: "Street Fighter", gender: "female", imageUrl: FW("streetfighter", "a/a4/Cammy_SF6.png/revision/latest/scale-to-width-down/400?cb=20230602120000"), ageNote: "Adult (22)" },
  { name: "Juri Han", universe: "Street Fighter", gender: "female", imageUrl: FW("streetfighter", "8/8c/Juri_SF6.png/revision/latest/scale-to-width-down/400?cb=20230602120000"), ageNote: "Adult" },
  { name: "Ryu", universe: "Street Fighter", gender: "male", imageUrl: FW("streetfighter", "3/3c/Ryu_SF6.png/revision/latest/scale-to-width-down/400?cb=20230602120000"), ageNote: "Adult" },
  { name: "Ken Masters", universe: "Street Fighter", gender: "male", imageUrl: FW("streetfighter", "e/e2/Ken_SF6.png/revision/latest/scale-to-width-down/400?cb=20230602120000"), ageNote: "Adult" },
  { name: "Karin Kanzuki", universe: "Street Fighter", gender: "female", imageUrl: FW("streetfighter", "2/2d/Karin_SFV.png/revision/latest/scale-to-width-down/400?cb=20160321120000"), ageNote: "Adult (18)" },

  // ── DEVIL MAY CRY (5) ──────────────────────────────────────────────────────
  { name: "Dante", universe: "Devil May Cry", gender: "male", imageUrl: FW("devilmaycry", "6/68/DMC5_Dante_Profile.png/revision/latest/scale-to-width-down/400?cb=20190310120000"), ageNote: "Adult" },
  { name: "Vergil", universe: "Devil May Cry", gender: "male", imageUrl: FW("devilmaycry", "7/70/DMC5_Vergil_Profile.png/revision/latest/scale-to-width-down/400?cb=20190310120000"), ageNote: "Adult" },
  { name: "Lady", universe: "Devil May Cry", gender: "female", imageUrl: FW("devilmaycry", "c/c0/DMC5_Lady_Profile.png/revision/latest/scale-to-width-down/400?cb=20190310120000"), ageNote: "Adult (18+)" },
  { name: "Trish", universe: "Devil May Cry", gender: "female", imageUrl: FW("devilmaycry", "5/5f/DMC5_Trish_Profile.png/revision/latest/scale-to-width-down/400?cb=20190310120000"), ageNote: "Adult" },
  { name: "Nico", universe: "Devil May Cry", gender: "female", imageUrl: FW("devilmaycry", "8/87/DMC5_Nico_Profile.png/revision/latest/scale-to-width-down/400?cb=20190310120000"), ageNote: "Adult" },

  // ── TEKKEN (5) ─────────────────────────────────────────────────────────────
  { name: "Nina Williams", universe: "Tekken", gender: "female", imageUrl: FW("tekken", "8/8c/Nina_Williams_T8_render.png/revision/latest/scale-to-width-down/400?cb=20240105120000"), ageNote: "Adult" },
  { name: "Christie Monteiro", universe: "Tekken", gender: "female", imageUrl: FW("tekken", "2/2b/Christie_Monteiro_T6_render.png/revision/latest/scale-to-width-down/400?cb=20100101120000"), ageNote: "Adult (22)" },
  { name: "Asuka Kazama", universe: "Tekken", gender: "female", imageUrl: FW("tekken", "a/a0/Asuka_Kazama_T8_render.png/revision/latest/scale-to-width-down/400?cb=20240105120000"), ageNote: "Adult (18+)" },
  { name: "Lars Alexandersson", universe: "Tekken", gender: "male", imageUrl: FW("tekken", "e/e3/Lars_Alexandersson_T8_render.png/revision/latest/scale-to-width-down/400?cb=20240105120000"), ageNote: "Adult" },
  { name: "Jin Kazama", universe: "Tekken", gender: "male", imageUrl: FW("tekken", "6/6c/Jin_Kazama_T8_render.png/revision/latest/scale-to-width-down/400?cb=20240105120000"), ageNote: "Adult (21)" },

  // ═══════════════════════════════════════════════════════════════════════════
  // CARTOONS
  // ═══════════════════════════════════════════════════════════════════════════

  // ── AVATAR: THE LEGEND OF KORRA (5) ──────────────────────────────────────
  { name: "Korra", universe: "Avatar: Legend of Korra", gender: "female", imageUrl: FW("avatar", "e/e3/Korra_by_Zuko.png/revision/latest/scale-to-width-down/400?cb=20201010120000"), ageNote: "Adult (21)" },
  { name: "Asami Sato", universe: "Avatar: Legend of Korra", gender: "female", imageUrl: FW("avatar", "3/3b/Asami_smiling.png/revision/latest/scale-to-width-down/400?cb=20200101120000"), ageNote: "Adult (22)" },
  { name: "Lin Beifong", universe: "Avatar: Legend of Korra", gender: "female", imageUrl: FW("avatar", "4/4a/Lin_Beifong_in_her_office.png/revision/latest/scale-to-width-down/400?cb=20200101120000"), ageNote: "Adult (40s)" },
  { name: "Mako", universe: "Avatar: Legend of Korra", gender: "male", imageUrl: FW("avatar", "2/2f/Mako_adult.png/revision/latest/scale-to-width-down/400?cb=20200101120000"), ageNote: "Adult (22)" },
  { name: "Bolin", universe: "Avatar: Legend of Korra", gender: "male", imageUrl: FW("avatar", "7/73/Bolin_adult.png/revision/latest/scale-to-width-down/400?cb=20200101120000"), ageNote: "Adult (22)" },

  // ── ARCANE (4) ─────────────────────────────────────────────────────────────
  { name: "Vi (Arcane)", universe: "Arcane", gender: "female", imageUrl: FW("arcane", "8/88/Vi_Season_2.png/revision/latest/scale-to-width-down/400?cb=20241023120000"), ageNote: "Adult" },
  { name: "Caitlyn Kiramman", universe: "Arcane", gender: "female", imageUrl: FW("arcane", "4/4d/Caitlyn_Season_2.png/revision/latest/scale-to-width-down/400?cb=20241023120000"), ageNote: "Adult (20s)" },
  { name: "Jayce", universe: "Arcane", gender: "male", imageUrl: FW("arcane", "e/e0/Jayce_Season_1.png/revision/latest/scale-to-width-down/400?cb=20211113120000"), ageNote: "Adult" },
  { name: "Viktor", universe: "Arcane", gender: "male", imageUrl: FW("arcane", "1/16/Viktor_Season_1.png/revision/latest/scale-to-width-down/400?cb=20211113120000"), ageNote: "Adult" },

  // ── CASTLEVANIA (3) ────────────────────────────────────────────────────────
  { name: "Sypha Belnades", universe: "Castlevania", gender: "female", imageUrl: FW("castlevania", "e/e3/Sypha_Season_2.png/revision/latest/scale-to-width-down/400?cb=20181026120000"), ageNote: "Adult" },
  { name: "Alucard", universe: "Castlevania", gender: "male", imageUrl: FW("castlevania", "6/64/Alucard_Season_2.png/revision/latest/scale-to-width-down/400?cb=20181026120000"), ageNote: "Adult" },
  { name: "Trevor Belmont", universe: "Castlevania", gender: "male", imageUrl: FW("castlevania", "4/40/Trevor_Season_2.png/revision/latest/scale-to-width-down/400?cb=20181026120000"), ageNote: "Adult" },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMIC BOOKS (non-Marvel/DC)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── INVINCIBLE (4) ─────────────────────────────────────────────────────────
  { name: "Mark Grayson (Invincible)", universe: "Invincible", gender: "male", imageUrl: FW("invincible", "7/7e/Invincible_Season_2.png/revision/latest/scale-to-width-down/400?cb=20231113120000"), ageNote: "Adult (18+)" },
  { name: "Atom Eve", universe: "Invincible", gender: "female", imageUrl: FW("invincible", "2/23/Eve_Season_2.png/revision/latest/scale-to-width-down/400?cb=20231113120000"), ageNote: "Adult (18+)" },
  { name: "Debbie Grayson", universe: "Invincible", gender: "female", imageUrl: FW("invincible", "9/90/Debbie_Season_2.png/revision/latest/scale-to-width-down/400?cb=20231113120000"), ageNote: "Adult" },
  { name: "Omni-Man", universe: "Invincible", gender: "male", imageUrl: FW("invincible", "c/c4/Omni-Man_Season_1.png/revision/latest/scale-to-width-down/400?cb=20210430120000"), ageNote: "Adult" },

  // ── THE BOYS (4) ───────────────────────────────────────────────────────────
  { name: "Billy Butcher", universe: "The Boys", gender: "male", imageUrl: FW("the-boys-franchise", "7/78/Billy_Butcher_S4.png/revision/latest/scale-to-width-down/400?cb=20240614120000"), ageNote: "Adult" },
  { name: "Starlight (Annie January)", universe: "The Boys", gender: "female", imageUrl: FW("the-boys-franchise", "4/42/Starlight_S4.png/revision/latest/scale-to-width-down/400?cb=20240614120000"), ageNote: "Adult (25)" },
  { name: "Queen Maeve", universe: "The Boys", gender: "female", imageUrl: FW("the-boys-franchise", "8/8e/Queen_Maeve_S3.png/revision/latest/scale-to-width-down/400?cb=20220616120000"), ageNote: "Adult" },
  { name: "Homelander", universe: "The Boys", gender: "male", imageUrl: FW("the-boys-franchise", "0/0c/Homelander_S4.png/revision/latest/scale-to-width-down/400?cb=20240614120000"), ageNote: "Adult" },

  // ═══════════════════════════════════════════════════════════════════════════
  // MANGA (non-anime)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── BERSERK (4) ────────────────────────────────────────────────────────────
  { name: "Guts", universe: "Berserk", gender: "male", imageUrl: FW("berserk", "3/30/Guts_Manga_Infobox.png/revision/latest/scale-to-width-down/400?cb=20210101120000"), ageNote: "Adult (24)" },
  { name: "Griffith", universe: "Berserk", gender: "male", imageUrl: FW("berserk", "c/c1/Griffith_Manga_Infobox.png/revision/latest/scale-to-width-down/400?cb=20210101120000"), ageNote: "Adult" },
  { name: "Casca", universe: "Berserk", gender: "female", imageUrl: FW("berserk", "e/e6/Casca_Manga_Infobox.png/revision/latest/scale-to-width-down/400?cb=20210101120000"), ageNote: "Adult (22+)" },
  { name: "Farnese de Vandimion", universe: "Berserk", gender: "female", imageUrl: FW("berserk", "a/a5/Farnese_Manga_Infobox.png/revision/latest/scale-to-width-down/400?cb=20210101120000"), ageNote: "Adult (18+)" },

  // ── FULLMETAL ALCHEMIST (5) ────────────────────────────────────────────────
  { name: "Roy Mustang", universe: "Fullmetal Alchemist", gender: "male", imageUrl: FW("fma", "7/7e/Roy_Mustang_Manga.png/revision/latest/scale-to-width-down/400?cb=20101010120000"), ageNote: "Adult (29)" },
  { name: "Riza Hawkeye", universe: "Fullmetal Alchemist", gender: "female", imageUrl: FW("fma", "9/9c/Riza_Hawkeye_Manga.png/revision/latest/scale-to-width-down/400?cb=20101010120000"), ageNote: "Adult" },
  { name: "Olivier Mira Armstrong", universe: "Fullmetal Alchemist", gender: "female", imageUrl: FW("fma", "4/4e/Olivier_Armstrong_Manga.png/revision/latest/scale-to-width-down/400?cb=20101010120000"), ageNote: "Adult" },
  { name: "Izumi Curtis", universe: "Fullmetal Alchemist", gender: "female", imageUrl: FW("fma", "c/c1/Izumi_Curtis_Manga.png/revision/latest/scale-to-width-down/400?cb=20101010120000"), ageNote: "Adult" },
  { name: "Alex Louis Armstrong", universe: "Fullmetal Alchemist", gender: "male", imageUrl: FW("fma", "5/58/Alex_Armstrong_Manga.png/revision/latest/scale-to-width-down/400?cb=20101010120000"), ageNote: "Adult" },

  // ── TOKYO GHOUL (4) ────────────────────────────────────────────────────────
  { name: "Ken Kaneki", universe: "Tokyo Ghoul", gender: "male", imageUrl: FW("tokyoghoul", "5/58/Kaneki_manga_post-Cochlea.png/revision/latest/scale-to-width-down/400?cb=20180101120000"), ageNote: "Adult (18+)" },
  { name: "Touka Kirishima", universe: "Tokyo Ghoul", gender: "female", imageUrl: FW("tokyoghoul", "6/64/Touka_Kirishima_Root_A.png/revision/latest/scale-to-width-down/400?cb=20150101120000"), ageNote: "Adult (18+)" },
  { name: "Shu Tsukiyama", universe: "Tokyo Ghoul", gender: "male", imageUrl: FW("tokyoghoul", "e/e0/Tsukiyama_manga.png/revision/latest/scale-to-width-down/400?cb=20140101120000"), ageNote: "Adult (22)" },
  { name: "Rize Kamishiro", universe: "Tokyo Ghoul", gender: "female", imageUrl: FW("tokyoghoul", "8/80/Rize_Kamishiro_manga.png/revision/latest/scale-to-width-down/400?cb=20140101120000"), ageNote: "Adult (18+)" },

  // ── HUNTER x HUNTER (3) ────────────────────────────────────────────────────
  { name: "Hisoka Morow", universe: "Hunter x Hunter", gender: "male", imageUrl: FW("hunterxhunter", "4/40/Hisoka_HxH_2011.png/revision/latest/scale-to-width-down/400?cb=20130101120000"), ageNote: "Adult" },
  { name: "Leorio Paradinight", universe: "Hunter x Hunter", gender: "male", imageUrl: FW("hunterxhunter", "7/76/Leorio_HxH_2011.png/revision/latest/scale-to-width-down/400?cb=20130101120000"), ageNote: "Adult (19+)" },
  { name: "Biscuit Krueger", universe: "Hunter x Hunter", gender: "female", imageUrl: FW("hunterxhunter", "a/a2/Biscuit_HxH_2011.png/revision/latest/scale-to-width-down/400?cb=20130101120000"), ageNote: "Adult (ancient)" },
`;

// Insert before the closing ];
const insertionPoint = content.lastIndexOf("\n];\n\nasync function seed");
if (insertionPoint === -1) {
  console.error("Could not find insertion point in seed file");
  process.exit(1);
}

const updated = content.slice(0, insertionPoint) + "\n" + newChars + "\n" + content.slice(insertionPoint);
writeFileSync(file, updated, "utf8");

const newCount = (updated.match(/imageUrl:/g) || []).length;
const universes = new Set();
for (const m of updated.matchAll(/universe: "([^"]+)"/g)) {
  universes.add(m[1]);
}
console.log(`Done! Seed now has ${newCount} characters across ${universes.size} universes.`);
