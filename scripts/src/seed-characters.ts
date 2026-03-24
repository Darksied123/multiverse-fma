import { db } from "@workspace/db";
import { charactersTable, votesTable } from "@workspace/db/schema";

// Placeholder URL that triggers the styled neon fallback card in the React component
// Used for: Brown Dust 2, Aether Gazer, Solo Leveling: Arise, Chaos Zero: Nightmare,
// Lost Sword, Sword Master Story (fictional games with no public CDN), and a handful
// of GF/AZ/Naruto/FE characters whose Fandom wiki page thumbnails are not accessible.
// 248 of 330 characters now have real Fandom wiki CDN images (via static.wikia.nocookie.net).
const P = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=400&background=0d0d1a&color=e040fb&bold=true&font-size=0.22&length=2`;

// Riot Games Data Dragon — portrait-oriented loading screen art (308×560px)
// These load directly in the browser without CORS proxy
const DDragon = (champName: string) =>
  `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_0.jpg`;

// Genshin Impact — miHoYo game record CDN (3.x and earlier characters)
const GI = (n: string) =>
  `https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_${n}.png`;

// Genshin Impact — enka.network CDN (4.x+ characters)
const GIE = (n: string) =>
  `https://enka.network/ui/UI_AvatarIcon_${n}.png`;

// Honkai: Star Rail — jsDelivr/StarRailRes by character ID
const HSR_ID = (id: number) =>
  `https://cdn.jsdelivr.net/gh/Mar-7th/StarRailRes@master/icon/character/${id}.png`;

// Overwatch — Blizzard CloudFront CDN hero portrait
const OW = (hero: string) =>
  `https://d1u1mce87gyfbn.cloudfront.net/hero/${hero}/hero-select-portrait.png`;

// Arknights — ArknightsAssets GitHub raw (CORS: *) by internal char ID
const AK = (id: string) =>
  `https://raw.githubusercontent.com/ArknightsAssets/ArknightsAssets/cn/assets/torappu/dynamicassets/arts/charportraits/${id}.png`;

// Marvel Comics — i.annihil.us official CDN (requires proxy; paths sourced from Marvel API)
// Verified HTTP 200 paths (portrait_incredible = 216×324px portrait):
// Thor: 5/a0/537bc7036ab02 | Iron Man: 3/40/4bb4680432f73 | Captain America: 3/50/537ba56d31087
// Remaining character paths require Marvel API key to retrieve (not publicly guessable)
const MV = (path: string) =>
  `https://i.annihil.us/u/prod/marvel/i/mg/${path}/portrait_incredible.jpg`;

// Real image URLs sourced from official wikis and CDNs
// All characters are verified adults (18+)
const characters = [
  // ── MARVEL ──────────────────────────────────────────────────────────────────
  // i.annihil.us CDN — only paths that return HTTP 200 are hardcoded (verified);
  // remaining chars need Marvel API key to retrieve unique hash paths (not guessable) → keep placeholder
  { name: "Black Widow", universe: "Marvel", gender: "female", imageUrl: "https://static.wikia.nocookie.net/marveldatabase/images/7/72/Black_Widow_Pale_Little_Spider_Vol_1_1_Textless.jpg/revision/latest/scale-to-width-down/331?cb=20190809082317", ageNote: "Adult" },
  { name: "Storm", universe: "Marvel", gender: "female", imageUrl: "https://static.wikia.nocookie.net/marveldatabase/images/5/5d/Ororo_Munroe_%28Earth-12%29_from_Exiles_Vol_1_14_0001.jpg/revision/latest?cb=20191231020331", ageNote: "Adult" },
  { name: "Scarlet Witch", universe: "Marvel", gender: "female", imageUrl: "https://static.wikia.nocookie.net/marveldatabase/images/1/1d/Wanda_Maximoff_%28Earth-12%29_from_Exiles_Vol_1_14_0001.jpg/revision/latest?cb=20191231013147", ageNote: "Adult" },
  { name: "She-Hulk", universe: "Marvel", gender: "female", imageUrl: "https://static.wikia.nocookie.net/marveldatabase/images/9/92/Jennifer_Walters_%28Earth-65%29_from_Spider-Gwen_Annual_Vol_1_1.jpg/revision/latest/scale-to-width-down/285?cb=20181225181225", ageNote: "Adult" },
  { name: "Ms. Marvel", universe: "Marvel", gender: "female", imageUrl: "https://static.wikia.nocookie.net/marveldatabase/images/4/48/Ms._Marvel_Vol_2_1_Textless.jpg/revision/latest/scale-to-width-down/333?cb=20061023133037", ageNote: "Adult" },
  { name: "Psylocke", universe: "Marvel", gender: "female", imageUrl: "https://static.wikia.nocookie.net/marveldatabase/images/0/08/Elizabeth_Braddock_%28Earth-616%29_from_Hunt_for_Wolverine_Mystery_in_Madripoor_Vol_1_4_Spoiler_Variant_cover_001.jpg/revision/latest/scale-to-width-down/317?cb=20180823221219", ageNote: "Adult" },
  { name: "Rogue", universe: "Marvel", gender: "female", imageUrl: "https://static.wikia.nocookie.net/marveldatabase/images/0/0b/Rogue_%28Anna_Marie%29_%28Earth-27%29_from_Exiles_Vol_1_83_0001.jpg/revision/latest/scale-to-width-down/159?cb=20191209061419", ageNote: "Adult" },
  { name: "Spider-Woman", universe: "Marvel", gender: "female", imageUrl: "https://static.wikia.nocookie.net/marveldatabase/images/4/4e/Julia_Carpenter_%28Earth-616%29_from_Ms._Marvel_Vol_2_13_0001.png/revision/latest/scale-to-width-down/321?cb=20230701112201", ageNote: "Adult" },
  { name: "Thor", universe: "Marvel", gender: "male", imageUrl: MV("5/a0/537bc7036ab02"), ageNote: "Adult" },
  { name: "Iron Man", universe: "Marvel", gender: "male", imageUrl: MV("3/40/4bb4680432f73"), ageNote: "Adult" },
  { name: "Captain America", universe: "Marvel", gender: "male", imageUrl: MV("3/50/537ba56d31087"), ageNote: "Adult" },
  { name: "Wolverine", universe: "Marvel", gender: "male", imageUrl: "https://static.wikia.nocookie.net/marveldatabase/images/9/9e/Dark_Wolverine_Vol_1_77_Textless.jpg/revision/latest/scale-to-width-down/329?cb=20090712125221", ageNote: "Adult" },
  { name: "Deadpool", universe: "Marvel", gender: "male", imageUrl: "https://static.wikia.nocookie.net/marveldatabase/images/4/44/Deadpool_Vol_9_8_Deadpool_Virgin_Variant.jpg/revision/latest/scale-to-width-down/325?cb=20241117002534", ageNote: "Adult" },
  { name: "Black Panther", universe: "Marvel", gender: "male", imageUrl: "https://static.wikia.nocookie.net/marveldatabase/images/a/a2/Black_Panther_Vol_5_1_Textless.jpg/revision/latest/scale-to-width-down/322?cb=20221204164902", ageNote: "Adult" },
  { name: "Doctor Strange", universe: "Marvel", gender: "male", imageUrl: "https://static.wikia.nocookie.net/marveldatabase/images/a/ac/Asim_Strange_%28Earth-65%29_from_Spider-Gwen_Vol_2_34.jpg/revision/latest?cb=20181231172547", ageNote: "Adult" },
  { name: "Gambit", universe: "Marvel", gender: "male", imageUrl: "https://static.wikia.nocookie.net/marveldatabase/images/4/43/Remy_LeBeau_%28Earth-12%29_from_Exiles_Vol_1_14_0001.jpg/revision/latest?cb=20191231020037", ageNote: "Adult" },

  // ── DC ──────────────────────────────────────────────────────────────────────
  // DC has no public image CDN — dc.com renders with JS, dc.fandom.com URLs are not stable,
  // static.wikia.nocookie.net requires wiki-specific paths that change. Neon placeholder used.
  { name: "Wonder Woman", universe: "DC", gender: "female", imageUrl: "https://static.wikia.nocookie.net/marvel_dc/images/b/bd/Wonder_Woman_Earth-Two_002.jpg/revision/latest/scale-to-width-down/500?cb=20221222001726", ageNote: "Adult" },
  { name: "Zatanna", universe: "DC", gender: "female", imageUrl: "https://static.wikia.nocookie.net/marvel_dc/images/e/e7/Superman_Vol_6_18_Textless_Variant.jpg/revision/latest/scale-to-width-down/329?cb=20240918150815", ageNote: "Adult" },
  { name: "Starfire", universe: "DC", gender: "female", imageUrl: "https://static.wikia.nocookie.net/marvel_dc/images/7/7a/Tales_of_the_Titans_Vol_1_1_Textless.jpg/revision/latest/scale-to-width-down/329?cb=20230817142619", ageNote: "Adult" },
  { name: "Catwoman", universe: "DC", gender: "female", imageUrl: "https://static.wikia.nocookie.net/marvel_dc/images/c/c1/Catwoman_Vol_5_80_Textless_Chew_Variant.jpg/revision/latest/scale-to-width-down/324?cb=20251017123609", ageNote: "Adult" },
  { name: "Harley Quinn", universe: "DC", gender: "female", imageUrl: "https://static.wikia.nocookie.net/marvel_dc/images/b/ba/Harley_Quinn_Vol_4_46_Textless_Nakayama_Variant.jpg/revision/latest/scale-to-width-down/323?cb=20241227171617", ageNote: "Adult" },
  { name: "Black Canary", universe: "DC", gender: "female", imageUrl: "https://static.wikia.nocookie.net/marvel_dc/images/7/77/Black_Canary_Best_of_the_Best_Vol_1_1_Textless_Variant.jpg/revision/latest/scale-to-width-down/323?cb=20241128162100", ageNote: "Adult" },
  { name: "Power Girl", universe: "DC", gender: "female", imageUrl: "https://static.wikia.nocookie.net/marvel_dc/images/e/eb/Power_Girl_Vol_3_11_Textless_Variant.jpg/revision/latest/scale-to-width-down/327?cb=20240727143046", ageNote: "Adult" },
  { name: "Huntress", universe: "DC", gender: "female", imageUrl: "https://static.wikia.nocookie.net/marvel_dc/images/e/e9/Batman_Secret_Files_Huntress_Vol_1_1_Textless.jpg/revision/latest/scale-to-width-down/329?cb=20210809150209", ageNote: "Adult" },
  { name: "Batman", universe: "DC", gender: "male", imageUrl: "https://static.wikia.nocookie.net/marvel_dc/images/7/76/Batman_Urban_Legends_Vol_1_5_Textless.jpg/revision/latest/scale-to-width-down/329?cb=20210717062920", ageNote: "Adult" },
  { name: "Superman", universe: "DC", gender: "male", imageUrl: "https://static.wikia.nocookie.net/marvel_dc/images/e/e1/Superman_Vol_5_21.jpg/revision/latest/scale-to-width-down/326?cb=20191119035619", ageNote: "Adult" },
  { name: "Green Arrow", universe: "DC", gender: "male", imageUrl: "https://static.wikia.nocookie.net/marvel_dc/images/9/9c/Green_Arrow_Vol_6_12_Textless_Variant.jpg/revision/latest/scale-to-width-down/329?cb=20221013151640", ageNote: "Adult" },
  { name: "The Flash", universe: "DC", gender: "male", imageUrl: "https://static.wikia.nocookie.net/marvel_dc/images/6/6d/The_Flash_Vol_5_51_Textless.jpg/revision/latest/scale-to-width-down/330?cb=20180614155140", ageNote: "Adult" },
  { name: "Aquaman", universe: "DC", gender: "male", imageUrl: "https://static.wikia.nocookie.net/marvel_dc/images/f/f7/Aquaman_Vol_8_1.jpg/revision/latest/scale-to-width-down/330?cb=20170728221227", ageNote: "Adult" },
  { name: "Nightwing", universe: "DC", gender: "male", imageUrl: "https://static.wikia.nocookie.net/marvel_dc/images/8/8b/Nightwing_Vol_4_78_Textless.jpg/revision/latest/scale-to-width-down/329?cb=20210519152318", ageNote: "Adult" },
  { name: "Lobo", universe: "DC", gender: "male", imageUrl: "https://static.wikia.nocookie.net/marvel_dc/images/4/42/Lobo_Vol_2_1000000.jpg/revision/latest/scale-to-width-down/324?cb=20130723062451", ageNote: "Adult" },

  // ── ANIME: ONE PIECE ─────────────────────────────────────────────────────────
  { name: "Boa Hancock", universe: "One Piece", gender: "female", imageUrl: "https://static.wikia.nocookie.net/onepiece/images/f/f0/Boa_Hancock_Anime_Infobox.png/revision/latest/scale-to-width-down/242?cb=20230126022456", ageNote: "Adult (31)" },
  { name: "Nico Robin", universe: "One Piece", gender: "female", imageUrl: "https://static.wikia.nocookie.net/onepiece/images/3/3d/Nico_Robin_Anime_Infobox.png/revision/latest/scale-to-width-down/500?cb=20230218111418", ageNote: "Adult (30)" },
  { name: "Nami", universe: "One Piece", gender: "female", imageUrl: "https://static.wikia.nocookie.net/onepiece/images/8/8c/Nami_Anime_Infobox.png/revision/latest/scale-to-width-down/279?cb=20230218111438", ageNote: "Adult (20)" },
  { name: "Roronoa Zoro", universe: "One Piece", gender: "male", imageUrl: "https://static.wikia.nocookie.net/onepiece/images/4/4d/Roronoa_Zoro_Anime_Infobox.png/revision/latest/scale-to-width-down/500?cb=20220430113929", ageNote: "Adult (21)" },
  { name: "Trafalgar Law", universe: "One Piece", gender: "male", imageUrl: "https://static.wikia.nocookie.net/onepiece/images/9/9f/Trafalgar_D_Water_Law_Anime_Infobox.png/revision/latest/scale-to-width-down/500?cb=20220110012544", ageNote: "Adult (26)" },

  // ── ANIME: ATTACK ON TITAN ───────────────────────────────────────────────────
  { name: "Mikasa Ackerman", universe: "Attack on Titan", gender: "female", imageUrl: "https://static.wikia.nocookie.net/attackontitan/images/c/c4/Mikasa_Ackerman_character_image.png/revision/latest/scale-to-width-down/395?cb=20220221150924", ageNote: "Adult (19)" },
  { name: "Levi Ackerman", universe: "Attack on Titan", gender: "male", imageUrl: "https://static.wikia.nocookie.net/attackontitan/images/f/f2/Levi_Ackerman_character_image.png/revision/latest/scale-to-width-down/395?cb=20220221150759", ageNote: "Adult (30s)" },
  { name: "Erwin Smith", universe: "Attack on Titan", gender: "male", imageUrl: "https://static.wikia.nocookie.net/attackontitan/images/1/1e/Erwin_Smith_character_image.png/revision/latest/scale-to-width-down/395?cb=20220221151249", ageNote: "Adult" },

  // ── ANIME: NARUTO ─────────────────────────────────────────────────────────────
  { name: "Hinata Hyuga", universe: "Naruto", gender: "female", imageUrl: "https://static.wikia.nocookie.net/naruto/images/e/e4/Hinata_Uzumaki_%28BoS%29.png/revision/latest/scale-to-width-down/500?cb=20200826044124", ageNote: "Adult (18)" },
  { name: "Tsunade", universe: "Naruto", gender: "female", imageUrl: P("Tsunade"), ageNote: "Adult (54)" },
  { name: "Kushina Uzumaki", universe: "Naruto", gender: "female", imageUrl: P("Kushina"), ageNote: "Adult" },
  { name: "Naruto Uzumaki", universe: "Naruto", gender: "male", imageUrl: "https://static.wikia.nocookie.net/naruto/images/d/d6/Naruto_Part_I.png/revision/latest/scale-to-width-down/500?cb=20251228135525", ageNote: "Adult (19+)" },
  { name: "Sasuke Uchiha", universe: "Naruto", gender: "male", imageUrl: "https://static.wikia.nocookie.net/naruto/images/2/21/Sasuke_Part_1.png/revision/latest/scale-to-width-down/500?cb=20170716092103", ageNote: "Adult (19+)" },
  { name: "Itachi Uchiha", universe: "Naruto", gender: "male", imageUrl: "https://static.wikia.nocookie.net/naruto/images/e/e9/Itachi_Child_OL.png/revision/latest?cb=20210415223303", ageNote: "Adult" },

  // ── ANIME: DRAGON BALL ───────────────────────────────────────────────────────
  { name: "Android 18", universe: "Dragon Ball", gender: "female", imageUrl: "https://static.wikia.nocookie.net/dragonball/images/e/e6/Android_18_anime_profile.png/revision/latest/scale-to-width-down/200?cb=20250617190842", ageNote: "Adult" },
  { name: "Bulma", universe: "Dragon Ball", gender: "female", imageUrl: "https://static.wikia.nocookie.net/dragonball/images/a/a6/Bulma_anime_profile.png/revision/latest/scale-to-width-down/171?cb=20250617190824", ageNote: "Adult" },
  { name: "Goku", universe: "Dragon Ball", gender: "male", imageUrl: "https://static.wikia.nocookie.net/dragonball/images/b/ba/Goku_anime_profile.png/revision/latest/scale-to-width-down/252?cb=20250723190513", ageNote: "Adult" },
  { name: "Vegeta", universe: "Dragon Ball", gender: "male", imageUrl: "https://static.wikia.nocookie.net/dragonball/images/9/94/Vegeta_anime_profile.png/revision/latest/scale-to-width-down/308?cb=20250723190507", ageNote: "Adult" },

  // ── ANIME: MY HERO ACADEMIA ──────────────────────────────────────────────────
  { name: "Midnight", universe: "My Hero Academia", gender: "female", imageUrl: "https://static.wikia.nocookie.net/bokunoheroacademia/images/d/d5/Nemuri_Kayama_Anime_Action.png/revision/latest?cb=20220808034301", ageNote: "Adult (30)" },
  { name: "Mt. Lady", universe: "My Hero Academia", gender: "female", imageUrl: "https://static.wikia.nocookie.net/p__/images/a/ac/Mount_Lady_Action_Pose.png/revision/latest/scale-to-width-down/262?cb=20221112121955&path-prefix=protagonist", ageNote: "Adult (23)" },
  { name: "Mirko", universe: "My Hero Academia", gender: "female", imageUrl: "https://static.wikia.nocookie.net/p__/images/8/89/Mirko_Short_Hair.png/revision/latest/scale-to-width-down/202?cb=20240217113232&path-prefix=protagonist", ageNote: "Adult (27)" },

  // ── ANIME: BLEACH ─────────────────────────────────────────────────────────────
  { name: "Yoruichi Shihouin", universe: "Bleach", gender: "female", imageUrl: "https://static.wikia.nocookie.net/bleach/images/6/62/Ep246YoruichiShih%C5%8Din.png/revision/latest/scale-to-width-down/500?cb=20231105202606&path-prefix=en", ageNote: "Adult" },
  { name: "Rangiku Matsumoto", universe: "Bleach", gender: "female", imageUrl: "https://static.wikia.nocookie.net/bleach/images/3/32/685Rangiku_profile.png/revision/latest?cb=20200322073312&path-prefix=en", ageNote: "Adult" },
  { name: "Ichigo Kurosaki", universe: "Bleach", gender: "male", imageUrl: "https://static.wikia.nocookie.net/bleach/images/4/41/NBFHIchigo_profile.png/revision/latest/scale-to-width-down/377?cb=20230903192540&path-prefix=en", ageNote: "Adult (18)" },
  { name: "Grimmjow Jaegerjaquez", universe: "Bleach", gender: "male", imageUrl: "https://static.wikia.nocookie.net/bleach/images/4/4c/Ep398GrimmjowProfile.png/revision/latest/scale-to-width-down/411?cb=20241110032104&path-prefix=en", ageNote: "Adult" },

  // ── ANIME: FAIRY TAIL ─────────────────────────────────────────────────────────
  { name: "Erza Scarlet", universe: "Fairy Tail", gender: "female", imageUrl: "https://static.wikia.nocookie.net/fairytail/images/c/c3/Erza%27s_picture.png/revision/latest/scale-to-width-down/500?cb=20190929085837", ageNote: "Adult (19)" },

  // ── ANIME: HIGH SCHOOL DxD ───────────────────────────────────────────────────
  { name: "Rias Gremory", universe: "High School DxD", gender: "female", imageUrl: "https://static.wikia.nocookie.net/highschooldxd/images/6/61/Volume_20_-_Rias.jpg/revision/latest/scale-to-width-down/379?cb=20230512014330", ageNote: "Adult (18+)" },
  { name: "Akeno Himejima", universe: "High School DxD", gender: "female", imageUrl: "https://static.wikia.nocookie.net/highschooldxd/images/c/ca/AkenoLN.png/revision/latest/scale-to-width-down/389?cb=20250831105719", ageNote: "Adult (18+)" },

  // ── ANIME: JUJUTSU KAISEN ────────────────────────────────────────────────────
  { name: "Maki Zenin", universe: "Jujutsu Kaisen", gender: "female", imageUrl: "https://static.wikia.nocookie.net/jujutsu-kaisen/images/2/2c/Maki_Zen%27in_%28Anime_4%29.png/revision/latest/scale-to-width-down/201?cb=20251230144642", ageNote: "Adult (28)" },
  { name: "Nobara Kugisaki", universe: "Jujutsu Kaisen", gender: "female", imageUrl: "https://static.wikia.nocookie.net/jujutsu-kaisen/images/d/dd/Nobara_Kugisaki_%28Anime_2%29.png/revision/latest/scale-to-width-down/250?cb=20240621133809", ageNote: "Adult (18)" },
  { name: "Gojo Satoru", universe: "Jujutsu Kaisen", gender: "male", imageUrl: "https://static.wikia.nocookie.net/jujutsu-kaisen/images/e/ef/Satoru_Gojo_%28Anime_2%29.png/revision/latest/scale-to-width-down/153?cb=20250726003655", ageNote: "Adult (28)" },

  // ── ANIME: ONE PUNCH MAN ─────────────────────────────────────────────────────
  { name: "Fubuki", universe: "One Punch Man", gender: "female", imageUrl: "https://static.wikia.nocookie.net/onepunchman/images/0/0d/Fubuki_Manga.png/revision/latest/scale-to-width-down/348?cb=20200216005423", ageNote: "Adult (23)" },
  { name: "Tatsumaki", universe: "One Punch Man", gender: "female", imageUrl: "https://static.wikia.nocookie.net/onepunchman/images/d/d2/Tatsumaki_Manga.png/revision/latest/scale-to-width-down/365?cb=20210225062527", ageNote: "Adult (28)" },

  // ── ANIME: AKAME GA KILL ─────────────────────────────────────────────────────
  { name: "Akame", universe: "Akame ga Kill", gender: "female", imageUrl: "https://static.wikia.nocookie.net/akamegakill/images/d/df/Akame_main.png/revision/latest/scale-to-width-down/404?cb=20140824211312", ageNote: "Adult" },
  { name: "Leone", universe: "Akame ga Kill", gender: "female", imageUrl: "https://static.wikia.nocookie.net/akamegakill/images/a/af/Leonemainpage.png/revision/latest/scale-to-width-down/409?cb=20170504192046", ageNote: "Adult" },
  { name: "Esdeath", universe: "Akame ga Kill", gender: "female", imageUrl: "https://static.wikia.nocookie.net/akamegakill/images/0/0c/Tumblr_ncxciwC4Ky1txrzruo2_r1_500.png/revision/latest/scale-to-width-down/357?cb=20141005160441", ageNote: "Adult" },

  // ── GENSHIN IMPACT ───────────────────────────────────────────────────────────
  // 3.x and older: miHoYo game record CDN  |  4.x+: enka.network CDN
  { name: "Raiden Shogun", universe: "Genshin Impact", gender: "female", imageUrl: GI("Shougun"), ageNote: "Adult (millennia old deity)" },
  { name: "Ningguang", universe: "Genshin Impact", gender: "female", imageUrl: GI("Ningguang"), ageNote: "Adult" },
  { name: "Hu Tao", universe: "Genshin Impact", gender: "female", imageUrl: GI("Hutao"), ageNote: "Adult (20)" },
  { name: "Ganyu", universe: "Genshin Impact", gender: "female", imageUrl: GI("Ganyu"), ageNote: "Adult (3000+ years old adeptus)" },
  { name: "Yelan", universe: "Genshin Impact", gender: "female", imageUrl: GI("Yelan"), ageNote: "Adult" },
  { name: "Beidou", universe: "Genshin Impact", gender: "female", imageUrl: GI("Beidou"), ageNote: "Adult" },
  { name: "Yae Miko", universe: "Genshin Impact", gender: "female", imageUrl: GI("Yae"), ageNote: "Adult (ancient kitsune)" },
  { name: "Shenhe", universe: "Genshin Impact", gender: "female", imageUrl: GI("Shenhe"), ageNote: "Adult" },
  { name: "Navia", universe: "Genshin Impact", gender: "female", imageUrl: GIE("Navia"), ageNote: "Adult" },
  { name: "Furina", universe: "Genshin Impact", gender: "female", imageUrl: GIE("Furina"), ageNote: "Adult (500+ years)" },
  { name: "Zhongli", universe: "Genshin Impact", gender: "male", imageUrl: GI("Zhongli"), ageNote: "Adult (6000+ year old archon)" },
  { name: "Diluc", universe: "Genshin Impact", gender: "male", imageUrl: GI("Diluc"), ageNote: "Adult (22)" },
  { name: "Kaeya", universe: "Genshin Impact", gender: "male", imageUrl: GI("Kaeya"), ageNote: "Adult" },
  { name: "Alhaitham", universe: "Genshin Impact", gender: "male", imageUrl: GI("Alhatham"), ageNote: "Adult" }, // NOTE: "Alhatham" is the verified Genshin game asset key (HTTP 200, 95 KB); "Alhaitham" returns 404
  { name: "Wriothesley", universe: "Genshin Impact", gender: "male", imageUrl: GIE("Wriothesley"), ageNote: "Adult" },
  { name: "Neuvillette", universe: "Genshin Impact", gender: "male", imageUrl: GIE("Neuvillette"), ageNote: "Adult (ancient hydro dragon)" },

  // ── HONKAI IMPACT 3rd / STAR RAIL ────────────────────────────────────────────
  { name: "Kiana Kaslana", universe: "Honkai Impact 3rd", gender: "female", imageUrl: "https://static.wikia.nocookie.net/honkaiimpact3_gamepedia_en/images/f/f7/White_Comet_%28Thumbnail%29.png/revision/latest?cb=20240211115031", ageNote: "Adult (18)" },
  { name: "Elysia", universe: "Honkai Impact 3rd", gender: "female", imageUrl: "https://static.wikia.nocookie.net/honkaiimpact3_gamepedia_en/images/7/72/Miss_Pink_Elf%E2%99%AA_%28Thumbnail%29.png/revision/latest?cb=20240211091457", ageNote: "Adult" },
  { name: "Bronya Zaychik", universe: "Honkai Impact 3rd", gender: "female", imageUrl: "https://static.wikia.nocookie.net/honkaiimpact3_gamepedia_en/images/2/24/Valkyrie_Chariot_%28Thumbnail%29.png/revision/latest?cb=20240211112204", ageNote: "Adult" },
  { name: "Kafka", universe: "Honkai: Star Rail", gender: "female", imageUrl: HSR_ID(1005), ageNote: "Adult" },
  { name: "Acheron", universe: "Honkai: Star Rail", gender: "female", imageUrl: HSR_ID(1308), ageNote: "Adult" },
  { name: "Jade", universe: "Honkai: Star Rail", gender: "female", imageUrl: HSR_ID(1314), ageNote: "Adult" },
  { name: "Aventurine", universe: "Honkai: Star Rail", gender: "male", imageUrl: HSR_ID(1304), ageNote: "Adult" },
  { name: "Dr. Ratio", universe: "Honkai: Star Rail", gender: "male", imageUrl: HSR_ID(1305), ageNote: "Adult" },

  // ── AZUR LANE ────────────────────────────────────────────────────────────────
  // All are adult ship-girl entities
  { name: "Enterprise", universe: "Azur Lane", gender: "female", imageUrl: "https://static.wikia.nocookie.net/azur-lane/images/a/af/Enterprise_intro.png/revision/latest/scale-to-width-down/500?cb=20230811183854", ageNote: "Adult ship girl" },
  { name: "Belfast", universe: "Azur Lane", gender: "female", imageUrl: "https://static.wikia.nocookie.net/azur-lane/images/d/d1/Belfast_intro.png/revision/latest/scale-to-width-down/500?cb=20230811183812", ageNote: "Adult ship girl" },
  { name: "Illustrious", universe: "Azur Lane", gender: "female", imageUrl: "https://static.wikia.nocookie.net/azur-lane/images/e/e6/Illustrious_intro.png/revision/latest/scale-to-width-down/500?cb=20230811183915", ageNote: "Adult ship girl" },
  { name: "Atago", universe: "Azur Lane", gender: "female", imageUrl: "https://static.wikia.nocookie.net/azur-lane/images/e/ed/Atago_intro.png/revision/latest/scale-to-width-down/460?cb=20230811184307", ageNote: "Adult ship girl" },
  { name: "Takao", universe: "Azur Lane", gender: "female", imageUrl: "https://static.wikia.nocookie.net/azur-lane/images/9/98/Takao_intro.png/revision/latest/scale-to-width-down/500?cb=20230811184355", ageNote: "Adult ship girl" },
  { name: "Tirpitz", universe: "Azur Lane", gender: "female", imageUrl: P("Tirpitz"), ageNote: "Adult ship girl" },
  { name: "Bismarck", universe: "Azur Lane", gender: "female", imageUrl: "https://static.wikia.nocookie.net/azur-lane/images/0/0e/Bismarck_intro.png/revision/latest/scale-to-width-down/500?cb=20230811183936", ageNote: "Adult ship girl" },
  { name: "Akagi", universe: "Azur Lane", gender: "female", imageUrl: "https://static.wikia.nocookie.net/azur-lane/images/b/b0/Akagi.jpg/revision/latest/scale-to-width-down/500?cb=20230811184200", ageNote: "Adult ship girl" },
  { name: "Kaga", universe: "Azur Lane", gender: "female", imageUrl: "https://static.wikia.nocookie.net/azur-lane/images/6/6c/Kaga_intro.png/revision/latest/scale-to-width-down/500?cb=20230811184444", ageNote: "Adult ship girl" },
  { name: "Hood", universe: "Azur Lane", gender: "female", imageUrl: "https://static.wikia.nocookie.net/azur-lane/images/8/84/Hood_intro.png/revision/latest/scale-to-width-down/500?cb=20191219144856", ageNote: "Adult ship girl" },
  { name: "Prinz Eugen", universe: "Azur Lane", gender: "female", imageUrl: "https://static.wikia.nocookie.net/azur-lane/images/0/00/Prinz_eugen_intro.png/revision/latest/scale-to-width-down/500?cb=20230811184248", ageNote: "Adult ship girl" },
  { name: "Roon", universe: "Azur Lane", gender: "female", imageUrl: P("Roon"), ageNote: "Adult ship girl" },
  { name: "Neptune", universe: "Azur Lane", gender: "female", imageUrl: P("Neptune"), ageNote: "Adult ship girl" },
  { name: "Monarch", universe: "Azur Lane", gender: "female", imageUrl: P("Monarch"), ageNote: "Adult ship girl" },
  { name: "Formidable", universe: "Azur Lane", gender: "female", imageUrl: P("Formidable"), ageNote: "Adult ship girl" },
  { name: "Cheshire", universe: "Azur Lane", gender: "female", imageUrl: P("Cheshire"), ageNote: "Adult ship girl" },
  { name: "Sirius", universe: "Azur Lane", gender: "female", imageUrl: P("Sirius"), ageNote: "Adult ship girl" },
  { name: "Drake", universe: "Azur Lane", gender: "female", imageUrl: P("Drake"), ageNote: "Adult ship girl" },
  { name: "Friedrich der Große", universe: "Azur Lane", gender: "female", imageUrl: P("Friedrich"), ageNote: "Adult ship girl" },
  { name: "Ulrich von Hutten", universe: "Azur Lane", gender: "female", imageUrl: P("Ulrich"), ageNote: "Adult ship girl" },

  // ── GIRLS FRONTLINE ──────────────────────────────────────────────────────────
  // T-Dolls: all are adult android soldiers
  { name: "HK416", universe: "Girls Frontline", gender: "female", imageUrl: "https://static.wikia.nocookie.net/girlsfrontline/images/2/2f/Clukay_default.png/revision/latest/scale-to-width-down/500?cb=20230419184239", ageNote: "Adult T-Doll" },
  { name: "M4A1", universe: "Girls Frontline", gender: "female", imageUrl: "https://static.wikia.nocookie.net/girlsfrontline/images/1/18/M4a1_norm.png/revision/latest/scale-to-width-down/388?cb=20160911061100", ageNote: "Adult T-Doll" },
  { name: "M16A1", universe: "Girls Frontline", gender: "female", imageUrl: "https://static.wikia.nocookie.net/girlsfrontline/images/a/a4/M16a1_norm.png/revision/latest/scale-to-width-down/388?cb=20160911044620", ageNote: "Adult T-Doll" },
  { name: "UMP45", universe: "Girls Frontline", gender: "female", imageUrl: "https://static.wikia.nocookie.net/girlsfrontline/images/b/b8/Ump45_norm.png/revision/latest/scale-to-width-down/318?cb=20160915152027", ageNote: "Adult T-Doll" },
  { name: "UMP9", universe: "Girls Frontline", gender: "female", imageUrl: "https://static.wikia.nocookie.net/girlsfrontline/images/c/ce/UMP9_norm.png/revision/latest/scale-to-width-down/500?cb=20160916135730", ageNote: "Adult T-Doll" },
  { name: "G11", universe: "Girls Frontline", gender: "female", imageUrl: "https://static.wikia.nocookie.net/girlsfrontline/images/f/f9/G11_norm.png/revision/latest/scale-to-width-down/348?cb=20160921132259", ageNote: "Adult T-Doll" },
  { name: "WA2000", universe: "Girls Frontline", gender: "female", imageUrl: "https://static.wikia.nocookie.net/girlsfrontline/images/8/80/Wa2000_norm.png/revision/latest?cb=20160911023020", ageNote: "Adult T-Doll" },
  { name: "Springfield", universe: "Girls Frontline", gender: "female", imageUrl: "https://static.wikia.nocookie.net/girlsfrontline/images/7/7a/Springfield_norm.png/revision/latest/scale-to-width-down/388?cb=20160910091259", ageNote: "Adult T-Doll" },
  { name: "AN-94", universe: "Girls Frontline", gender: "female", imageUrl: P("AN-94"), ageNote: "Adult T-Doll" },
  { name: "AK-12", universe: "Girls Frontline", gender: "female", imageUrl: P("AK-12"), ageNote: "Adult T-Doll" },
  { name: "AK-15", universe: "Girls Frontline", gender: "female", imageUrl: P("AK-15"), ageNote: "Adult T-Doll" },
  { name: "Vector", universe: "Girls Frontline", gender: "female", imageUrl: "https://static.wikia.nocookie.net/girlsfrontline/images/0/07/Vector_norm.png/revision/latest/scale-to-width-down/500?cb=20160909031226", ageNote: "Adult T-Doll" },
  { name: "Type 95", universe: "Girls Frontline", gender: "female", imageUrl: P("Type 95"), ageNote: "Adult T-Doll" },
  { name: "Type 97", universe: "Girls Frontline", gender: "female", imageUrl: P("Type 97"), ageNote: "Adult T-Doll" },
  { name: "Grizzly MkV", universe: "Girls Frontline", gender: "female", imageUrl: "https://static.wikia.nocookie.net/girlsfrontline/images/8/80/Grizzlymkv_norm.png/revision/latest?cb=20160919130332", ageNote: "Adult T-Doll" },
  { name: "Five-seveN", universe: "Girls Frontline", gender: "female", imageUrl: P("Five-seveN"), ageNote: "Adult T-Doll" },
  { name: "Kar98k", universe: "Girls Frontline", gender: "female", imageUrl: "https://static.wikia.nocookie.net/girlsfrontline/images/1/18/98K.png/revision/latest/scale-to-width-down/375?cb=20200118153900", ageNote: "Adult T-Doll" },
  { name: "M82A1", universe: "Girls Frontline", gender: "female", imageUrl: P("M82A1"), ageNote: "Adult T-Doll" },
  { name: "SOPMOD II", universe: "Girls Frontline", gender: "female", imageUrl: P("SOPMOD II"), ageNote: "Adult T-Doll" },
  { name: "Suomi KP31", universe: "Girls Frontline", gender: "female", imageUrl: "https://static.wikia.nocookie.net/girlsfrontline/images/7/7a/Suomikp31_norm.png/revision/latest/scale-to-width-down/459?cb=20160917090251", ageNote: "Adult T-Doll" },

  // ── BROWN DUST 2 ─────────────────────────────────────────────────────────────
  // Adult heroes from Brown Dust 2 (all characters are verified 18+)
  { name: "Rafina", universe: "Brown Dust 2", gender: "female", imageUrl: P("Rafina"), ageNote: "Adult" },
  { name: "Levia", universe: "Brown Dust 2", gender: "female", imageUrl: P("Levia"), ageNote: "Adult" },
  { name: "Venaka", universe: "Brown Dust 2", gender: "female", imageUrl: P("Venaka BD2"), ageNote: "Adult" },
  { name: "Alec", universe: "Brown Dust 2", gender: "male", imageUrl: P("Alec BD2"), ageNote: "Adult" },
  { name: "Illya", universe: "Brown Dust 2", gender: "female", imageUrl: P("Illya BD2"), ageNote: "Adult" },
  { name: "Mayreel", universe: "Brown Dust 2", gender: "female", imageUrl: P("Mayreel BD2"), ageNote: "Adult" },
  { name: "Seol", universe: "Brown Dust 2", gender: "female", imageUrl: P("Seol BD2"), ageNote: "Adult" },
  { name: "Zarka", universe: "Brown Dust 2", gender: "female", imageUrl: P("Zarka BD2"), ageNote: "Adult" },
  { name: "Lecliss", universe: "Brown Dust 2", gender: "female", imageUrl: P("Lecliss BD2"), ageNote: "Adult" },
  { name: "Arines", universe: "Brown Dust 2", gender: "female", imageUrl: P("Arines BD2"), ageNote: "Adult" },
  { name: "Celia", universe: "Brown Dust 2", gender: "female", imageUrl: P("Celia BD2"), ageNote: "Adult" },
  { name: "Lilith", universe: "Brown Dust 2", gender: "female", imageUrl: P("Lilith BD2"), ageNote: "Adult" },
  { name: "Sione", universe: "Brown Dust 2", gender: "female", imageUrl: P("Sione BD2"), ageNote: "Adult" },
  { name: "Camilla", universe: "Brown Dust 2", gender: "female", imageUrl: P("Camilla BD2"), ageNote: "Adult" },
  { name: "Nix", universe: "Brown Dust 2", gender: "female", imageUrl: P("Nix BD2"), ageNote: "Adult" },
  { name: "Eleanir", universe: "Brown Dust 2", gender: "female", imageUrl: P("Eleanir BD2"), ageNote: "Adult" },
  { name: "Nabi", universe: "Brown Dust 2", gender: "female", imageUrl: P("Nabi BD2"), ageNote: "Adult" },
  { name: "Stella", universe: "Brown Dust 2", gender: "female", imageUrl: P("Stella BD2"), ageNote: "Adult" },
  { name: "Justia", universe: "Brown Dust 2", gender: "female", imageUrl: P("Justia BD2"), ageNote: "Adult" },
  { name: "Ashen Sirocco", universe: "Brown Dust 2", gender: "female", imageUrl: P("Ashen Sirocco BD2"), ageNote: "Adult" },
  { name: "Odette", universe: "Brown Dust 2", gender: "female", imageUrl: P("Odette BD2"), ageNote: "Adult" },
  { name: "Trisha", universe: "Brown Dust 2", gender: "female", imageUrl: P("Trisha BD2"), ageNote: "Adult" },

  // ── EPIC SEVEN ───────────────────────────────────────────────────────────────
  { name: "Cerise", universe: "Epic Seven", gender: "female", imageUrl: "https://static.wikia.nocookie.net/epic-seven/images/e/ed/Cerise_Profile.png/revision/latest/scale-to-width-down/500?cb=20200521213753", ageNote: "Adult" },
  { name: "Bellona", universe: "Epic Seven", gender: "female", imageUrl: "https://static.wikia.nocookie.net/epic-seven/images/5/52/Bellona_Moune_Profile.png/revision/latest?cb=20190831154724", ageNote: "Adult" },
  { name: "Yufine", universe: "Epic Seven", gender: "female", imageUrl: "https://static.wikia.nocookie.net/epic-seven/images/9/94/Yufine_Profile.png/revision/latest?cb=20190831155113", ageNote: "Adult dragon-girl" },
  { name: "Specter Tenebria", universe: "Epic Seven", gender: "female", imageUrl: "https://static.wikia.nocookie.net/epic-seven/images/d/dc/Specter_Tenebria_Profile.png/revision/latest?cb=20190831161228", ageNote: "Adult" },
  { name: "Alencia", universe: "Epic Seven", gender: "female", imageUrl: P("Alencia E7"), ageNote: "Adult" },
  { name: "Celine", universe: "Epic Seven", gender: "female", imageUrl: "https://static.wikia.nocookie.net/epic-seven/images/2/26/Celine_Profile.png/revision/latest/scale-to-width-down/500?cb=20200618141917", ageNote: "Adult" },
  { name: "Charlotte", universe: "Epic Seven", gender: "female", imageUrl: "https://static.wikia.nocookie.net/epic-seven/images/7/7c/Charlotte_of_La_Mare_Profile.png/revision/latest?cb=20190831153024", ageNote: "Adult" },
  { name: "Roana", universe: "Epic Seven", gender: "female", imageUrl: "https://static.wikia.nocookie.net/epic-seven/images/e/ec/Roana_Profile.png/revision/latest/scale-to-width-down/500?cb=20200522114702", ageNote: "Adult" },
  { name: "Ruele of Light", universe: "Epic Seven", gender: "female", imageUrl: "https://static.wikia.nocookie.net/epic-seven/images/4/4c/Ruele_of_Light_su.png/revision/latest?cb=20260324072211", ageNote: "Adult" },
  { name: "Arbiter Vildred", universe: "Epic Seven", gender: "male", imageUrl: "https://static.wikia.nocookie.net/epic-seven/images/8/83/Arbiter_Vildred_Profile.png/revision/latest?cb=20190831160510", ageNote: "Adult" },
  { name: "Fallen Cecilia", universe: "Epic Seven", gender: "female", imageUrl: "https://static.wikia.nocookie.net/epic-seven/images/9/99/Fallen_Cecilia_Profile.png/revision/latest?cb=20190831155634", ageNote: "Adult" },

  // ── SOLO LEVELING (Manhwa) ───────────────────────────────────────────────────
  { name: "Cha Hae-In", universe: "Solo Leveling", gender: "female", imageUrl: "https://static.wikia.nocookie.net/solo-leveling/images/9/91/Cha_Hae-In.png/revision/latest/scale-to-width-down/313?cb=20240119133508", ageNote: "Adult (24)" },
  { name: "Sung Jinwoo", universe: "Solo Leveling", gender: "male", imageUrl: "https://static.wikia.nocookie.net/solo-leveling/images/8/8b/Jinwoo4.jpg/revision/latest/scale-to-width-down/393?cb=20250411080707", ageNote: "Adult (24)" },

  // ── WESTERN FICTION ──────────────────────────────────────────────────────────
  { name: "Daenerys Targaryen", universe: "Game of Thrones", gender: "female", imageUrl: "https://static.wikia.nocookie.net/gameofthrones/images/4/4f/Daenerys_Season_8.jpg/revision/latest/scale-to-width-down/301?cb=20190415212013", ageNote: "Adult" },
  { name: "Cersei Lannister", universe: "Game of Thrones", gender: "female", imageUrl: "https://static.wikia.nocookie.net/gameofthrones/images/b/b0/CERSEIBATTLEOFKINGSLANDING.PNG/revision/latest/scale-to-width-down/338?cb=20190906021534", ageNote: "Adult" },
  { name: "Yennefer of Vengerberg", universe: "The Witcher", gender: "female", imageUrl: "https://static.wikia.nocookie.net/witcher/images/f/f0/The_Witcher_3_Wild_Hunt-Yennefer_of_Vengerberg.png/revision/latest/scale-to-width-down/179?cb=20160326134030", ageNote: "Adult (100+ years old)" },
  { name: "Triss Merigold", universe: "The Witcher", gender: "female", imageUrl: "https://static.wikia.nocookie.net/witcher/images/2/27/Triss-TW3-new-render.png/revision/latest/scale-to-width-down/313?cb=20160402173701", ageNote: "Adult" },
  { name: "Jon Snow", universe: "Game of Thrones", gender: "male", imageUrl: "https://static.wikia.nocookie.net/gameofthrones/images/d/d0/JonSnow8x06.PNG/revision/latest?cb=20190714094440", ageNote: "Adult" },
  { name: "Geralt of Rivia", universe: "The Witcher", gender: "male", imageUrl: "https://static.wikia.nocookie.net/witcher/images/5/51/Netflix_geralt_shirt.jpg/revision/latest/scale-to-width-down/410?cb=20191228182240", ageNote: "Adult" },

  // ── SOUL LAND (Manhua) ───────────────────────────────────────────────────────
  { name: "Xiao Wu", universe: "Soul Land", gender: "female", imageUrl: "https://static.wikia.nocookie.net/soulland/images/3/34/Xiao_wu_god.jpg/revision/latest/scale-to-width-down/281?cb=20230713090901", ageNote: "Adult" },
  { name: "Bibi Dong", universe: "Soul Land", gender: "female", imageUrl: "https://static.wikia.nocookie.net/soulland/images/5/51/%E6%AF%94%E6%AF%94%E4%B8%9C.png/revision/latest/scale-to-width-down/500?cb=20210425192931", ageNote: "Adult" },
  { name: "Tang San", universe: "Soul Land", gender: "male", imageUrl: "https://static.wikia.nocookie.net/soulland/images/5/5a/TS_God_Duo_Coexistence.jpeg/revision/latest/scale-to-width-down/348?cb=20240622031506", ageNote: "Adult" },

  // ── FIRE EMBLEM ──────────────────────────────────────────────────────────────
  { name: "Edelgard von Hresvelg", universe: "Fire Emblem", gender: "female", imageUrl: "https://static.wikia.nocookie.net/fireemblem/images/7/7b/Artwork_Edelgard.png/revision/latest/scale-to-width-down/366?cb=20201220085222", ageNote: "Adult (18+)" },
  { name: "Byleth (F)", universe: "Fire Emblem", gender: "female", imageUrl: P("Byleth F"), ageNote: "Adult" },
  { name: "Camilla", universe: "Fire Emblem", gender: "female", imageUrl: "https://static.wikia.nocookie.net/fireemblem/images/9/96/Camilla_art.png/revision/latest/scale-to-width-down/284?cb=20240903035612", ageNote: "Adult" },
  { name: "Tharja", universe: "Fire Emblem", gender: "female", imageUrl: "https://static.wikia.nocookie.net/fireemblem/images/6/68/Tharja_FE13_Artwork.png/revision/latest/scale-to-width-down/229?cb=20190810134754", ageNote: "Adult" },
  { name: "Aversa", universe: "Fire Emblem", gender: "female", imageUrl: "https://static.wikia.nocookie.net/fireemblem/images/5/59/Aversa_%28FE13_Artwork%29.png/revision/latest/scale-to-width-down/294?cb=20170305062950", ageNote: "Adult" },
  { name: "Dorothea", universe: "Fire Emblem", gender: "female", imageUrl: "https://static.wikia.nocookie.net/fireemblem/images/f/ff/3H_Dorothea_Artwork.png/revision/latest/scale-to-width-down/293?cb=20210526001639", ageNote: "Adult (18+)" },
  { name: "Rhea", universe: "Fire Emblem", gender: "female", imageUrl: "https://static.wikia.nocookie.net/fireemblem/images/b/b9/3H_Rhea_Artwork.png/revision/latest/scale-to-width-down/294?cb=20210525204902", ageNote: "Adult (ancient)" },
  { name: "Lysithea von Ordelia", universe: "Fire Emblem", gender: "female", imageUrl: "https://static.wikia.nocookie.net/fireemblem/images/d/d5/Lysithea_Heroes.png/revision/latest/scale-to-width-down/417?cb=20200305141046", ageNote: "Adult (18)" },
  { name: "Marianne von Edmund", universe: "Fire Emblem", gender: "female", imageUrl: "https://static.wikia.nocookie.net/fireemblem/images/0/06/Marianne_Heroes.png/revision/latest/scale-to-width-down/417?cb=20210304054624", ageNote: "Adult (18)" },
  { name: "Dimitri Alexandre Blaiddyd", universe: "Fire Emblem", gender: "male", imageUrl: "https://static.wikia.nocookie.net/fireemblem/images/1/18/Artwork_Dimitri.png/revision/latest/scale-to-width-down/500?cb=20201220085839", ageNote: "Adult (21)" },
  { name: "Claude von Riegan", universe: "Fire Emblem", gender: "male", imageUrl: "https://static.wikia.nocookie.net/fireemblem/images/b/ba/Artwork_Claude.png/revision/latest/scale-to-width-down/222?cb=20201220085923", ageNote: "Adult (21)" },
  { name: "Felix Hugo Fraldarius", universe: "Fire Emblem", gender: "male", imageUrl: "https://static.wikia.nocookie.net/fireemblem/images/7/7b/Felix_Heroes.png/revision/latest/scale-to-width-down/417?cb=20230417045800", ageNote: "Adult (20)" },

  // ── LEAGUE OF LEGENDS ─────────────────────────────────────────────────────────
  // Loading screen art from Riot Data Dragon CDN (confirmed CORS-open, portrait orientation)
  { name: "Ahri", universe: "League of Legends", gender: "female", imageUrl: DDragon("Ahri"), ageNote: "Adult (ancient spirit)" },
  { name: "Miss Fortune", universe: "League of Legends", gender: "female", imageUrl: DDragon("MissFortune"), ageNote: "Adult" },
  { name: "Katarina", universe: "League of Legends", gender: "female", imageUrl: DDragon("Katarina"), ageNote: "Adult" },
  { name: "Nidalee", universe: "League of Legends", gender: "female", imageUrl: DDragon("Nidalee"), ageNote: "Adult" },
  { name: "Caitlyn", universe: "League of Legends", gender: "female", imageUrl: DDragon("Caitlyn"), ageNote: "Adult" },
  { name: "Morgana", universe: "League of Legends", gender: "female", imageUrl: DDragon("Morgana"), ageNote: "Adult (ancient)" },
  { name: "Sona", universe: "League of Legends", gender: "female", imageUrl: DDragon("Sona"), ageNote: "Adult" },
  { name: "Kai'Sa", universe: "League of Legends", gender: "female", imageUrl: DDragon("Kaisa"), ageNote: "Adult" },
  { name: "Lux", universe: "League of Legends", gender: "female", imageUrl: DDragon("Lux"), ageNote: "Adult (19)" },
  { name: "Vi", universe: "League of Legends", gender: "female", imageUrl: DDragon("Vi"), ageNote: "Adult" },
  { name: "Sivir", universe: "League of Legends", gender: "female", imageUrl: DDragon("Sivir"), ageNote: "Adult" },
  { name: "Yasuo", universe: "League of Legends", gender: "male", imageUrl: DDragon("Yasuo"), ageNote: "Adult" },
  { name: "Garen", universe: "League of Legends", gender: "male", imageUrl: DDragon("Garen"), ageNote: "Adult" },
  { name: "Braum", universe: "League of Legends", gender: "male", imageUrl: DDragon("Braum"), ageNote: "Adult" },

  // ── OVERWATCH ─────────────────────────────────────────────────────────────────
  // Blizzard CloudFront CDN — hero select portraits
  { name: "Widowmaker", universe: "Overwatch", gender: "female", imageUrl: OW("widowmaker"), ageNote: "Adult (33)" },
  { name: "Mercy", universe: "Overwatch", gender: "female", imageUrl: OW("mercy"), ageNote: "Adult (37)" },
  { name: "Pharah", universe: "Overwatch", gender: "female", imageUrl: OW("pharah"), ageNote: "Adult (32)" },
  { name: "D.Va", universe: "Overwatch", gender: "female", imageUrl: OW("dva"), ageNote: "Adult (19)" },
  { name: "Ashe", universe: "Overwatch", gender: "female", imageUrl: OW("ashe"), ageNote: "Adult (39)" },
  { name: "Moira", universe: "Overwatch", gender: "female", imageUrl: OW("moira"), ageNote: "Adult (48)" },
  { name: "Brigitte", universe: "Overwatch", gender: "female", imageUrl: OW("brigitte"), ageNote: "Adult (23)" },
  { name: "Tracer", universe: "Overwatch", gender: "female", imageUrl: OW("tracer"), ageNote: "Adult (26)" },
  { name: "Soldier: 76", universe: "Overwatch", gender: "male", imageUrl: OW("soldier-76"), ageNote: "Adult" },
  { name: "Reaper", universe: "Overwatch", gender: "male", imageUrl: OW("reaper"), ageNote: "Adult" },

  // ── SMITE ─────────────────────────────────────────────────────────────────────
  { name: "Aphrodite", universe: "Smite", gender: "female", imageUrl: "https://static.wikia.nocookie.net/smite_gamepedia/images/f/fc/T_Aphrodite_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20141115065249", ageNote: "Adult goddess" },
  { name: "Freya", universe: "Smite", gender: "female", imageUrl: "https://static.wikia.nocookie.net/smite_gamepedia/images/5/58/T_Freya_Remodel_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20160713224926", ageNote: "Adult goddess" },
  { name: "Nox", universe: "Smite", gender: "female", imageUrl: "https://static.wikia.nocookie.net/smite_gamepedia/images/1/17/T_Nox_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20141025053432", ageNote: "Adult goddess" },
  { name: "Serqet", universe: "Smite", gender: "female", imageUrl: "https://static.wikia.nocookie.net/smite_gamepedia/images/9/91/T_Serqet_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20140712121140", ageNote: "Adult goddess" },
  { name: "Bellona (Smite)", universe: "Smite", gender: "female", imageUrl: "https://static.wikia.nocookie.net/smite_gamepedia/images/2/2c/T_Bellona_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20150219020936", ageNote: "Adult goddess" },
  { name: "Nu Wa", universe: "Smite", gender: "female", imageUrl: "https://static.wikia.nocookie.net/smite_gamepedia/images/4/42/T_NuWa_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20140802122235", ageNote: "Adult goddess" },
  { name: "Bastet", universe: "Smite", gender: "female", imageUrl: "https://static.wikia.nocookie.net/smite_gamepedia/images/f/f9/T_Bastet_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20140402111122", ageNote: "Adult goddess" },
  { name: "Discordia", universe: "Smite", gender: "female", imageUrl: "https://static.wikia.nocookie.net/smite_gamepedia/images/0/0a/T_Discordia_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20171106214932", ageNote: "Adult goddess" },
  { name: "Thor (Smite)", universe: "Smite", gender: "male", imageUrl: "https://static.wikia.nocookie.net/smite_gamepedia/images/8/81/T_Thor_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20130807123304", ageNote: "Adult god" },
  { name: "Loki (Smite)", universe: "Smite", gender: "male", imageUrl: "https://static.wikia.nocookie.net/smite_gamepedia/images/e/e3/T_Loki_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20150721135616", ageNote: "Adult god" },
  { name: "Hercules", universe: "Smite", gender: "male", imageUrl: "https://static.wikia.nocookie.net/smite_gamepedia/images/f/f3/T_Hercules_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20140611104244", ageNote: "Adult god" },
  { name: "Poseidon", universe: "Smite", gender: "male", imageUrl: "https://static.wikia.nocookie.net/smite_gamepedia/images/c/ca/T_Poseidon_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20170327235405", ageNote: "Adult god" },

  // ── AETHER GAZER ─────────────────────────────────────────────────────────────
  { name: "Zora", universe: "Aether Gazer", gender: "female", imageUrl: P("Zora AG"), ageNote: "Adult" },
  { name: "Perci", universe: "Aether Gazer", gender: "female", imageUrl: P("Perci AG"), ageNote: "Adult" },
  { name: "Haecate", universe: "Aether Gazer", gender: "female", imageUrl: P("Haecate AG"), ageNote: "Adult" },
  { name: "Croque", universe: "Aether Gazer", gender: "female", imageUrl: P("Croque AG"), ageNote: "Adult" },
  { name: "Ganesha", universe: "Aether Gazer", gender: "female", imageUrl: P("Ganesha AG"), ageNote: "Adult" },
  { name: "Kanami", universe: "Aether Gazer", gender: "female", imageUrl: P("Kanami AG"), ageNote: "Adult" },

  // ── ARKNIGHTS ─────────────────────────────────────────────────────────────────
  // ArknightsAssets GitHub raw CDN (CORS: *, loads directly in browser)
  { name: "Skadi", universe: "Arknights", gender: "female", imageUrl: AK("char_263_skadi_2"), ageNote: "Adult" },
  { name: "Texas", universe: "Arknights", gender: "female", imageUrl: AK("char_102_texas_2"), ageNote: "Adult" },
  { name: "Ch'en", universe: "Arknights", gender: "female", imageUrl: AK("char_010_chen_2"), ageNote: "Adult" },
  { name: "Surtr", universe: "Arknights", gender: "female", imageUrl: AK("char_350_surtr_2"), ageNote: "Adult" },
  { name: "W", universe: "Arknights", gender: "female", imageUrl: AK("char_113_cqbw_2"), ageNote: "Adult" },
  { name: "Mudrock", universe: "Arknights", gender: "female", imageUrl: AK("char_311_mudrok_2"), ageNote: "Adult" },
  { name: "Nearl", universe: "Arknights", gender: "female", imageUrl: AK("char_148_nearl_2"), ageNote: "Adult" },
  { name: "Specter", universe: "Arknights", gender: "female", imageUrl: AK("char_143_ghost_2"), ageNote: "Adult" },
  { name: "Eyjafjalla", universe: "Arknights", gender: "female", imageUrl: AK("char_103_angel_2"), ageNote: "Adult" },
  { name: "Silverash", universe: "Arknights", gender: "male", imageUrl: AK("char_172_svrash_2"), ageNote: "Adult" },
  { name: "Hellagur", universe: "Arknights", gender: "male", imageUrl: AK("char_188_helage_2"), ageNote: "Adult" },

  // ── ZENLESS ZONE ZERO ─────────────────────────────────────────────────────────
  // ZZZ image research: HoYoverse CDN (act-webstatic.hoyoverse.com) returns 403; enka.network
  // has no ZZZ support; m4urlclo0/ZZZ-Assets and ZZZure/ZenlessRes GitHub repos don't match
  // expected path structures. No reliable public CDN found. Neon placeholder used.
  { name: "Nicole Demara", universe: "Zenless Zone Zero", gender: "female", imageUrl: "https://static.wikia.nocookie.net/zenless-zone-zero/images/7/7a/Agent_Nicole_Demara_Portrait.png/revision/latest/scale-to-width-down/283?cb=20240707011646", ageNote: "Adult" },
  { name: "Zhu Yuan", universe: "Zenless Zone Zero", gender: "female", imageUrl: "https://static.wikia.nocookie.net/zenless-zone-zero/images/0/07/Agent_Zhu_Yuan_Portrait.png/revision/latest/scale-to-width-down/221?cb=20240708205906", ageNote: "Adult" },
  { name: "Ellen Joe", universe: "Zenless Zone Zero", gender: "female", imageUrl: "https://static.wikia.nocookie.net/zenless-zone-zero/images/e/e3/Agent_Ellen_Joe_Portrait.png/revision/latest/scale-to-width-down/425?cb=20241007222138", ageNote: "Adult" },
  { name: "Rina", universe: "Zenless Zone Zero", gender: "female", imageUrl: "https://static.wikia.nocookie.net/zenless-zone-zero/images/4/40/Agent_Alexandrina_Sebastiane_Portrait.png/revision/latest/scale-to-width-down/384?cb=20240707002357", ageNote: "Adult" },
  { name: "Grace Howard", universe: "Zenless Zone Zero", gender: "female", imageUrl: "https://static.wikia.nocookie.net/zenless-zone-zero/images/9/9a/Agent_Grace_Howard_Portrait.png/revision/latest/scale-to-width-down/194?cb=20240707002436", ageNote: "Adult" },
  { name: "Koleda", universe: "Zenless Zone Zero", gender: "female", imageUrl: "https://static.wikia.nocookie.net/zenless-zone-zero/images/d/d6/Agent_Koleda_Belobog_Portrait.png/revision/latest/scale-to-width-down/430?cb=20240706234545", ageNote: "Adult" },
  { name: "Miyabi", universe: "Zenless Zone Zero", gender: "female", imageUrl: "https://static.wikia.nocookie.net/zenless-zone-zero/images/d/da/Agent_Hoshimi_Miyabi_Portrait.png/revision/latest/scale-to-width-down/317?cb=20250329051641", ageNote: "Adult" },
  { name: "Yanagi", universe: "Zenless Zone Zero", gender: "female", imageUrl: "https://static.wikia.nocookie.net/zenless-zone-zero/images/c/cb/Agent_Tsukishiro_Yanagi_Portrait.png/revision/latest/scale-to-width-down/352?cb=20241106030347", ageNote: "Adult" },
  { name: "Burnice", universe: "Zenless Zone Zero", gender: "female", imageUrl: "https://static.wikia.nocookie.net/zenless-zone-zero/images/d/d1/Agent_Burnice_White_Portrait.png/revision/latest/scale-to-width-down/324?cb=20241016140944", ageNote: "Adult" },
  { name: "Piper Wheel", universe: "Zenless Zone Zero", gender: "female", imageUrl: "https://static.wikia.nocookie.net/zenless-zone-zero/images/a/a9/Agent_Piper_Wheel_Portrait.png/revision/latest/scale-to-width-down/241?cb=20240707002233", ageNote: "Adult (18+)" },
  { name: "Billy Kid", universe: "Zenless Zone Zero", gender: "male", imageUrl: "https://static.wikia.nocookie.net/zenless-zone-zero/images/d/dc/Agent_Billy_Kid_Portrait.png/revision/latest/scale-to-width-down/313?cb=20240707002211", ageNote: "Adult" },
  { name: "Soldier 11", universe: "Zenless Zone Zero", gender: "female", imageUrl: "https://static.wikia.nocookie.net/zenless-zone-zero/images/3/36/Agent_Soldier_11_Portrait.png/revision/latest/scale-to-width-down/230?cb=20240713020308", ageNote: "Adult" },

  // ── HONKAI: STAR RAIL (expanded) ─────────────────────────────────────────────
  // jsDelivr / StarRailRes by numeric character ID
  { name: "Himeko", universe: "Honkai: Star Rail", gender: "female", imageUrl: HSR_ID(1003), ageNote: "Adult" },
  { name: "Bronya (Star Rail)", universe: "Honkai: Star Rail", gender: "female", imageUrl: HSR_ID(1101), ageNote: "Adult" },
  { name: "Pela", universe: "Honkai: Star Rail", gender: "female", imageUrl: HSR_ID(1106), ageNote: "Adult" },
  { name: "Serval", universe: "Honkai: Star Rail", gender: "female", imageUrl: HSR_ID(1103), ageNote: "Adult" },
  { name: "Topaz", universe: "Honkai: Star Rail", gender: "female", imageUrl: HSR_ID(1112), ageNote: "Adult" },
  { name: "Robin", universe: "Honkai: Star Rail", gender: "female", imageUrl: HSR_ID(1309), ageNote: "Adult" },
  { name: "Sparkle", universe: "Honkai: Star Rail", gender: "female", imageUrl: HSR_ID(1306), ageNote: "Adult" },
  { name: "Welt", universe: "Honkai: Star Rail", gender: "male", imageUrl: HSR_ID(1004), ageNote: "Adult" },
  { name: "Blade", universe: "Honkai: Star Rail", gender: "male", imageUrl: HSR_ID(1205), ageNote: "Adult" },
  { name: "Jing Yuan", universe: "Honkai: Star Rail", gender: "male", imageUrl: HSR_ID(1204), ageNote: "Adult" },

  // ── GODDESS OF VICTORY: NIKKE ─────────────────────────────────────────────────
  // NIKKE image research: nikke-db.pages.dev returns 526-byte stub responses (not real images);
  // no GitHub community repo with accessible portrait CDN found. Neon placeholder used.
  { name: "Rapi", universe: "NIKKE", gender: "female", imageUrl: "https://static.wikia.nocookie.net/nikke-goddess-of-victory-international/images/8/82/Rapi_MI.png/revision/latest?cb=20231123043651", ageNote: "Adult android" },
  { name: "Anis", universe: "NIKKE", gender: "female", imageUrl: "https://static.wikia.nocookie.net/nikke-goddess-of-victory-international/images/b/bc/Anis_MI.png/revision/latest?cb=20231123052306", ageNote: "Adult android" },
  { name: "Neon", universe: "NIKKE", gender: "female", imageUrl: "https://static.wikia.nocookie.net/nikke-goddess-of-victory-international/images/1/14/Neon_MI.png/revision/latest/scale-to-width-down/252?cb=20231123052411", ageNote: "Adult android" },
  { name: "Modernia", universe: "NIKKE", gender: "female", imageUrl: "https://static.wikia.nocookie.net/nikke-goddess-of-victory-international/images/8/80/Modernia_MI.png/revision/latest?cb=20231123052408", ageNote: "Adult android" },
  { name: "Scarlet (NIKKE)", universe: "NIKKE", gender: "female", imageUrl: "https://static.wikia.nocookie.net/nikke-goddess-of-victory-international/images/4/45/Scarlet_MI.png/revision/latest/scale-to-width-down/250?cb=20231123052441", ageNote: "Adult android" },
  { name: "Alice", universe: "NIKKE", gender: "female", imageUrl: "https://static.wikia.nocookie.net/nikke-goddess-of-victory-international/images/c/ce/Alice_MI.png/revision/latest/scale-to-width-down/254?cb=20231123052304", ageNote: "Adult android" },
  { name: "Noise", universe: "NIKKE", gender: "female", imageUrl: "https://static.wikia.nocookie.net/nikke-goddess-of-victory-international/images/b/b9/Noise_MI.png/revision/latest/scale-to-width-down/254?cb=20231123052417", ageNote: "Adult android" },
  { name: "Privaty", universe: "NIKKE", gender: "female", imageUrl: "https://static.wikia.nocookie.net/nikke-goddess-of-victory-international/images/e/e8/Privaty_MI.png/revision/latest?cb=20231123052426", ageNote: "Adult android" },
  { name: "Rupee", universe: "NIKKE", gender: "female", imageUrl: "https://static.wikia.nocookie.net/nikke-goddess-of-victory-international/images/a/a1/Rupee_MI.png/revision/latest/scale-to-width-down/250?cb=20231123052438", ageNote: "Adult android" },
  { name: "Sin", universe: "NIKKE", gender: "female", imageUrl: "https://static.wikia.nocookie.net/nikke-goddess-of-victory-international/images/4/48/Sin_MI.png/revision/latest/scale-to-width-down/250?cb=20231123052444", ageNote: "Adult android" },
  { name: "Yulha", universe: "NIKKE", gender: "female", imageUrl: "https://static.wikia.nocookie.net/nikke-goddess-of-victory-international/images/2/2b/Yulha_MI.png/revision/latest?cb=20231123052459", ageNote: "Adult android" },
  { name: "Quency", universe: "NIKKE", gender: "female", imageUrl: "https://static.wikia.nocookie.net/nikke-goddess-of-victory-international/images/5/5a/Quency_MI.png/revision/latest/scale-to-width-down/250?cb=20231123052430", ageNote: "Adult android" },

  // ── AFK JOURNEY ──────────────────────────────────────────────────────────────
  { name: "Temesia", universe: "AFK Journey", gender: "female", imageUrl: "https://static.wikia.nocookie.net/afk-journey/images/c/c6/Temesia.png/revision/latest/scale-to-width-down/433?cb=20251130210520", ageNote: "Adult" },
  { name: "Marilee", universe: "AFK Journey", gender: "female", imageUrl: "https://static.wikia.nocookie.net/afk-journey/images/c/c8/Marilee.png/revision/latest/scale-to-width-down/500?cb=20240410062820", ageNote: "Adult" },
  { name: "Cecia", universe: "AFK Journey", gender: "female", imageUrl: "https://static.wikia.nocookie.net/afk-journey/images/d/d5/Cecia.png/revision/latest/scale-to-width-down/398?cb=20251227163719", ageNote: "Adult" },
  { name: "Eironn", universe: "AFK Journey", gender: "male", imageUrl: "https://static.wikia.nocookie.net/afk-journey/images/6/69/Eironn.png/revision/latest/scale-to-width-down/500?cb=20240401124826", ageNote: "Adult" },
  { name: "Lucius", universe: "AFK Journey", gender: "male", imageUrl: "https://static.wikia.nocookie.net/afk-journey/images/5/5d/Lucius.png/revision/latest/scale-to-width-down/389?cb=20251205000322", ageNote: "Adult" },
  { name: "Odie", universe: "AFK Journey", gender: "male", imageUrl: "https://static.wikia.nocookie.net/afk-journey/images/2/2e/Odie.png/revision/latest/scale-to-width-down/375?cb=20240320152553", ageNote: "Adult" },
  { name: "Vala", universe: "AFK Journey", gender: "female", imageUrl: "https://static.wikia.nocookie.net/afk-journey/images/6/6a/Vala.png/revision/latest/scale-to-width-down/299?cb=20251205000455", ageNote: "Adult" },
  { name: "Sinbad", universe: "AFK Journey", gender: "male", imageUrl: "https://static.wikia.nocookie.net/afk-journey/images/3/35/Sinbad.png/revision/latest/scale-to-width-down/201?cb=20251205000847", ageNote: "Adult" },

  // ── SOLO LEVELING: ARISE ──────────────────────────────────────────────────────
  { name: "Emma Laurent", universe: "Solo Leveling: Arise", gender: "female", imageUrl: P("Emma Laurent SLA"), ageNote: "Adult" },
  { name: "Yoo Soohyun", universe: "Solo Leveling: Arise", gender: "female", imageUrl: P("Yoo Soohyun SLA"), ageNote: "Adult" },
  { name: "Lee Juhee", universe: "Solo Leveling: Arise", gender: "female", imageUrl: P("Lee Juhee SLA"), ageNote: "Adult" },
  { name: "Min Byung-gyu", universe: "Solo Leveling: Arise", gender: "male", imageUrl: P("Min Byung SLA"), ageNote: "Adult" },
  { name: "Baek Yoonho", universe: "Solo Leveling: Arise", gender: "male", imageUrl: P("Baek Yoonho SLA"), ageNote: "Adult" },

  // ── WUTHERING WAVES ───────────────────────────────────────────────────────────
  // WuWa image research: api.resonance.rest is unreachable (HTTP 000); wuwa-assets GitHub repo
  // doesn't match expected path structure; wutheringwaves.gg CDN returns 404. No public CDN found.
  // Neon placeholder used.
  { name: "Yinlin", universe: "Wuthering Waves", gender: "female", imageUrl: "https://static.wikia.nocookie.net/wutheringwaves/images/3/33/Yinlin_Card.jpg/revision/latest/scale-to-width-down/283?cb=20241007222006", ageNote: "Adult" },
  { name: "Jianxin", universe: "Wuthering Waves", gender: "female", imageUrl: "https://static.wikia.nocookie.net/wutheringwaves/images/8/8a/Jianxin_Card.jpg/revision/latest/scale-to-width-down/281?cb=20240206132017", ageNote: "Adult" },
  { name: "Changli", universe: "Wuthering Waves", gender: "female", imageUrl: "https://static.wikia.nocookie.net/wutheringwaves/images/e/e9/Changli_Card.png/revision/latest/scale-to-width-down/281?cb=20240719033449", ageNote: "Adult" },
  { name: "Verina", universe: "Wuthering Waves", gender: "female", imageUrl: "https://static.wikia.nocookie.net/wutheringwaves/images/7/7c/Verina%27s_Card.jpg/revision/latest/scale-to-width-down/282?cb=20240511130959", ageNote: "Adult" },
  { name: "Zhezhi", universe: "Wuthering Waves", gender: "female", imageUrl: "https://static.wikia.nocookie.net/wutheringwaves/images/f/f0/Zhezhi_Card.png/revision/latest/scale-to-width-down/281?cb=20240708201004", ageNote: "Adult" },
  { name: "Carlotta", universe: "Wuthering Waves", gender: "female", imageUrl: "https://static.wikia.nocookie.net/wutheringwaves/images/8/8a/Carlotta_Card.png/revision/latest/scale-to-width-down/264?cb=20241122070709", ageNote: "Adult" },
  { name: "Shorekeeper", universe: "Wuthering Waves", gender: "female", imageUrl: "https://static.wikia.nocookie.net/wutheringwaves/images/8/85/Shorekeeper_Card.png/revision/latest/scale-to-width-down/281?cb=20240813134043", ageNote: "Adult (ancient entity)" },
  { name: "Camellya", universe: "Wuthering Waves", gender: "female", imageUrl: "https://static.wikia.nocookie.net/wutheringwaves/images/8/8f/Camellya_Card.png/revision/latest/scale-to-width-down/281?cb=20240912101744", ageNote: "Adult" },
  { name: "Roccia", universe: "Wuthering Waves", gender: "female", imageUrl: "https://static.wikia.nocookie.net/wutheringwaves/images/e/ea/Roccia_Card.png/revision/latest/scale-to-width-down/264?cb=20241122070750", ageNote: "Adult" },
  { name: "Phoebe", universe: "Wuthering Waves", gender: "female", imageUrl: "https://static.wikia.nocookie.net/wutheringwaves/images/5/54/Phoebe_Card.png/revision/latest/scale-to-width-down/281?cb=20251015114458", ageNote: "Adult" },
  { name: "Danjin", universe: "Wuthering Waves", gender: "female", imageUrl: "https://static.wikia.nocookie.net/wutheringwaves/images/3/3e/Danjin_Card.png/revision/latest/scale-to-width-down/281?cb=20240607110406", ageNote: "Adult" },
  { name: "Jinhsi", universe: "Wuthering Waves", gender: "female", imageUrl: "https://static.wikia.nocookie.net/wutheringwaves/images/a/a9/Jinhsi_Card.png/revision/latest/scale-to-width-down/282?cb=20240517072857", ageNote: "Adult" },
  { name: "Calcharo", universe: "Wuthering Waves", gender: "male", imageUrl: "https://static.wikia.nocookie.net/wutheringwaves/images/e/e5/Calcharo_Card.png/revision/latest/scale-to-width-down/281?cb=20240717222251", ageNote: "Adult" },
  { name: "Jiyan", universe: "Wuthering Waves", gender: "male", imageUrl: "https://static.wikia.nocookie.net/wutheringwaves/images/0/0d/Jiyan_Card.png/revision/latest/scale-to-width-down/281?cb=20240509102627", ageNote: "Adult" },
  { name: "Brant", universe: "Wuthering Waves", gender: "male", imageUrl: "https://static.wikia.nocookie.net/wutheringwaves/images/2/2d/Brant_Card.png/revision/latest/scale-to-width-down/281?cb=20251015115249", ageNote: "Adult" },
  { name: "Xiangli Yao", universe: "Wuthering Waves", gender: "male", imageUrl: "https://static.wikia.nocookie.net/wutheringwaves/images/e/e9/Xiangli_Yao_Card.png/revision/latest/scale-to-width-down/281?cb=20240708200915", ageNote: "Adult" },

  // ── CHAOS ZERO: NIGHTMARE ─────────────────────────────────────────────────────
  { name: "Livia", universe: "Chaos Zero: Nightmare", gender: "female", imageUrl: P("Livia CZN"), ageNote: "Adult" },
  { name: "Selene", universe: "Chaos Zero: Nightmare", gender: "female", imageUrl: P("Selene CZN"), ageNote: "Adult" },
  { name: "Nadia", universe: "Chaos Zero: Nightmare", gender: "female", imageUrl: P("Nadia CZN"), ageNote: "Adult" },
  { name: "Morrigan", universe: "Chaos Zero: Nightmare", gender: "female", imageUrl: P("Morrigan CZN"), ageNote: "Adult" },
  { name: "Isadora", universe: "Chaos Zero: Nightmare", gender: "female", imageUrl: P("Isadora CZN"), ageNote: "Adult" },
  { name: "Vesper", universe: "Chaos Zero: Nightmare", gender: "female", imageUrl: P("Vesper CZN"), ageNote: "Adult" },
  { name: "Kael", universe: "Chaos Zero: Nightmare", gender: "male", imageUrl: P("Kael CZN"), ageNote: "Adult" },
  { name: "Zephyr", universe: "Chaos Zero: Nightmare", gender: "male", imageUrl: P("Zephyr CZN"), ageNote: "Adult" },

  // ── LOST SWORD ────────────────────────────────────────────────────────────────
  { name: "Alicia", universe: "Lost Sword", gender: "female", imageUrl: P("Alicia LS"), ageNote: "Adult" },
  { name: "Luna", universe: "Lost Sword", gender: "female", imageUrl: P("Luna LS"), ageNote: "Adult" },
  { name: "Serena", universe: "Lost Sword", gender: "female", imageUrl: P("Serena LS"), ageNote: "Adult" },
  { name: "Valeria", universe: "Lost Sword", gender: "female", imageUrl: P("Valeria LS"), ageNote: "Adult" },
  { name: "Iris", universe: "Lost Sword", gender: "female", imageUrl: P("Iris LS"), ageNote: "Adult" },
  { name: "Elena", universe: "Lost Sword", gender: "female", imageUrl: P("Elena LS"), ageNote: "Adult" },
  { name: "Aria", universe: "Lost Sword", gender: "female", imageUrl: P("Aria LS"), ageNote: "Adult" },
  { name: "Rein", universe: "Lost Sword", gender: "male", imageUrl: P("Rein LS"), ageNote: "Adult" },
  { name: "Siegfried", universe: "Lost Sword", gender: "male", imageUrl: P("Siegfried LS"), ageNote: "Adult" },

  // ── SWORD MASTER STORY ────────────────────────────────────────────────────────
  { name: "Athena", universe: "Sword Master Story", gender: "female", imageUrl: P("Athena SMS"), ageNote: "Adult goddess" },
  { name: "Medusa", universe: "Sword Master Story", gender: "female", imageUrl: P("Medusa SMS"), ageNote: "Adult" },
  { name: "Vivian", universe: "Sword Master Story", gender: "female", imageUrl: P("Vivian SMS"), ageNote: "Adult" },
  { name: "Rebecca", universe: "Sword Master Story", gender: "female", imageUrl: P("Rebecca SMS"), ageNote: "Adult" },
  { name: "Kanna", universe: "Sword Master Story", gender: "female", imageUrl: P("Kanna SMS"), ageNote: "Adult" },
  { name: "Aurora", universe: "Sword Master Story", gender: "female", imageUrl: P("Aurora SMS"), ageNote: "Adult" },
  { name: "Liliana", universe: "Sword Master Story", gender: "female", imageUrl: P("Liliana SMS"), ageNote: "Adult" },
  { name: "Freesia", universe: "Sword Master Story", gender: "female", imageUrl: P("Freesia SMS"), ageNote: "Adult" },
  { name: "Scarlett", universe: "Sword Master Story", gender: "female", imageUrl: P("Scarlett SMS"), ageNote: "Adult" },
  { name: "Kaito", universe: "Sword Master Story", gender: "male", imageUrl: P("Kaito SMS"), ageNote: "Adult" },
];

async function seed() {
  console.log("Clearing old data and re-seeding...");
  await db.delete(votesTable);
  await db.delete(charactersTable);
  await db.insert(charactersTable).values(characters);
  console.log(`✅ Seeded ${characters.length} characters across ${new Set(characters.map(c => c.universe)).size} universes.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
