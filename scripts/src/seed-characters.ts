import { db } from "@workspace/db";
import { charactersTable, votesTable } from "@workspace/db/schema";

const P = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=400&background=0d0d1a&color=e040fb&bold=true&font-size=0.22&length=2`;

const DDragon = (champName: string) =>
  `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_0.jpg`;

const GI = (n: string) =>
  `https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_${n}.png`;

const GIE = (n: string) =>
  `https://enka.network/ui/UI_AvatarIcon_${n}.png`;

const HSR_ID = (id: number) =>
  `https://cdn.jsdelivr.net/gh/Mar-7th/StarRailRes@master/icon/character/${id}.png`;

const OW = (hero: string) =>
  `https://d1u1mce87gyfbn.cloudfront.net/hero/${hero}/hero-select-portrait.png`;

const AK = (id: string) =>
  `https://raw.githubusercontent.com/ArknightsAssets/ArknightsAssets/cn/assets/torappu/dynamicassets/arts/charportraits/${id}.png`;

const MV = (path: string) =>
  `https://i.annihil.us/u/prod/marvel/i/mg/${path}/portrait_incredible.jpg`;

const FW = (wiki: string, path: string) =>
  `https://static.wikia.nocookie.net/${wiki}/images/${path}`;

const characters = [
  // ── MARVEL (16) ─────────────────────────────────────────────────────────────
  { name: "Black Widow", universe: "Marvel", gender: "female", imageUrl: FW("marveldatabase", "7/72/Black_Widow_Pale_Little_Spider_Vol_1_1_Textless.jpg/revision/latest/scale-to-width-down/331?cb=20190809082317"), ageNote: "Adult" },
  { name: "Storm", universe: "Marvel", gender: "female", imageUrl: FW("marveldatabase", "5/5d/Ororo_Munroe_%28Earth-12%29_from_Exiles_Vol_1_14_0001.jpg/revision/latest?cb=20191231020331"), ageNote: "Adult" },
  { name: "Scarlet Witch", universe: "Marvel", gender: "female", imageUrl: FW("marveldatabase", "1/1d/Wanda_Maximoff_%28Earth-12%29_from_Exiles_Vol_1_14_0001.jpg/revision/latest?cb=20191231013147"), ageNote: "Adult" },
  { name: "She-Hulk", universe: "Marvel", gender: "female", imageUrl: FW("marveldatabase", "9/92/Jennifer_Walters_%28Earth-65%29_from_Spider-Gwen_Annual_Vol_1_1.jpg/revision/latest/scale-to-width-down/285?cb=20181225181225"), ageNote: "Adult" },
  { name: "Ms. Marvel", universe: "Marvel", gender: "female", imageUrl: FW("marveldatabase", "4/48/Ms._Marvel_Vol_2_1_Textless.jpg/revision/latest/scale-to-width-down/333?cb=20061023133037"), ageNote: "Adult" },
  { name: "Psylocke", universe: "Marvel", gender: "female", imageUrl: FW("marveldatabase", "0/08/Elizabeth_Braddock_%28Earth-616%29_from_Hunt_for_Wolverine_Mystery_in_Madripoor_Vol_1_4_Spoiler_Variant_cover_001.jpg/revision/latest/scale-to-width-down/317?cb=20180823221219"), ageNote: "Adult" },
  { name: "Rogue", universe: "Marvel", gender: "female", imageUrl: FW("marveldatabase", "0/0b/Rogue_%28Anna_Marie%29_%28Earth-27%29_from_Exiles_Vol_1_83_0001.jpg/revision/latest/scale-to-width-down/159?cb=20191209061419"), ageNote: "Adult" },
  { name: "Spider-Woman", universe: "Marvel", gender: "female", imageUrl: FW("marveldatabase", "4/4e/Julia_Carpenter_%28Earth-616%29_from_Ms._Marvel_Vol_2_13_0001.png/revision/latest/scale-to-width-down/321?cb=20230701112201"), ageNote: "Adult" },
  { name: "Thor", universe: "Marvel", gender: "male", imageUrl: MV("5/a0/537bc7036ab02"), ageNote: "Adult" },
  { name: "Iron Man", universe: "Marvel", gender: "male", imageUrl: MV("3/40/4bb4680432f73"), ageNote: "Adult" },
  { name: "Captain America", universe: "Marvel", gender: "male", imageUrl: MV("3/50/537ba56d31087"), ageNote: "Adult" },
  { name: "Wolverine", universe: "Marvel", gender: "male", imageUrl: FW("marveldatabase", "9/9e/Dark_Wolverine_Vol_1_77_Textless.jpg/revision/latest/scale-to-width-down/329?cb=20090712125221"), ageNote: "Adult" },
  { name: "Deadpool", universe: "Marvel", gender: "male", imageUrl: FW("marveldatabase", "4/44/Deadpool_Vol_9_8_Deadpool_Virgin_Variant.jpg/revision/latest/scale-to-width-down/325?cb=20241117002534"), ageNote: "Adult" },
  { name: "Black Panther", universe: "Marvel", gender: "male", imageUrl: FW("marveldatabase", "a/a2/Black_Panther_Vol_5_1_Textless.jpg/revision/latest/scale-to-width-down/322?cb=20221204164902"), ageNote: "Adult" },
  { name: "Doctor Strange", universe: "Marvel", gender: "male", imageUrl: FW("marveldatabase", "a/ac/Asim_Strange_%28Earth-65%29_from_Spider-Gwen_Vol_2_34.jpg/revision/latest?cb=20181231172547"), ageNote: "Adult" },
  { name: "Gambit", universe: "Marvel", gender: "male", imageUrl: FW("marveldatabase", "4/43/Remy_LeBeau_%28Earth-12%29_from_Exiles_Vol_1_14_0001.jpg/revision/latest?cb=20191231020037"), ageNote: "Adult" },

  // ── DC (15) ──────────────────────────────────────────────────────────────────
  { name: "Wonder Woman", universe: "DC", gender: "female", imageUrl: FW("marvel_dc", "b/bd/Wonder_Woman_Earth-Two_002.jpg/revision/latest/scale-to-width-down/500?cb=20221222001726"), ageNote: "Adult" },
  { name: "Zatanna", universe: "DC", gender: "female", imageUrl: FW("marvel_dc", "e/e7/Superman_Vol_6_18_Textless_Variant.jpg/revision/latest/scale-to-width-down/329?cb=20240918150815"), ageNote: "Adult" },
  { name: "Starfire", universe: "DC", gender: "female", imageUrl: FW("marvel_dc", "7/7a/Tales_of_the_Titans_Vol_1_1_Textless.jpg/revision/latest/scale-to-width-down/329?cb=20230817142619"), ageNote: "Adult" },
  { name: "Catwoman", universe: "DC", gender: "female", imageUrl: FW("marvel_dc", "c/c1/Catwoman_Vol_5_80_Textless_Chew_Variant.jpg/revision/latest/scale-to-width-down/324?cb=20251017123609"), ageNote: "Adult" },
  { name: "Harley Quinn", universe: "DC", gender: "female", imageUrl: FW("marvel_dc", "b/ba/Harley_Quinn_Vol_4_46_Textless_Nakayama_Variant.jpg/revision/latest/scale-to-width-down/323?cb=20241227171617"), ageNote: "Adult" },
  { name: "Black Canary", universe: "DC", gender: "female", imageUrl: FW("marvel_dc", "7/77/Black_Canary_Best_of_the_Best_Vol_1_1_Textless_Variant.jpg/revision/latest/scale-to-width-down/323?cb=20241128162100"), ageNote: "Adult" },
  { name: "Power Girl", universe: "DC", gender: "female", imageUrl: FW("marvel_dc", "e/eb/Power_Girl_Vol_3_11_Textless_Variant.jpg/revision/latest/scale-to-width-down/327?cb=20240727143046"), ageNote: "Adult" },
  { name: "Huntress", universe: "DC", gender: "female", imageUrl: FW("marvel_dc", "e/e9/Batman_Secret_Files_Huntress_Vol_1_1_Textless.jpg/revision/latest/scale-to-width-down/329?cb=20210809150209"), ageNote: "Adult" },
  { name: "Batman", universe: "DC", gender: "male", imageUrl: FW("marvel_dc", "7/76/Batman_Urban_Legends_Vol_1_5_Textless.jpg/revision/latest/scale-to-width-down/329?cb=20210717062920"), ageNote: "Adult" },
  { name: "Superman", universe: "DC", gender: "male", imageUrl: FW("marvel_dc", "e/e1/Superman_Vol_5_21.jpg/revision/latest/scale-to-width-down/326?cb=20191119035619"), ageNote: "Adult" },
  { name: "Green Arrow", universe: "DC", gender: "male", imageUrl: FW("marvel_dc", "9/9c/Green_Arrow_Vol_6_12_Textless_Variant.jpg/revision/latest/scale-to-width-down/329?cb=20221013151640"), ageNote: "Adult" },
  { name: "The Flash", universe: "DC", gender: "male", imageUrl: FW("marvel_dc", "6/6d/The_Flash_Vol_5_51_Textless.jpg/revision/latest/scale-to-width-down/330?cb=20180614155140"), ageNote: "Adult" },
  { name: "Aquaman", universe: "DC", gender: "male", imageUrl: FW("marvel_dc", "f/f7/Aquaman_Vol_8_1.jpg/revision/latest/scale-to-width-down/330?cb=20170728221227"), ageNote: "Adult" },
  { name: "Nightwing", universe: "DC", gender: "male", imageUrl: FW("marvel_dc", "8/8b/Nightwing_Vol_4_78_Textless.jpg/revision/latest/scale-to-width-down/329?cb=20210519152318"), ageNote: "Adult" },
  { name: "Lobo", universe: "DC", gender: "male", imageUrl: FW("marvel_dc", "4/42/Lobo_Vol_2_1000000.jpg/revision/latest/scale-to-width-down/324?cb=20130723062451"), ageNote: "Adult" },

  // ── ONE PIECE (6) ──────────────────────────────────────────────────────────
  { name: "Boa Hancock", universe: "One Piece", gender: "female", imageUrl: FW("onepiece", "f/f0/Boa_Hancock_Anime_Infobox.png/revision/latest/scale-to-width-down/242?cb=20230126022456"), ageNote: "Adult (31)" },
  { name: "Nico Robin", universe: "One Piece", gender: "female", imageUrl: FW("onepiece", "3/3d/Nico_Robin_Anime_Infobox.png/revision/latest/scale-to-width-down/500?cb=20230218111418"), ageNote: "Adult (30)" },
  { name: "Nami", universe: "One Piece", gender: "female", imageUrl: FW("onepiece", "8/8c/Nami_Anime_Infobox.png/revision/latest/scale-to-width-down/279?cb=20230218111438"), ageNote: "Adult (20)" },
  { name: "Roronoa Zoro", universe: "One Piece", gender: "male", imageUrl: FW("onepiece", "4/4d/Roronoa_Zoro_Anime_Infobox.png/revision/latest/scale-to-width-down/500?cb=20220430113929"), ageNote: "Adult (21)" },
  { name: "Trafalgar Law", universe: "One Piece", gender: "male", imageUrl: FW("onepiece", "9/9f/Trafalgar_D_Water_Law_Anime_Infobox.png/revision/latest/scale-to-width-down/500?cb=20220110012544"), ageNote: "Adult (26)" },
  { name: "Sanji", universe: "One Piece", gender: "male", imageUrl: FW("onepiece", "b/b6/Sanji_Anime_Post_Timeskip_Infobox.png/revision/latest/scale-to-width-down/167?cb=20240122012744"), ageNote: "Adult (21)" },
  { name: "Yamato", universe: "One Piece", gender: "female", imageUrl: FW("onepiece", "b/bd/Yamato_Anime_Infobox.png/revision/latest/scale-to-width-down/336?cb=20260126165014"), ageNote: "Adult (28)" },
  { name: "Jewelry Bonney", universe: "One Piece", gender: "female", imageUrl: FW("onepiece", "6/62/Jewelry_Bonney_Anime_Post_Timeskip_Infobox.png/revision/latest/scale-to-width-down/333?cb=20230123001318"), ageNote: "Adult (24)" },
  { name: "Vinsmoke Reiju", universe: "One Piece", gender: "female", imageUrl: FW("onepiece", "a/a3/Vinsmoke_Reiju_Anime_Infobox.png/revision/latest/scale-to-width-down/209?cb=20231211104854"), ageNote: "Adult (24)" },
  { name: "Portgas D. Ace", universe: "One Piece", gender: "male", imageUrl: FW("onepiece", "4/4f/Portgas_D._Ace_Anime_Infobox.png/revision/latest/scale-to-width-down/299?cb=20240629132600"), ageNote: "Adult (20)" },

  // ── ATTACK ON TITAN (3) ────────────────────────────────────────────────────
  { name: "Mikasa Ackerman", universe: "Attack on Titan", gender: "female", imageUrl: FW("attackontitan", "c/c4/Mikasa_Ackerman_character_image.png/revision/latest/scale-to-width-down/395?cb=20220221150924"), ageNote: "Adult (19)" },
  { name: "Levi Ackerman", universe: "Attack on Titan", gender: "male", imageUrl: FW("attackontitan", "f/f2/Levi_Ackerman_character_image.png/revision/latest/scale-to-width-down/395?cb=20220221150759"), ageNote: "Adult (30s)" },
  { name: "Erwin Smith", universe: "Attack on Titan", gender: "male", imageUrl: FW("attackontitan", "1/1e/Erwin_Smith_character_image.png/revision/latest/scale-to-width-down/395?cb=20220221151249"), ageNote: "Adult" },

  // ── NARUTO (4) ─────────────────────────────────────────────────────────────
  { name: "Hinata Hyuga", universe: "Naruto", gender: "female", imageUrl: FW("naruto", "e/e4/Hinata_Uzumaki_%28BoS%29.png/revision/latest/scale-to-width-down/500?cb=20200826044124"), ageNote: "Adult (18)" },
  { name: "Sakura Haruno", universe: "Naruto", gender: "female", imageUrl: FW("naruto", "6/64/Sakura_Part_1.png/revision/latest/scale-to-width-down/500?cb=20170726101444"), ageNote: "Adult (19+)" },
  { name: "Naruto Uzumaki", universe: "Naruto", gender: "male", imageUrl: FW("naruto", "d/d6/Naruto_Part_I.png/revision/latest/scale-to-width-down/500?cb=20251228135525"), ageNote: "Adult (19+)" },
  { name: "Sasuke Uchiha", universe: "Naruto", gender: "male", imageUrl: FW("naruto", "2/21/Sasuke_Part_1.png/revision/latest/scale-to-width-down/500?cb=20170716092103"), ageNote: "Adult (19+)" },

  // ── DRAGON BALL (5) ────────────────────────────────────────────────────────
  { name: "Android 18", universe: "Dragon Ball", gender: "female", imageUrl: FW("dragonball", "e/e6/Android_18_anime_profile.png/revision/latest/scale-to-width-down/200?cb=20250617190842"), ageNote: "Adult" },
  { name: "Bulma", universe: "Dragon Ball", gender: "female", imageUrl: FW("dragonball", "a/a6/Bulma_anime_profile.png/revision/latest/scale-to-width-down/171?cb=20250617190824"), ageNote: "Adult" },
  { name: "Videl", universe: "Dragon Ball", gender: "female", imageUrl: FW("dragonball", "d/de/Videl_Episode_207.png/revision/latest/scale-to-width-down/296?cb=20210406214244"), ageNote: "Adult" },
  { name: "Goku", universe: "Dragon Ball", gender: "male", imageUrl: FW("dragonball", "b/ba/Goku_anime_profile.png/revision/latest/scale-to-width-down/252?cb=20250723190513"), ageNote: "Adult" },
  { name: "Vegeta", universe: "Dragon Ball", gender: "male", imageUrl: FW("dragonball", "9/94/Vegeta_anime_profile.png/revision/latest/scale-to-width-down/308?cb=20250723190507"), ageNote: "Adult" },

  // ── MY HERO ACADEMIA (4) ──────────────────────────────────────────────────
  { name: "Midnight", universe: "My Hero Academia", gender: "female", imageUrl: FW("bokunoheroacademia", "d/d5/Nemuri_Kayama_Anime_Action.png/revision/latest?cb=20220808034301"), ageNote: "Adult (30)" },
  { name: "Mt. Lady", universe: "My Hero Academia", gender: "female", imageUrl: FW("p__", "a/ac/Mount_Lady_Action_Pose.png/revision/latest/scale-to-width-down/262?cb=20221112121955&path-prefix=protagonist"), ageNote: "Adult (23)" },
  { name: "Mirko", universe: "My Hero Academia", gender: "female", imageUrl: FW("p__", "8/89/Mirko_Short_Hair.png/revision/latest/scale-to-width-down/202?cb=20240217113232&path-prefix=protagonist"), ageNote: "Adult (27)" },
  { name: "Momo Yaoyorozu", universe: "My Hero Academia", gender: "female", imageUrl: FW("bokunoheroacademia", "8/8f/Momo_Yaoyorozu_Action_2.png/revision/latest/scale-to-width-down/186?cb=20250602031925"), ageNote: "Adult (18)" },

  // ── BLEACH (5) ─────────────────────────────────────────────────────────────
  { name: "Yoruichi Shihouin", universe: "Bleach", gender: "female", imageUrl: FW("bleach", "6/62/Ep246YoruichiShih%C5%8Din.png/revision/latest/scale-to-width-down/500?cb=20231105202606&path-prefix=en"), ageNote: "Adult" },
  { name: "Rangiku Matsumoto", universe: "Bleach", gender: "female", imageUrl: FW("bleach", "3/32/685Rangiku_profile.png/revision/latest?cb=20200322073312&path-prefix=en"), ageNote: "Adult" },
  { name: "Orihime Inoue", universe: "Bleach", gender: "female", imageUrl: FW("bleach", "9/94/686Post-War_Orihime.png/revision/latest?cb=20190523143321&path-prefix=en"), ageNote: "Adult (18)" },
  { name: "Ichigo Kurosaki", universe: "Bleach", gender: "male", imageUrl: FW("bleach", "4/41/NBFHIchigo_profile.png/revision/latest/scale-to-width-down/377?cb=20230903192540&path-prefix=en"), ageNote: "Adult (18)" },
  { name: "Grimmjow Jaegerjaquez", universe: "Bleach", gender: "male", imageUrl: FW("bleach", "4/4c/Ep398GrimmjowProfile.png/revision/latest/scale-to-width-down/411?cb=20241110032104&path-prefix=en"), ageNote: "Adult" },
  { name: "Rukia Kuchiki", universe: "Bleach", gender: "female", imageUrl: FW("bleach", "2/23/NBFHRukia_profile.png/revision/latest/scale-to-width-down/500?cb=20230903201912&path-prefix=en"), ageNote: "Adult (18)" },
  { name: "Nelliel Tu Odelschwanck", universe: "Bleach", gender: "female", imageUrl: FW("bleach", "a/a3/Ep398NellielProfile.png/revision/latest/scale-to-width-down/411?cb=20241110032104&path-prefix=en"), ageNote: "Adult" },
  { name: "Tier Harribel", universe: "Bleach", gender: "female", imageUrl: FW("bleach", "9/90/339Harribel_profile.png/revision/latest?cb=20201010155518&path-prefix=en"), ageNote: "Adult" },
  { name: "Retsu Unohana", universe: "Bleach", gender: "female", imageUrl: FW("bleach", "e/ea/Ep206UnohanaProfile.png/revision/latest/scale-to-width-down/500?cb=20231105204710&path-prefix=en"), ageNote: "Adult" },

  // ── FAIRY TAIL (4) ─────────────────────────────────────────────────────────
  { name: "Erza Scarlet", universe: "Fairy Tail", gender: "female", imageUrl: FW("fairytail", "c/c3/Erza%27s_picture.png/revision/latest/scale-to-width-down/500?cb=20190929085837"), ageNote: "Adult (19)" },
  { name: "Lucy Heartfilia", universe: "Fairy Tail", gender: "female", imageUrl: FW("fairytail", "9/9c/Lucy_X792_image.png/revision/latest/scale-to-width-down/500?cb=20190106110751"), ageNote: "Adult (18)" },
  { name: "Mirajane Strauss", universe: "Fairy Tail", gender: "female", imageUrl: FW("fairytail", "d/d1/Mirajane_proposal.png/revision/latest/scale-to-width-down/500?cb=20130105145713"), ageNote: "Adult (19)" },
  { name: "Gray Fullbuster", universe: "Fairy Tail", gender: "male", imageUrl: FW("fairytail", "c/c6/Gray_in_Alvarez_Empire_arc.png/revision/latest/scale-to-width-down/500?cb=20190519091455"), ageNote: "Adult (18)" },
  { name: "Juvia Lockser", universe: "Fairy Tail", gender: "female", imageUrl: FW("fairytail", "f/ff/Juvia_Lockser_profile.png/revision/latest/scale-to-width-down/474?cb=20140426102005"), ageNote: "Adult (18)" },
  { name: "Cana Alberona", universe: "Fairy Tail", gender: "female", imageUrl: FW("fairytail", "8/86/Cana_X792.png/revision/latest/scale-to-width-down/500?cb=20190423071457"), ageNote: "Adult (19)" },
  { name: "Natsu Dragneel", universe: "Fairy Tail", gender: "male", imageUrl: FW("fairytail", "c/ca/Natsu_X792.png/revision/latest/scale-to-width-down/500?cb=20181111122101"), ageNote: "Adult (18)" },
  { name: "Laxus Dreyar", universe: "Fairy Tail", gender: "male", imageUrl: FW("fairytail", "d/db/Laxus_profile_image.png/revision/latest?cb=20140614035154"), ageNote: "Adult (23)" },

  // ── HIGH SCHOOL DxD (2) ───────────────────────────────────────────────────
  { name: "Rias Gremory", universe: "High School DxD", gender: "female", imageUrl: FW("highschooldxd", "6/61/Volume_20_-_Rias.jpg/revision/latest/scale-to-width-down/379?cb=20230512014330"), ageNote: "Adult (18+)" },
  { name: "Akeno Himejima", universe: "High School DxD", gender: "female", imageUrl: FW("highschooldxd", "c/ca/AkenoLN.png/revision/latest/scale-to-width-down/389?cb=20250831105719"), ageNote: "Adult (18+)" },

  // ── JUJUTSU KAISEN (3) ────────────────────────────────────────────────────
  { name: "Maki Zenin", universe: "Jujutsu Kaisen", gender: "female", imageUrl: FW("jujutsu-kaisen", "2/2c/Maki_Zen%27in_%28Anime_4%29.png/revision/latest/scale-to-width-down/201?cb=20251230144642"), ageNote: "Adult (28)" },
  { name: "Nobara Kugisaki", universe: "Jujutsu Kaisen", gender: "female", imageUrl: FW("jujutsu-kaisen", "d/dd/Nobara_Kugisaki_%28Anime_2%29.png/revision/latest/scale-to-width-down/250?cb=20240621133809"), ageNote: "Adult (18)" },
  { name: "Gojo Satoru", universe: "Jujutsu Kaisen", gender: "male", imageUrl: FW("jujutsu-kaisen", "e/ef/Satoru_Gojo_%28Anime_2%29.png/revision/latest/scale-to-width-down/153?cb=20250726003655"), ageNote: "Adult (28)" },

  // ── ONE PUNCH MAN (2) ─────────────────────────────────────────────────────
  { name: "Fubuki", universe: "One Punch Man", gender: "female", imageUrl: FW("onepunchman", "0/0d/Fubuki_Manga.png/revision/latest/scale-to-width-down/348?cb=20200216005423"), ageNote: "Adult (23)" },
  { name: "Tatsumaki", universe: "One Punch Man", gender: "female", imageUrl: FW("onepunchman", "d/d2/Tatsumaki_Manga.png/revision/latest/scale-to-width-down/365?cb=20210225062527"), ageNote: "Adult (28)" },

  // ── AKAME GA KILL (3) ─────────────────────────────────────────────────────
  { name: "Akame", universe: "Akame ga Kill", gender: "female", imageUrl: FW("akamegakill", "d/df/Akame_main.png/revision/latest/scale-to-width-down/404?cb=20140824211312"), ageNote: "Adult" },
  { name: "Leone", universe: "Akame ga Kill", gender: "female", imageUrl: FW("akamegakill", "a/af/Leonemainpage.png/revision/latest/scale-to-width-down/409?cb=20170504192046"), ageNote: "Adult" },
  { name: "Esdeath", universe: "Akame ga Kill", gender: "female", imageUrl: FW("akamegakill", "0/0c/Tumblr_ncxciwC4Ky1txrzruo2_r1_500.png/revision/latest/scale-to-width-down/357?cb=20141005160441"), ageNote: "Adult" },

  // ── DEMON SLAYER (6) ──────────────────────────────────────────────────────
  { name: "Mitsuri Kanroji", universe: "Demon Slayer", gender: "female", imageUrl: FW("kimetsu-no-yaiba", "7/74/Mitsuri_anime.png/revision/latest/scale-to-width-down/350?cb=20230614072150"), ageNote: "Adult (19)" },
  { name: "Shinobu Kocho", universe: "Demon Slayer", gender: "female", imageUrl: FW("kimetsu-no-yaiba", "e/e5/Shinobu_anime.png/revision/latest/scale-to-width-down/350?cb=20241010231126"), ageNote: "Adult (18)" },
  { name: "Nezuko Kamado", universe: "Demon Slayer", gender: "female", imageUrl: FW("kimetsu-no-yaiba", "0/0e/Nezuko_anime_right_face.png/revision/latest/scale-to-width-down/298?cb=20241228000758"), ageNote: "Adult (post-timeskip)" },
  { name: "Tanjiro Kamado", universe: "Demon Slayer", gender: "male", imageUrl: FW("kimetsu-no-yaiba", "0/05/Tanjiro_anime_right_face.png/revision/latest/scale-to-width-down/286?cb=20241228000706"), ageNote: "Adult" },
  { name: "Kyojuro Rengoku", universe: "Demon Slayer", gender: "male", imageUrl: FW("kimetsu-no-yaiba", "d/de/Kyojuro_anime_right_face.png/revision/latest/scale-to-width-down/401?cb=20241228001647"), ageNote: "Adult (20)" },
  { name: "Giyu Tomioka", universe: "Demon Slayer", gender: "male", imageUrl: FW("kimetsu-no-yaiba", "4/43/Giyu_anime_design.png/revision/latest/scale-to-width-down/350?cb=20190831073602"), ageNote: "Adult (21)" },

  // ── CHAINSAW MAN (4) ──────────────────────────────────────────────────────
  { name: "Makima", universe: "Chainsaw Man", gender: "female", imageUrl: FW("chainsaw-man", "5/54/Makima_Reze_Arc_anime_design.png/revision/latest/scale-to-width-down/300?cb=20250323073730"), ageNote: "Adult" },
  { name: "Power", universe: "Chainsaw Man", gender: "female", imageUrl: FW("chainsaw-man", "a/ac/Power_anime_design_2.png/revision/latest/scale-to-width-down/300?cb=20231006042039"), ageNote: "Adult" },
  { name: "Reze", universe: "Chainsaw Man", gender: "female", imageUrl: FW("chainsaw-man", "8/8a/Reze_Reze_Arc_anime_design.png/revision/latest/scale-to-width-down/300?cb=20250323073718"), ageNote: "Adult" },
  { name: "Denji", universe: "Chainsaw Man", gender: "male", imageUrl: FW("chainsaw-man", "b/b0/Denji_Reze_Arc_anime_design.png/revision/latest/scale-to-width-down/298?cb=20250324010006"), ageNote: "Adult (18)" },

  // ── SPY X FAMILY (2) ──────────────────────────────────────────────────────
  { name: "Yor Forger", universe: "Spy x Family", gender: "female", imageUrl: FW("spy-x-family9171", "5/53/Yor_Forger_Anime_3.png/revision/latest/scale-to-width-down/400?cb=20211031154658"), ageNote: "Adult (27)" },
  { name: "Loid Forger", universe: "Spy x Family", gender: "male", imageUrl: FW("spy-x-family9171", "c/cd/Loid_Forger_Anime_3.png/revision/latest/scale-to-width-down/240?cb=20211031154403"), ageNote: "Adult" },

  // ── SWORD ART ONLINE (5) ──────────────────────────────────────────────────
  { name: "Asuna", universe: "Sword Art Online", gender: "female", imageUrl: FW("swordartonline", "0/06/Asuna_with_Yui_Biprobe.png/revision/latest/scale-to-width-down/500?cb=20141220180221"), ageNote: "Adult (18)" },
  { name: "Sinon", universe: "Sword Art Online", gender: "female", imageUrl: FW("swordartonline", "9/9c/Shino.png/revision/latest/scale-to-width-down/500?cb=20140722033508"), ageNote: "Adult (18)" },
  { name: "Alice Zuberg", universe: "Sword Art Online", gender: "female", imageUrl: FW("swordartonline", "d/d4/Alice_Synthesis_Thirty.png/revision/latest/scale-to-width-down/500?cb=20190127122239"), ageNote: "Adult" },
  { name: "Leafa", universe: "Sword Art Online", gender: "female", imageUrl: FW("swordartonline", "9/9f/Suguha.png/revision/latest/scale-to-width-down/500?cb=20140813065708"), ageNote: "Adult (18)" },
  { name: "Kirito", universe: "Sword Art Online", gender: "male", imageUrl: FW("swordartonline", "7/7d/Kazuto.png/revision/latest/scale-to-width-down/500?cb=20140228021321"), ageNote: "Adult (18)" },

  // ── BLACK CLOVER (5) ──────────────────────────────────────────────────────
  { name: "Noelle Silva", universe: "Black Clover", gender: "female", imageUrl: FW("blackclover", "0/00/Noelle_after_Heart_Kingdom_training.png/revision/latest/scale-to-width-down/186?cb=20191117231002"), ageNote: "Adult (18)" },
  { name: "Mimosa Vermillion", universe: "Black Clover", gender: "female", imageUrl: FW("blackclover", "c/c2/Mimosa_after_Heart_Kingdom_training.png/revision/latest/scale-to-width-down/228?cb=20191117230857"), ageNote: "Adult (18)" },
  { name: "Charlotte Roselei", universe: "Black Clover", gender: "female", imageUrl: FW("blackclover", "3/36/Charlotte_after_timeskip.png/revision/latest?cb=20210104152628"), ageNote: "Adult" },
  { name: "Asta", universe: "Black Clover", gender: "male", imageUrl: FW("blackclover", "9/98/Asta_profile.png/revision/latest/scale-to-width-down/274?cb=20220731212646"), ageNote: "Adult (18)" },
  { name: "Yuno", universe: "Black Clover", gender: "male", imageUrl: FW("blackclover", "e/eb/Yuno_profile.png/revision/latest/scale-to-width-down/263?cb=20220731212525"), ageNote: "Adult (18)" },

  // ── TOWER OF GOD (3) ──────────────────────────────────────────────────────
  { name: "Yuri Ha Jahad", universe: "Tower of God", gender: "female", imageUrl: FW("towerofgod", "2/29/563_-_Yuri_1.png/revision/latest/scale-to-width-down/195?cb=20230825120033"), ageNote: "Adult" },
  { name: "Endorsi Jahad", universe: "Tower of God", gender: "female", imageUrl: FW("towerofgod", "5/53/567_Androssi_face.png/revision/latest/scale-to-width-down/500?cb=20230713125817"), ageNote: "Adult" },
  { name: "Bam", universe: "Tower of God", gender: "male", imageUrl: FW("towerofgod", "a/a8/Baam_sprout_arc.jpg/revision/latest/scale-to-width-down/244?cb=20260208080816"), ageNote: "Adult" },

  // ── PERSONA 5 (8) ─────────────────────────────────────────────────────────
  { name: "Makoto Niijima", universe: "Persona 5", gender: "female", imageUrl: FW("megamitensei", "0/04/Makoto_Nijima.png/revision/latest/scale-to-width-down/153?cb=20230428014332"), ageNote: "Adult (18)" },
  { name: "Ann Takamaki", universe: "Persona 5", gender: "female", imageUrl: FW("megamitensei", "b/be/An_takamaki.png/revision/latest/scale-to-width-down/183?cb=20170426203909"), ageNote: "Adult (18)" },
  { name: "Haru Okumura", universe: "Persona 5", gender: "female", imageUrl: FW("megamitensei", "7/77/P5_Haru_Okumura.png/revision/latest/scale-to-width-down/120?cb=20240307215250"), ageNote: "Adult (18)" },
  { name: "Futaba Sakura", universe: "Persona 5", gender: "female", imageUrl: FW("megamitensei", "6/62/Futaba_Sakura.png/revision/latest/scale-to-width-down/196?cb=20230219085927"), ageNote: "Adult (18)" },
  { name: "Sumire Yoshizawa", universe: "Persona 5", gender: "female", imageUrl: FW("megamitensei", "a/ab/Kasumi_Yoshizawa.png/revision/latest/scale-to-width-down/146?cb=20230607090728"), ageNote: "Adult (18)" },
  { name: "Joker", universe: "Persona 5", gender: "male", imageUrl: FW("megamitensei", "6/63/Persona_5_Hero.png/revision/latest/scale-to-width-down/211?cb=20240407105006"), ageNote: "Adult (18)" },
  { name: "Ryuji Sakamoto", universe: "Persona 5", gender: "male", imageUrl: FW("megamitensei", "b/bc/Ryuji_Sakamoto.png/revision/latest/scale-to-width-down/186?cb=20240806005553"), ageNote: "Adult (18)" },
  { name: "Goro Akechi", universe: "Persona 5", gender: "male", imageUrl: FW("megamitensei", "1/15/Gor%C5%8D_Akechi.png/revision/latest/scale-to-width-down/146?cb=20230603111738"), ageNote: "Adult (18)" },

  // ── FINAL FANTASY (10) ────────────────────────────────────────────────────
  { name: "Tifa Lockhart", universe: "Final Fantasy", gender: "female", imageUrl: FW("finalfantasy", "2/21/Tifa_Lockhart_from_FFVII_Rebirth_promo_render.png/revision/latest/scale-to-width-down/167?cb=20240304073043"), ageNote: "Adult (20)" },
  { name: "Aerith Gainsborough", universe: "Final Fantasy", gender: "female", imageUrl: FW("finalfantasy", "1/1f/Aerith_Gainsborough_from_FFVII_Rebirth_promo_render.png/revision/latest/scale-to-width-down/354?cb=20240304072103"), ageNote: "Adult (22)" },
  { name: "Lightning", universe: "Final Fantasy", gender: "female", imageUrl: FW("finalfantasy", "c/c6/FFXIII-Lightning_CG.png/revision/latest/scale-to-width-down/213?cb=20150918214724"), ageNote: "Adult (21)" },
  { name: "Yuna", universe: "Final Fantasy", gender: "female", imageUrl: FW("finalfantasy", "f/f9/FFX_Artwork_Yuna.png/revision/latest/scale-to-width-down/191?cb=20141023193639"), ageNote: "Adult (19)" },
  { name: "Lulu", universe: "Final Fantasy", gender: "female", imageUrl: FW("finalfantasy", "5/5b/FFX_Lulu_Art.png/revision/latest/scale-to-width-down/281?cb=20140809031913"), ageNote: "Adult (22)" },
  { name: "Rinoa Heartilly", universe: "Final Fantasy", gender: "female", imageUrl: FW("finalfantasy", "0/09/Ff8-rinoa.jpg/revision/latest/scale-to-width-down/344?cb=20100603174143"), ageNote: "Adult" },
  { name: "Cloud Strife", universe: "Final Fantasy", gender: "male", imageUrl: FW("finalfantasy", "e/ec/Cloud_Strife_from_FFVII_Rebirth_promo_render.png/revision/latest/scale-to-width-down/209?cb=20251015150343"), ageNote: "Adult (21)" },
  { name: "Noctis Lucis Caelum", universe: "Final Fantasy", gender: "male", imageUrl: FW("finalfantasy", "4/4a/FFXV_Noctis.png/revision/latest/scale-to-width-down/174?cb=20160818232513"), ageNote: "Adult (20)" },
  { name: "Sephiroth", universe: "Final Fantasy", gender: "male", imageUrl: FW("finalfantasy", "a/af/Sephiroth_from_FFVII_Rebirth_promo_render.png/revision/latest/scale-to-width-down/299?cb=20231231113824"), ageNote: "Adult" },
  { name: "Squall Leonhart", universe: "Final Fantasy", gender: "male", imageUrl: FW("finalfantasy", "d/d2/Ff8-squall.jpg/revision/latest/scale-to-width-down/403?cb=20100603174959"), ageNote: "Adult" },

  // ── FATE SERIES (6) ───────────────────────────────────────────────────────
  { name: "Artoria Pendragon", universe: "Fate", gender: "female", imageUrl: FW("typemoon", "8/88/Saber_2.png/revision/latest/scale-to-width-down/262?cb=20110320010239"), ageNote: "Adult" },
  { name: "Rin Tohsaka", universe: "Fate", gender: "female", imageUrl: FW("typemoon", "e/e1/Tohsaka_rin.png/revision/latest/scale-to-width-down/238?cb=20141028223858"), ageNote: "Adult (18)" },
  { name: "Sakura Matou", universe: "Fate", gender: "female", imageUrl: FW("typemoon", "c/cc/Matou_sakura.png/revision/latest/scale-to-width-down/242?cb=20141017160439"), ageNote: "Adult (18)" },
  { name: "Mordred", universe: "Fate", gender: "female", imageUrl: FW("typemoon", "6/6c/Saber_of_red_armour2.png/revision/latest/scale-to-width-down/292?cb=20150904081235"), ageNote: "Adult" },
  { name: "Scathach", universe: "Fate", gender: "female", imageUrl: FW("typemoon", "b/b1/FGOLancerScathStage1.png/revision/latest/scale-to-width-down/353?cb=20151210083513"), ageNote: "Adult (ancient warrior)" },
  { name: "Gilgamesh", universe: "Fate", gender: "male", imageUrl: FW("typemoon", "6/63/Gilfull.png/revision/latest/scale-to-width-down/218?cb=20130523232436"), ageNote: "Adult" },

  // ── GENSHIN IMPACT (16) ───────────────────────────────────────────────────
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
  { name: "Alhaitham", universe: "Genshin Impact", gender: "male", imageUrl: GI("Alhatham"), ageNote: "Adult" },
  { name: "Wriothesley", universe: "Genshin Impact", gender: "male", imageUrl: GIE("Wriothesley"), ageNote: "Adult" },
  { name: "Neuvillette", universe: "Genshin Impact", gender: "male", imageUrl: GIE("Neuvillette"), ageNote: "Adult (ancient hydro dragon)" },

  // ── HONKAI IMPACT 3rd (3) ─────────────────────────────────────────────────
  { name: "Kiana Kaslana", universe: "Honkai Impact 3rd", gender: "female", imageUrl: FW("honkaiimpact3_gamepedia_en", "f/f7/White_Comet_%28Thumbnail%29.png/revision/latest?cb=20240211115031"), ageNote: "Adult (18)" },
  { name: "Elysia", universe: "Honkai Impact 3rd", gender: "female", imageUrl: FW("honkaiimpact3_gamepedia_en", "7/72/Miss_Pink_Elf%E2%99%AA_%28Thumbnail%29.png/revision/latest?cb=20240211091457"), ageNote: "Adult" },
  { name: "Bronya Zaychik", universe: "Honkai Impact 3rd", gender: "female", imageUrl: FW("honkaiimpact3_gamepedia_en", "2/24/Valkyrie_Chariot_%28Thumbnail%29.png/revision/latest?cb=20240211112204"), ageNote: "Adult" },

  // ── HONKAI: STAR RAIL (12) ────────────────────────────────────────────────
  { name: "Kafka", universe: "Honkai: Star Rail", gender: "female", imageUrl: HSR_ID(1005), ageNote: "Adult" },
  { name: "Acheron", universe: "Honkai: Star Rail", gender: "female", imageUrl: HSR_ID(1308), ageNote: "Adult" },
  { name: "Jade", universe: "Honkai: Star Rail", gender: "female", imageUrl: HSR_ID(1314), ageNote: "Adult" },
  { name: "Himeko", universe: "Honkai: Star Rail", gender: "female", imageUrl: HSR_ID(1003), ageNote: "Adult" },
  { name: "Bronya (Star Rail)", universe: "Honkai: Star Rail", gender: "female", imageUrl: HSR_ID(1101), ageNote: "Adult" },
  { name: "Pela", universe: "Honkai: Star Rail", gender: "female", imageUrl: HSR_ID(1106), ageNote: "Adult" },
  { name: "Serval", universe: "Honkai: Star Rail", gender: "female", imageUrl: HSR_ID(1103), ageNote: "Adult" },
  { name: "Topaz", universe: "Honkai: Star Rail", gender: "female", imageUrl: HSR_ID(1112), ageNote: "Adult" },
  { name: "Robin", universe: "Honkai: Star Rail", gender: "female", imageUrl: HSR_ID(1309), ageNote: "Adult" },
  { name: "Sparkle", universe: "Honkai: Star Rail", gender: "female", imageUrl: HSR_ID(1306), ageNote: "Adult" },
  { name: "Aventurine", universe: "Honkai: Star Rail", gender: "male", imageUrl: HSR_ID(1304), ageNote: "Adult" },
  { name: "Blade", universe: "Honkai: Star Rail", gender: "male", imageUrl: HSR_ID(1205), ageNote: "Adult" },

  // ── AZUR LANE (11) ────────────────────────────────────────────────────────
  { name: "Enterprise", universe: "Azur Lane", gender: "female", imageUrl: FW("azur-lane", "a/af/Enterprise_intro.png/revision/latest/scale-to-width-down/500?cb=20230811183854"), ageNote: "Adult ship girl" },
  { name: "Belfast", universe: "Azur Lane", gender: "female", imageUrl: FW("azur-lane", "d/d1/Belfast_intro.png/revision/latest/scale-to-width-down/500?cb=20230811183812"), ageNote: "Adult ship girl" },
  { name: "Illustrious", universe: "Azur Lane", gender: "female", imageUrl: FW("azur-lane", "e/e6/Illustrious_intro.png/revision/latest/scale-to-width-down/500?cb=20230811183915"), ageNote: "Adult ship girl" },
  { name: "Atago", universe: "Azur Lane", gender: "female", imageUrl: FW("azur-lane", "e/ed/Atago_intro.png/revision/latest/scale-to-width-down/460?cb=20230811184307"), ageNote: "Adult ship girl" },
  { name: "Takao", universe: "Azur Lane", gender: "female", imageUrl: FW("azur-lane", "9/98/Takao_intro.png/revision/latest/scale-to-width-down/500?cb=20230811184355"), ageNote: "Adult ship girl" },
  { name: "Bismarck", universe: "Azur Lane", gender: "female", imageUrl: FW("azur-lane", "0/0e/Bismarck_intro.png/revision/latest/scale-to-width-down/500?cb=20230811183936"), ageNote: "Adult ship girl" },
  { name: "Akagi", universe: "Azur Lane", gender: "female", imageUrl: FW("azur-lane", "b/b0/Akagi.jpg/revision/latest/scale-to-width-down/500?cb=20230811184200"), ageNote: "Adult ship girl" },
  { name: "Kaga", universe: "Azur Lane", gender: "female", imageUrl: FW("azur-lane", "6/6c/Kaga_intro.png/revision/latest/scale-to-width-down/500?cb=20230811184444"), ageNote: "Adult ship girl" },
  { name: "Hood", universe: "Azur Lane", gender: "female", imageUrl: FW("azur-lane", "8/84/Hood_intro.png/revision/latest/scale-to-width-down/500?cb=20191219144856"), ageNote: "Adult ship girl" },
  { name: "Prinz Eugen", universe: "Azur Lane", gender: "female", imageUrl: FW("azur-lane", "0/00/Prinz_eugen_intro.png/revision/latest/scale-to-width-down/500?cb=20230811184248"), ageNote: "Adult ship girl" },
  { name: "Formidable", universe: "Azur Lane", gender: "female", imageUrl: FW("azurlane", "8/8a/Formidable_Intro.png/revision/latest/scale-to-width-down/500?cb=20200130121213"), ageNote: "Adult ship girl" },

  // ── GIRLS FRONTLINE (13) ──────────────────────────────────────────────────
  { name: "HK416", universe: "Girls Frontline", gender: "female", imageUrl: FW("girlsfrontline", "2/2f/Clukay_default.png/revision/latest/scale-to-width-down/500?cb=20230419184239"), ageNote: "Adult T-Doll" },
  { name: "M4A1", universe: "Girls Frontline", gender: "female", imageUrl: FW("girlsfrontline", "1/18/M4a1_norm.png/revision/latest/scale-to-width-down/388?cb=20160911061100"), ageNote: "Adult T-Doll" },
  { name: "M16A1", universe: "Girls Frontline", gender: "female", imageUrl: FW("girlsfrontline", "a/a4/M16a1_norm.png/revision/latest/scale-to-width-down/388?cb=20160911044620"), ageNote: "Adult T-Doll" },
  { name: "UMP45", universe: "Girls Frontline", gender: "female", imageUrl: FW("girlsfrontline", "b/b8/Ump45_norm.png/revision/latest/scale-to-width-down/318?cb=20160915152027"), ageNote: "Adult T-Doll" },
  { name: "UMP9", universe: "Girls Frontline", gender: "female", imageUrl: FW("girlsfrontline", "c/ce/UMP9_norm.png/revision/latest/scale-to-width-down/500?cb=20160916135730"), ageNote: "Adult T-Doll" },
  { name: "G11", universe: "Girls Frontline", gender: "female", imageUrl: FW("girlsfrontline", "f/f9/G11_norm.png/revision/latest/scale-to-width-down/348?cb=20160921132259"), ageNote: "Adult T-Doll" },
  { name: "WA2000", universe: "Girls Frontline", gender: "female", imageUrl: FW("girlsfrontline", "8/80/Wa2000_norm.png/revision/latest?cb=20160911023020"), ageNote: "Adult T-Doll" },
  { name: "Springfield", universe: "Girls Frontline", gender: "female", imageUrl: FW("girlsfrontline", "7/7a/Springfield_norm.png/revision/latest/scale-to-width-down/388?cb=20160910091259"), ageNote: "Adult T-Doll" },
  { name: "Vector", universe: "Girls Frontline", gender: "female", imageUrl: FW("girlsfrontline", "0/07/Vector_norm.png/revision/latest/scale-to-width-down/500?cb=20160909031226"), ageNote: "Adult T-Doll" },
  { name: "Grizzly MkV", universe: "Girls Frontline", gender: "female", imageUrl: FW("girlsfrontline", "8/80/Grizzlymkv_norm.png/revision/latest?cb=20160919130332"), ageNote: "Adult T-Doll" },
  { name: "Kar98k", universe: "Girls Frontline", gender: "female", imageUrl: FW("girlsfrontline", "1/18/98K.png/revision/latest/scale-to-width-down/375?cb=20200118153900"), ageNote: "Adult T-Doll" },
  { name: "Suomi KP31", universe: "Girls Frontline", gender: "female", imageUrl: FW("girlsfrontline", "7/7a/Suomikp31_norm.png/revision/latest/scale-to-width-down/459?cb=20160917090251"), ageNote: "Adult T-Doll" },
  { name: "SOPMOD II", universe: "Girls Frontline", gender: "female", imageUrl: FW("girlsfrontline", "a/af/M4_sopmodii_norm.png/revision/latest/scale-to-width-down/388?cb=20160911080429"), ageNote: "Adult T-Doll" },

  // ── EPIC SEVEN (10) ───────────────────────────────────────────────────────
  { name: "Cerise", universe: "Epic Seven", gender: "female", imageUrl: FW("epic-seven", "e/ed/Cerise_Profile.png/revision/latest/scale-to-width-down/500?cb=20200521213753"), ageNote: "Adult" },
  { name: "Bellona", universe: "Epic Seven", gender: "female", imageUrl: FW("epic-seven", "5/52/Bellona_Moune_Profile.png/revision/latest?cb=20190831154724"), ageNote: "Adult" },
  { name: "Yufine", universe: "Epic Seven", gender: "female", imageUrl: FW("epic-seven", "9/94/Yufine_Profile.png/revision/latest?cb=20190831155113"), ageNote: "Adult dragon-girl" },
  { name: "Specter Tenebria", universe: "Epic Seven", gender: "female", imageUrl: FW("epic-seven", "d/dc/Specter_Tenebria_Profile.png/revision/latest?cb=20190831161228"), ageNote: "Adult" },
  { name: "Celine", universe: "Epic Seven", gender: "female", imageUrl: FW("epic-seven", "2/26/Celine_Profile.png/revision/latest/scale-to-width-down/500?cb=20200618141917"), ageNote: "Adult" },
  { name: "Charlotte", universe: "Epic Seven", gender: "female", imageUrl: FW("epic-seven", "7/7c/Charlotte_of_La_Mare_Profile.png/revision/latest?cb=20190831153024"), ageNote: "Adult" },
  { name: "Roana", universe: "Epic Seven", gender: "female", imageUrl: FW("epic-seven", "e/ec/Roana_Profile.png/revision/latest/scale-to-width-down/500?cb=20200522114702"), ageNote: "Adult" },
  { name: "Ruele of Light", universe: "Epic Seven", gender: "female", imageUrl: FW("epic-seven", "4/4c/Ruele_of_Light_su.png/revision/latest?cb=20260324072211"), ageNote: "Adult" },
  { name: "Arbiter Vildred", universe: "Epic Seven", gender: "male", imageUrl: FW("epic-seven", "8/83/Arbiter_Vildred_Profile.png/revision/latest?cb=20190831160510"), ageNote: "Adult" },
  { name: "Fallen Cecilia", universe: "Epic Seven", gender: "female", imageUrl: FW("epic-seven", "9/99/Fallen_Cecilia_Profile.png/revision/latest?cb=20190831155634"), ageNote: "Adult" },

  // ── SOLO LEVELING (4) ─────────────────────────────────────────────────────
  { name: "Cha Hae-In", universe: "Solo Leveling", gender: "female", imageUrl: FW("solo-leveling", "9/91/Cha_Hae-In.png/revision/latest/scale-to-width-down/313?cb=20240119133508"), ageNote: "Adult (24)" },
  { name: "Sung Jinwoo", universe: "Solo Leveling", gender: "male", imageUrl: FW("solo-leveling", "8/8b/Jinwoo4.jpg/revision/latest/scale-to-width-down/393?cb=20250411080707"), ageNote: "Adult (24)" },
  { name: "Woo Jinchul", universe: "Solo Leveling", gender: "male", imageUrl: FW("solo-leveling", "5/56/Jinchul23.jpg/revision/latest/scale-to-width-down/367?cb=20240129235659"), ageNote: "Adult" },
  { name: "Thomas Andre", universe: "Solo Leveling", gender: "male", imageUrl: FW("solo-leveling", "2/23/Andre1.jpg/revision/latest/scale-to-width-down/376?cb=20211103151323"), ageNote: "Adult" },

  // ── GAME OF THRONES (3) ───────────────────────────────────────────────────
  { name: "Daenerys Targaryen", universe: "Game of Thrones", gender: "female", imageUrl: FW("gameofthrones", "4/4f/Daenerys_Season_8.jpg/revision/latest/scale-to-width-down/301?cb=20190415212013"), ageNote: "Adult" },
  { name: "Cersei Lannister", universe: "Game of Thrones", gender: "female", imageUrl: FW("gameofthrones", "b/b0/CERSEIBATTLEOFKINGSLANDING.PNG/revision/latest/scale-to-width-down/338?cb=20190906021534"), ageNote: "Adult" },
  { name: "Jon Snow", universe: "Game of Thrones", gender: "male", imageUrl: FW("gameofthrones", "d/d0/JonSnow8x06.PNG/revision/latest?cb=20190714094440"), ageNote: "Adult" },

  // ── THE WITCHER (3) ───────────────────────────────────────────────────────
  { name: "Yennefer of Vengerberg", universe: "The Witcher", gender: "female", imageUrl: FW("witcher", "f/f0/The_Witcher_3_Wild_Hunt-Yennefer_of_Vengerberg.png/revision/latest/scale-to-width-down/179?cb=20160326134030"), ageNote: "Adult (100+ years old)" },
  { name: "Triss Merigold", universe: "The Witcher", gender: "female", imageUrl: FW("witcher", "2/27/Triss-TW3-new-render.png/revision/latest/scale-to-width-down/313?cb=20160402173701"), ageNote: "Adult" },
  { name: "Geralt of Rivia", universe: "The Witcher", gender: "male", imageUrl: FW("witcher", "5/51/Netflix_geralt_shirt.jpg/revision/latest/scale-to-width-down/410?cb=20191228182240"), ageNote: "Adult" },

  // ── SOUL LAND (3) ─────────────────────────────────────────────────────────
  { name: "Xiao Wu", universe: "Soul Land", gender: "female", imageUrl: FW("soulland", "3/34/Xiao_wu_god.jpg/revision/latest/scale-to-width-down/281?cb=20230713090901"), ageNote: "Adult" },
  { name: "Bibi Dong", universe: "Soul Land", gender: "female", imageUrl: FW("soulland", "5/51/%E6%AF%94%E6%AF%94%E4%B8%9C.png/revision/latest/scale-to-width-down/500?cb=20210425192931"), ageNote: "Adult" },
  { name: "Tang San", universe: "Soul Land", gender: "male", imageUrl: FW("soulland", "5/5a/TS_God_Duo_Coexistence.jpeg/revision/latest/scale-to-width-down/348?cb=20240622031506"), ageNote: "Adult" },

  // ── FIRE EMBLEM (12) ──────────────────────────────────────────────────────
  { name: "Edelgard von Hresvelg", universe: "Fire Emblem", gender: "female", imageUrl: FW("fireemblem", "7/7b/Artwork_Edelgard.png/revision/latest/scale-to-width-down/366?cb=20201220085222"), ageNote: "Adult (18+)" },
  { name: "Byleth", universe: "Fire Emblem", gender: "male", imageUrl: FW("fireemblem", "b/bc/Artwork_Byleth_M.png/revision/latest/scale-to-width-down/500?cb=20201220085213"), ageNote: "Adult" },
  { name: "Camilla", universe: "Fire Emblem", gender: "female", imageUrl: FW("fireemblem", "9/96/Camilla_art.png/revision/latest/scale-to-width-down/284?cb=20240903035612"), ageNote: "Adult" },
  { name: "Tharja", universe: "Fire Emblem", gender: "female", imageUrl: FW("fireemblem", "6/68/Tharja_FE13_Artwork.png/revision/latest/scale-to-width-down/229?cb=20190810134754"), ageNote: "Adult" },
  { name: "Aversa", universe: "Fire Emblem", gender: "female", imageUrl: FW("fireemblem", "5/59/Aversa_%28FE13_Artwork%29.png/revision/latest/scale-to-width-down/294?cb=20170305062950"), ageNote: "Adult" },
  { name: "Dorothea", universe: "Fire Emblem", gender: "female", imageUrl: FW("fireemblem", "f/ff/3H_Dorothea_Artwork.png/revision/latest/scale-to-width-down/293?cb=20210526001639"), ageNote: "Adult (18+)" },
  { name: "Rhea", universe: "Fire Emblem", gender: "female", imageUrl: FW("fireemblem", "b/b9/3H_Rhea_Artwork.png/revision/latest/scale-to-width-down/294?cb=20210525204902"), ageNote: "Adult (ancient)" },
  { name: "Lysithea von Ordelia", universe: "Fire Emblem", gender: "female", imageUrl: FW("fireemblem", "d/d5/Lysithea_Heroes.png/revision/latest/scale-to-width-down/417?cb=20200305141046"), ageNote: "Adult (18)" },
  { name: "Marianne von Edmund", universe: "Fire Emblem", gender: "female", imageUrl: FW("fireemblem", "0/06/Marianne_Heroes.png/revision/latest/scale-to-width-down/417?cb=20210304054624"), ageNote: "Adult (18)" },
  { name: "Dimitri Alexandre Blaiddyd", universe: "Fire Emblem", gender: "male", imageUrl: FW("fireemblem", "1/18/Artwork_Dimitri.png/revision/latest/scale-to-width-down/500?cb=20201220085839"), ageNote: "Adult (21)" },
  { name: "Claude von Riegan", universe: "Fire Emblem", gender: "male", imageUrl: FW("fireemblem", "b/ba/Artwork_Claude.png/revision/latest/scale-to-width-down/222?cb=20201220085923"), ageNote: "Adult (21)" },
  { name: "Felix Hugo Fraldarius", universe: "Fire Emblem", gender: "male", imageUrl: FW("fireemblem", "7/7b/Felix_Heroes.png/revision/latest/scale-to-width-down/417?cb=20230417045800"), ageNote: "Adult (20)" },

  // ── LEAGUE OF LEGENDS (14) ────────────────────────────────────────────────
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

  // ── OVERWATCH (10) ────────────────────────────────────────────────────────
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

  // ── SMITE (12) ────────────────────────────────────────────────────────────
  { name: "Aphrodite", universe: "Smite", gender: "female", imageUrl: FW("smite_gamepedia", "f/fc/T_Aphrodite_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20141115065249"), ageNote: "Adult goddess" },
  { name: "Freya", universe: "Smite", gender: "female", imageUrl: FW("smite_gamepedia", "5/58/T_Freya_Remodel_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20160713224926"), ageNote: "Adult goddess" },
  { name: "Nox", universe: "Smite", gender: "female", imageUrl: FW("smite_gamepedia", "1/17/T_Nox_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20141025053432"), ageNote: "Adult goddess" },
  { name: "Serqet", universe: "Smite", gender: "female", imageUrl: FW("smite_gamepedia", "9/91/T_Serqet_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20140712121140"), ageNote: "Adult goddess" },
  { name: "Bellona (Smite)", universe: "Smite", gender: "female", imageUrl: FW("smite_gamepedia", "2/2c/T_Bellona_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20150219020936"), ageNote: "Adult goddess" },
  { name: "Nu Wa", universe: "Smite", gender: "female", imageUrl: FW("smite_gamepedia", "4/42/T_NuWa_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20140802122235"), ageNote: "Adult goddess" },
  { name: "Bastet", universe: "Smite", gender: "female", imageUrl: FW("smite_gamepedia", "f/f9/T_Bastet_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20140402111122"), ageNote: "Adult goddess" },
  { name: "Discordia", universe: "Smite", gender: "female", imageUrl: FW("smite_gamepedia", "0/0a/T_Discordia_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20171106214932"), ageNote: "Adult goddess" },
  { name: "Thor (Smite)", universe: "Smite", gender: "male", imageUrl: FW("smite_gamepedia", "8/81/T_Thor_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20130807123304"), ageNote: "Adult god" },
  { name: "Loki (Smite)", universe: "Smite", gender: "male", imageUrl: FW("smite_gamepedia", "e/e3/T_Loki_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20150721135616"), ageNote: "Adult god" },
  { name: "Hercules", universe: "Smite", gender: "male", imageUrl: FW("smite_gamepedia", "f/f3/T_Hercules_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20140611104244"), ageNote: "Adult god" },
  { name: "Poseidon", universe: "Smite", gender: "male", imageUrl: FW("smite_gamepedia", "c/ca/T_Poseidon_Default_Card.png/revision/latest/scale-to-width-down/379?cb=20170327235405"), ageNote: "Adult god" },

  // ── ARKNIGHTS (12) ────────────────────────────────────────────────────────
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
  { name: "Blaze", universe: "Arknights", gender: "female", imageUrl: AK("char_017_huang_2"), ageNote: "Adult" },

  // ── ZENLESS ZONE ZERO (12) ────────────────────────────────────────────────
  { name: "Nicole Demara", universe: "Zenless Zone Zero", gender: "female", imageUrl: FW("zenless-zone-zero", "7/7a/Agent_Nicole_Demara_Portrait.png/revision/latest/scale-to-width-down/283?cb=20240707011646"), ageNote: "Adult" },
  { name: "Zhu Yuan", universe: "Zenless Zone Zero", gender: "female", imageUrl: FW("zenless-zone-zero", "0/07/Agent_Zhu_Yuan_Portrait.png/revision/latest/scale-to-width-down/221?cb=20240708205906"), ageNote: "Adult" },
  { name: "Ellen Joe", universe: "Zenless Zone Zero", gender: "female", imageUrl: FW("zenless-zone-zero", "e/e3/Agent_Ellen_Joe_Portrait.png/revision/latest/scale-to-width-down/425?cb=20241007222138"), ageNote: "Adult" },
  { name: "Rina", universe: "Zenless Zone Zero", gender: "female", imageUrl: FW("zenless-zone-zero", "4/40/Agent_Alexandrina_Sebastiane_Portrait.png/revision/latest/scale-to-width-down/384?cb=20240707002357"), ageNote: "Adult" },
  { name: "Grace Howard", universe: "Zenless Zone Zero", gender: "female", imageUrl: FW("zenless-zone-zero", "9/9a/Agent_Grace_Howard_Portrait.png/revision/latest/scale-to-width-down/194?cb=20240707002436"), ageNote: "Adult" },
  { name: "Koleda", universe: "Zenless Zone Zero", gender: "female", imageUrl: FW("zenless-zone-zero", "d/d6/Agent_Koleda_Belobog_Portrait.png/revision/latest/scale-to-width-down/430?cb=20240706234545"), ageNote: "Adult" },
  { name: "Miyabi", universe: "Zenless Zone Zero", gender: "female", imageUrl: FW("zenless-zone-zero", "d/da/Agent_Hoshimi_Miyabi_Portrait.png/revision/latest/scale-to-width-down/317?cb=20250329051641"), ageNote: "Adult" },
  { name: "Yanagi", universe: "Zenless Zone Zero", gender: "female", imageUrl: FW("zenless-zone-zero", "c/cb/Agent_Tsukishiro_Yanagi_Portrait.png/revision/latest/scale-to-width-down/352?cb=20241106030347"), ageNote: "Adult" },
  { name: "Burnice", universe: "Zenless Zone Zero", gender: "female", imageUrl: FW("zenless-zone-zero", "d/d1/Agent_Burnice_White_Portrait.png/revision/latest/scale-to-width-down/324?cb=20241016140944"), ageNote: "Adult" },
  { name: "Piper Wheel", universe: "Zenless Zone Zero", gender: "female", imageUrl: FW("zenless-zone-zero", "a/a9/Agent_Piper_Wheel_Portrait.png/revision/latest/scale-to-width-down/241?cb=20240707002233"), ageNote: "Adult (18+)" },
  { name: "Billy Kid", universe: "Zenless Zone Zero", gender: "male", imageUrl: FW("zenless-zone-zero", "d/dc/Agent_Billy_Kid_Portrait.png/revision/latest/scale-to-width-down/313?cb=20240707002211"), ageNote: "Adult" },
  { name: "Soldier 11", universe: "Zenless Zone Zero", gender: "female", imageUrl: FW("zenless-zone-zero", "3/36/Agent_Soldier_11_Portrait.png/revision/latest/scale-to-width-down/230?cb=20240713020308"), ageNote: "Adult" },

  // ── NIKKE (12) ────────────────────────────────────────────────────────────
  { name: "Rapi", universe: "NIKKE", gender: "female", imageUrl: FW("nikke-goddess-of-victory-international", "8/82/Rapi_MI.png/revision/latest?cb=20231123043651"), ageNote: "Adult android" },
  { name: "Anis", universe: "NIKKE", gender: "female", imageUrl: FW("nikke-goddess-of-victory-international", "b/bc/Anis_MI.png/revision/latest?cb=20231123052306"), ageNote: "Adult android" },
  { name: "Neon", universe: "NIKKE", gender: "female", imageUrl: FW("nikke-goddess-of-victory-international", "1/14/Neon_MI.png/revision/latest/scale-to-width-down/252?cb=20231123052411"), ageNote: "Adult android" },
  { name: "Modernia", universe: "NIKKE", gender: "female", imageUrl: FW("nikke-goddess-of-victory-international", "8/80/Modernia_MI.png/revision/latest?cb=20231123052408"), ageNote: "Adult android" },
  { name: "Scarlet (NIKKE)", universe: "NIKKE", gender: "female", imageUrl: FW("nikke-goddess-of-victory-international", "4/45/Scarlet_MI.png/revision/latest/scale-to-width-down/250?cb=20231123052441"), ageNote: "Adult android" },
  { name: "Alice", universe: "NIKKE", gender: "female", imageUrl: FW("nikke-goddess-of-victory-international", "c/ce/Alice_MI.png/revision/latest/scale-to-width-down/254?cb=20231123052304"), ageNote: "Adult android" },
  { name: "Noise", universe: "NIKKE", gender: "female", imageUrl: FW("nikke-goddess-of-victory-international", "b/b9/Noise_MI.png/revision/latest/scale-to-width-down/254?cb=20231123052417"), ageNote: "Adult android" },
  { name: "Privaty", universe: "NIKKE", gender: "female", imageUrl: FW("nikke-goddess-of-victory-international", "e/e8/Privaty_MI.png/revision/latest?cb=20231123052426"), ageNote: "Adult android" },
  { name: "Rupee", universe: "NIKKE", gender: "female", imageUrl: FW("nikke-goddess-of-victory-international", "a/a1/Rupee_MI.png/revision/latest/scale-to-width-down/250?cb=20231123052438"), ageNote: "Adult android" },
  { name: "Sin", universe: "NIKKE", gender: "female", imageUrl: FW("nikke-goddess-of-victory-international", "4/48/Sin_MI.png/revision/latest/scale-to-width-down/250?cb=20231123052444"), ageNote: "Adult android" },
  { name: "Yulha", universe: "NIKKE", gender: "female", imageUrl: FW("nikke-goddess-of-victory-international", "2/2b/Yulha_MI.png/revision/latest?cb=20231123052459"), ageNote: "Adult android" },
  { name: "Quency", universe: "NIKKE", gender: "female", imageUrl: FW("nikke-goddess-of-victory-international", "5/5a/Quency_MI.png/revision/latest/scale-to-width-down/250?cb=20231123052430"), ageNote: "Adult android" },

  // ── AFK JOURNEY (8) ──────────────────────────────────────────────────────
  { name: "Temesia", universe: "AFK Journey", gender: "female", imageUrl: FW("afk-journey", "c/c6/Temesia.png/revision/latest/scale-to-width-down/433?cb=20251130210520"), ageNote: "Adult" },
  { name: "Marilee", universe: "AFK Journey", gender: "female", imageUrl: FW("afk-journey", "c/c8/Marilee.png/revision/latest/scale-to-width-down/500?cb=20240410062820"), ageNote: "Adult" },
  { name: "Cecia", universe: "AFK Journey", gender: "female", imageUrl: FW("afk-journey", "d/d5/Cecia.png/revision/latest/scale-to-width-down/398?cb=20251227163719"), ageNote: "Adult" },
  { name: "Eironn", universe: "AFK Journey", gender: "male", imageUrl: FW("afk-journey", "6/69/Eironn.png/revision/latest/scale-to-width-down/500?cb=20240401124826"), ageNote: "Adult" },
  { name: "Lucius", universe: "AFK Journey", gender: "male", imageUrl: FW("afk-journey", "5/5d/Lucius.png/revision/latest/scale-to-width-down/389?cb=20251205000322"), ageNote: "Adult" },
  { name: "Odie", universe: "AFK Journey", gender: "male", imageUrl: FW("afk-journey", "2/2e/Odie.png/revision/latest/scale-to-width-down/375?cb=20240320152553"), ageNote: "Adult" },
  { name: "Vala", universe: "AFK Journey", gender: "female", imageUrl: FW("afk-journey", "6/6a/Vala.png/revision/latest/scale-to-width-down/299?cb=20251205000455"), ageNote: "Adult" },
  { name: "Sinbad", universe: "AFK Journey", gender: "male", imageUrl: FW("afk-journey", "3/35/Sinbad.png/revision/latest/scale-to-width-down/201?cb=20251205000847"), ageNote: "Adult" },

  // ── WUTHERING WAVES (16) ──────────────────────────────────────────────────
  { name: "Yinlin", universe: "Wuthering Waves", gender: "female", imageUrl: FW("wutheringwaves", "3/33/Yinlin_Card.jpg/revision/latest/scale-to-width-down/283?cb=20241007222006"), ageNote: "Adult" },
  { name: "Jianxin", universe: "Wuthering Waves", gender: "female", imageUrl: FW("wutheringwaves", "8/8a/Jianxin_Card.jpg/revision/latest/scale-to-width-down/281?cb=20240206132017"), ageNote: "Adult" },
  { name: "Changli", universe: "Wuthering Waves", gender: "female", imageUrl: FW("wutheringwaves", "e/e9/Changli_Card.png/revision/latest/scale-to-width-down/281?cb=20240719033449"), ageNote: "Adult" },
  { name: "Verina", universe: "Wuthering Waves", gender: "female", imageUrl: FW("wutheringwaves", "7/7c/Verina%27s_Card.jpg/revision/latest/scale-to-width-down/282?cb=20240511130959"), ageNote: "Adult" },
  { name: "Zhezhi", universe: "Wuthering Waves", gender: "female", imageUrl: FW("wutheringwaves", "f/f0/Zhezhi_Card.png/revision/latest/scale-to-width-down/281?cb=20240708201004"), ageNote: "Adult" },
  { name: "Carlotta", universe: "Wuthering Waves", gender: "female", imageUrl: FW("wutheringwaves", "8/8a/Carlotta_Card.png/revision/latest/scale-to-width-down/264?cb=20241122070709"), ageNote: "Adult" },
  { name: "Shorekeeper", universe: "Wuthering Waves", gender: "female", imageUrl: FW("wutheringwaves", "8/85/Shorekeeper_Card.png/revision/latest/scale-to-width-down/281?cb=20240813134043"), ageNote: "Adult (ancient entity)" },
  { name: "Camellya", universe: "Wuthering Waves", gender: "female", imageUrl: FW("wutheringwaves", "8/8f/Camellya_Card.png/revision/latest/scale-to-width-down/281?cb=20240912101744"), ageNote: "Adult" },
  { name: "Roccia", universe: "Wuthering Waves", gender: "female", imageUrl: FW("wutheringwaves", "e/ea/Roccia_Card.png/revision/latest/scale-to-width-down/264?cb=20241122070750"), ageNote: "Adult" },
  { name: "Phoebe", universe: "Wuthering Waves", gender: "female", imageUrl: FW("wutheringwaves", "5/54/Phoebe_Card.png/revision/latest/scale-to-width-down/281?cb=20251015114458"), ageNote: "Adult" },
  { name: "Danjin", universe: "Wuthering Waves", gender: "female", imageUrl: FW("wutheringwaves", "3/3e/Danjin_Card.png/revision/latest/scale-to-width-down/281?cb=20240607110406"), ageNote: "Adult" },
  { name: "Jinhsi", universe: "Wuthering Waves", gender: "female", imageUrl: FW("wutheringwaves", "a/a9/Jinhsi_Card.png/revision/latest/scale-to-width-down/282?cb=20240517072857"), ageNote: "Adult" },
  { name: "Calcharo", universe: "Wuthering Waves", gender: "male", imageUrl: FW("wutheringwaves", "e/e5/Calcharo_Card.png/revision/latest/scale-to-width-down/281?cb=20240717222251"), ageNote: "Adult" },
  { name: "Jiyan", universe: "Wuthering Waves", gender: "male", imageUrl: FW("wutheringwaves", "0/0d/Jiyan_Card.png/revision/latest/scale-to-width-down/281?cb=20240509102627"), ageNote: "Adult" },
  { name: "Brant", universe: "Wuthering Waves", gender: "male", imageUrl: FW("wutheringwaves", "2/2d/Brant_Card.png/revision/latest/scale-to-width-down/281?cb=20251015115249"), ageNote: "Adult" },
  { name: "Xiangli Yao", universe: "Wuthering Waves", gender: "male", imageUrl: FW("wutheringwaves", "e/e9/Xiangli_Yao_Card.png/revision/latest/scale-to-width-down/281?cb=20240708200915"), ageNote: "Adult" },
  // ── DANMACHI (8) ──────────────────────────────────────────────────────────────────────────
  { name: "Bell Cranel", universe: "DanMachi", gender: "male", imageUrl: FW("danmachi", "2/2b/Bell_Crannel_Anime_SeasonV.jpg/revision/latest/scale-to-width-down/500?cb=20260129132229"), ageNote: "Adult (18)" },
  { name: "Hestia", universe: "DanMachi", gender: "female", imageUrl: FW("danmachi", "5/5a/Hestia_Anime.png/revision/latest/scale-to-width-down/500?cb=20150602195700"), ageNote: "Adult goddess" },
  { name: "Freya", universe: "DanMachi", gender: "female", imageUrl: FW("danmachi", "f/f4/Freya_Anime_3.png/revision/latest/scale-to-width-down/500?cb=20240523192009"), ageNote: "Adult goddess" },
  { name: "Ais Wallenstein", universe: "DanMachi", gender: "female", imageUrl: FW("danmachi", "8/89/Ais_Wall_S5.png/revision/latest/scale-to-width-down/500?cb=20260207042804"), ageNote: "Adult (18)" },
  { name: "Riveria Ljos Alf", universe: "DanMachi", gender: "female", imageUrl: FW("danmachi", "f/f5/Riveria_Ljos_Alf.png/revision/latest/scale-to-width-down/500?cb=20170415002736"), ageNote: "Adult (elf, ancient)" },
  { name: "Tiona Hiryute", universe: "DanMachi", gender: "female", imageUrl: FW("danmachi", "a/a6/Tiona_Hiryute_Anime.png/revision/latest/scale-to-width-down/500?cb=20150522221203"), ageNote: "Adult (19)" },
  { name: "Tione Hiryute", universe: "DanMachi", gender: "female", imageUrl: FW("danmachi", "f/f7/Tione_Hiryute_Anime.png/revision/latest/scale-to-width-down/321?cb=20150522233109"), ageNote: "Adult (19)" },
  { name: "Eina Tulle", universe: "DanMachi", gender: "female", imageUrl: FW("danmachi", "f/f6/Eina_Tulle_Anime.png/revision/latest/scale-to-width-down/500?cb=20151001201807"), ageNote: "Adult (18)" },

  // ── LEVELING WITH THE GODS (4) ─────────────────────────────────────────────────────────
  { name: "Kim YuWon", universe: "Leveling with the Gods", gender: "male", imageUrl: FW("leveling-with-the-gods", "b/b8/Kim_Yuwon.png/revision/latest/scale-to-width-down/345?cb=20240411063602"), ageNote: "Adult" },
  { name: "Odin", universe: "Leveling with the Gods", gender: "male", imageUrl: FW("leveling-with-the-gods", "8/85/Odin.jpg/revision/latest/scale-to-width-down/368?cb=20220324034641"), ageNote: "Adult god" },
  { name: "Hercules", universe: "Leveling with the Gods", gender: "male", imageUrl: FW("leveling-with-the-gods", "7/76/Hercules.png/revision/latest/scale-to-width-down/270?cb=20240411063514"), ageNote: "Adult god" },
  { name: "Zeus", universe: "Leveling with the Gods", gender: "male", imageUrl: FW("leveling-with-the-gods", "f/f8/Zeus_Younger.jpg/revision/latest/scale-to-width-down/287?cb=20240404034035"), ageNote: "Adult god" },

  // ── THE BEGINNING AFTER THE END (3) ─────────────────────────────────────────────────────────
  { name: "Arthur Leywin", universe: "The Beginning After the End", gender: "male", imageUrl: FW("thebate", "3/35/Arthur_Vol_10.png/revision/latest/scale-to-width-down/348?cb=20250318204554"), ageNote: "Adult (reincarnated)" },
  { name: "Tessia Eralith", universe: "The Beginning After the End", gender: "female", imageUrl: FW("thebate", "9/9e/Tess_Full.png/revision/latest/scale-to-width-down/292?cb=20250318210009"), ageNote: "Adult (18+)" },
  { name: "Sylvie", universe: "The Beginning After the End", gender: "female", imageUrl: FW("thebate", "f/f8/Sylvie_Human_Form.png/revision/latest/scale-to-width-down/294?cb=20241023225908"), ageNote: "Adult (ancient dragon)" },


  // ── ATTACK ON TITAN EXPANSION (+3) ──────────────────────────────────────────
  { name: "Historia Reiss", universe: "Attack on Titan", gender: "female", imageUrl: "https://static.wikia.nocookie.net/attackontitan/images/5/52/Historia_Reiss_character_image.png/revision/latest/scale-to-width-down/395?cb=20220221150629", ageNote: "Adult (19)" },
  { name: "Hange Zoe", universe: "Attack on Titan", gender: "female", imageUrl: "https://static.wikia.nocookie.net/attackontitan/images/c/c4/Hange_Zoe_character_image.png/revision/latest/scale-to-width-down/395?cb=20220221150704", ageNote: "Adult (30s)" },
  { name: "Annie Leonhart", universe: "Attack on Titan", gender: "female", imageUrl: "https://static.wikia.nocookie.net/attackontitan/images/8/85/Annie_Leonhart_character_image.png/revision/latest/scale-to-width-down/395?cb=20220221150511", ageNote: "Adult (24)" },

  // ── NARUTO EXPANSION (+4) ─────────────────────────────────────────────────
  { name: "Tsunade", universe: "Naruto", gender: "female", imageUrl: "https://static.wikia.nocookie.net/naruto/images/f/f9/Tsunade_Part_II.png/revision/latest/scale-to-width-down/500?cb=20170716114327", ageNote: "Adult" },
  { name: "Temari", universe: "Naruto", gender: "female", imageUrl: "https://static.wikia.nocookie.net/naruto/images/7/7c/Temari_Part_II.png/revision/latest/scale-to-width-down/500?cb=20170716134445", ageNote: "Adult (21)" },
  { name: "Kakashi Hatake", universe: "Naruto", gender: "male", imageUrl: "https://static.wikia.nocookie.net/naruto/images/2/27/Kakashi_Hatake.png/revision/latest/scale-to-width-down/500?cb=20170716072345", ageNote: "Adult (30s)" },
  { name: "Itachi Uchiha", universe: "Naruto", gender: "male", imageUrl: "https://static.wikia.nocookie.net/naruto/images/b/bb/Itachi_Uchiha.png/revision/latest/scale-to-width-down/500?cb=20170716072340", ageNote: "Adult (21)" },

  // ── JUJUTSU KAISEN EXPANSION (+3) ────────────────────────────────────────
  { name: "Mei Mei", universe: "Jujutsu Kaisen", gender: "female", imageUrl: "https://static.wikia.nocookie.net/jujutsu-kaisen/images/4/4d/Mei_Mei_%28Anime%29.png/revision/latest/scale-to-width-down/400?cb=20201102210039", ageNote: "Adult (28)" },
  { name: "Utahime Iori", universe: "Jujutsu Kaisen", gender: "female", imageUrl: "https://static.wikia.nocookie.net/jujutsu-kaisen/images/9/90/Utahime_Iori_%28Anime%29.png/revision/latest/scale-to-width-down/400?cb=20201031230618", ageNote: "Adult (30s)" },
  { name: "Kento Nanami", universe: "Jujutsu Kaisen", gender: "male", imageUrl: "https://static.wikia.nocookie.net/jujutsu-kaisen/images/5/5b/Kento_Nanami_%28Anime_2%29.png/revision/latest/scale-to-width-down/300?cb=20231018124319", ageNote: "Adult (28)" },

  // ── ONE PUNCH MAN EXPANSION (+2) ─────────────────────────────────────────
  { name: "Saitama", universe: "One Punch Man", gender: "male", imageUrl: "https://static.wikia.nocookie.net/onepunchman/images/d/df/Saitama_anime_profile.png/revision/latest/scale-to-width-down/348?cb=20220308011011", ageNote: "Adult (25)" },
  { name: "Sonic", universe: "One Punch Man", gender: "male", imageUrl: "https://static.wikia.nocookie.net/onepunchman/images/2/24/Sonic_Manga_Profile.png/revision/latest/scale-to-width-down/348?cb=20200212093256", ageNote: "Adult" },

  // ── SPY x FAMILY EXPANSION (+2) ──────────────────────────────────────────
  { name: "Fiona Frost", universe: "Spy x Family", gender: "female", imageUrl: "https://static.wikia.nocookie.net/spy-x-family9171/images/b/b0/Fiona_Frost_Anime_2.png/revision/latest/scale-to-width-down/400?cb=20230915044803", ageNote: "Adult" },
  { name: "Sylvia Sherwood", universe: "Spy x Family", gender: "female", imageUrl: "https://static.wikia.nocookie.net/spy-x-family9171/images/e/e5/Sylvia_Sherwood_Anime.png/revision/latest/scale-to-width-down/400?cb=20220507014507", ageNote: "Adult" },

  // ── BLACK CLOVER EXPANSION (+3) ──────────────────────────────────────────
  { name: "Noelle Silva", universe: "Black Clover", gender: "female", imageUrl: "https://static.wikia.nocookie.net/blackclover/images/8/8c/Noelle_Silva_Anime.png/revision/latest/scale-to-width-down/400?cb=20200808132319", ageNote: "Adult (19)" },
  { name: "Mimosa Vermillion", universe: "Black Clover", gender: "female", imageUrl: "https://static.wikia.nocookie.net/blackclover/images/4/46/Mimosa_Vermillion_Anime.png/revision/latest/scale-to-width-down/400?cb=20200808132234", ageNote: "Adult (18)" },
  { name: "Yami Sukehiro", universe: "Black Clover", gender: "male", imageUrl: "https://static.wikia.nocookie.net/blackclover/images/f/f0/Yami_Sukehiro_Anime.png/revision/latest/scale-to-width-down/400?cb=20200808132120", ageNote: "Adult (29)" },

  // ── TOWER OF GOD EXPANSION (+2) ──────────────────────────────────────────
  { name: "Bam (Twenty-Fifth)", universe: "Tower of God", gender: "male", imageUrl: "https://static.wikia.nocookie.net/towerofgod/images/1/14/Bam_Season_2.png/revision/latest/scale-to-width-down/400?cb=20210203162024", ageNote: "Adult" },
  { name: "Khun Aguero Agnes", universe: "Tower of God", gender: "male", imageUrl: "https://static.wikia.nocookie.net/towerofgod/images/f/f9/Khun_Season_2.png/revision/latest/scale-to-width-down/400?cb=20210203162142", ageNote: "Adult" },

  // ── BLEACH EXPANSION (+3) ─────────────────────────────────────────────────
  { name: "Yoruichi Shihoin", universe: "Bleach", gender: "female", imageUrl: "https://static.wikia.nocookie.net/bleach/images/c/c4/Yoruichi_Shihoin.png/revision/latest/scale-to-width-down/400?cb=20220118105754", ageNote: "Adult" },
  { name: "Byakuya Kuchiki", universe: "Bleach", gender: "male", imageUrl: "https://static.wikia.nocookie.net/bleach/images/5/59/Byakuya_Kuchiki.png/revision/latest/scale-to-width-down/400?cb=20220118110129", ageNote: "Adult" },
  { name: "Nelliel Tu Odelschwanck", universe: "Bleach", gender: "female", imageUrl: "https://static.wikia.nocookie.net/bleach/images/6/6d/Nel_Tu.png/revision/latest/scale-to-width-down/400?cb=20220118122016", ageNote: "Adult" },


  // ═══════════════════════════════════════════════════════════════════════════
  // MANHWA
  // ═══════════════════════════════════════════════════════════════════════════

  // ── OMNISCIENT READER'S VIEWPOINT (5) ─────────────────────────────────────
  { name: "Kim Dokja", universe: "Omniscient Reader", gender: "male", imageUrl: "https://static.wikia.nocookie.net/omniscient-readers-viewpoint/images/4/43/Kim_Dokja_Cover.jpg/revision/latest/scale-to-width-down/400?cb=20220817132702", ageNote: "Adult (28)" },
  { name: "Yoo Joonghyuk", universe: "Omniscient Reader", gender: "male", imageUrl: "https://static.wikia.nocookie.net/omniscient-readers-viewpoint/images/b/bf/Yoo_Joonghyuk_%28Volume_3_cover%29.png/revision/latest/scale-to-width-down/400?cb=20191022181447", ageNote: "Adult" },
  { name: "Han Sooyoung", universe: "Omniscient Reader", gender: "female", imageUrl: "https://static.wikia.nocookie.net/omniscient-readers-viewpoint/images/b/bc/Han_Sooyoung_%28Volume_3_cover%29.png/revision/latest/scale-to-width-down/400?cb=20191022204529", ageNote: "Adult" },
  { name: "Lee Hyunsung", universe: "Omniscient Reader", gender: "male", imageUrl: "https://static.wikia.nocookie.net/omniscient-readers-viewpoint/images/7/78/Lee_Hyunsung_Webnovel.png/revision/latest/scale-to-width-down/400?cb=20220818095712", ageNote: "Adult" },
  { name: "Jung Heewon", universe: "Omniscient Reader", gender: "female", imageUrl: "https://static.wikia.nocookie.net/omniscient-readers-viewpoint/images/7/74/Jung_Heewon_Webnovel.png/revision/latest/scale-to-width-down/400?cb=20220811111418", ageNote: "Adult" },

  // ── SECOND LIFE RANKER (4) ─────────────────────────────────────────────────
  { name: "Yeon-woo", universe: "Second Life Ranker", gender: "male", imageUrl: "https://static.wikia.nocookie.net/second-life-ranker/images/0/03/5.jpg/revision/latest/scale-to-width-down/400?cb=20200817053021", ageNote: "Adult (25)" },
  { name: "Rebecca Cha", universe: "Second Life Ranker", gender: "female", imageUrl: "https://static.wikia.nocookie.net/second-life-ranker/images/7/77/Chapter_111_-_Sol_Luna.png/revision/latest/scale-to-width-down/400?cb=20211231084921", ageNote: "Adult" },
  { name: "Edora", universe: "Second Life Ranker", gender: "female", imageUrl: "https://static.wikia.nocookie.net/second-life-ranker/images/b/b6/Edora-0.jpg/revision/latest/scale-to-width-down/400?cb=20201020091912", ageNote: "Adult" },
  { name: "Shanon", universe: "Second Life Ranker", gender: "male", imageUrl: "https://static.wikia.nocookie.net/second-life-ranker/images/0/08/Shanon_Chapter_70.jpg/revision/latest/scale-to-width-down/400?cb=20210430070919", ageNote: "Adult" },

  // ── RETURN OF THE MAD DEMON (4) ──────────────────────────────────────────

  // ═══════════════════════════════════════════════════════════════════════════
  // VIDEO GAMES
  // ═══════════════════════════════════════════════════════════════════════════

  // ── NIER: AUTOMATA (4) ─────────────────────────────────────────────────────
  { name: "2B (YoRHa No.2 Type B)", universe: "NieR: Automata", gender: "female", imageUrl: "https://static.wikia.nocookie.net/nier/images/3/38/YoRHa_No.2_Type_B.png/revision/latest/scale-to-width-down/400?cb=20170322051325", ageNote: "Adult android" },
  { name: "9S (YoRHa No.9 Type S)", universe: "NieR: Automata", gender: "male", imageUrl: "https://static.wikia.nocookie.net/nier/images/8/84/YoRHa_No.9_Type_S.png/revision/latest/scale-to-width-down/400?cb=20220205191546", ageNote: "Adult android" },
  { name: "A2 (YoRHa Type A No.2)", universe: "NieR: Automata", gender: "female", imageUrl: "https://static.wikia.nocookie.net/nier/images/f/fe/YoRHa_No.2A.png/revision/latest/scale-to-width-down/400?cb=20170423025735", ageNote: "Adult android" },

  // ── RESIDENT EVIL (5) ──────────────────────────────────────────────────────
  { name: "Jill Valentine", universe: "Resident Evil", gender: "female", imageUrl: "https://static.wikia.nocookie.net/residentevil/images/0/0e/Jill_-_Death_Island_Render.png/revision/latest/scale-to-width-down/400?cb=20230706214935", ageNote: "Adult (23+)" },
  { name: "Ada Wong", universe: "Resident Evil", gender: "female", imageUrl: "https://static.wikia.nocookie.net/residentevil/images/a/a7/Ada_Wong_RE6_render.png/revision/latest/scale-to-width-down/400?cb=20260116014956", ageNote: "Adult" },
  { name: "Leon S. Kennedy", universe: "Resident Evil", gender: "male", imageUrl: "https://static.wikia.nocookie.net/residentevil/images/7/7d/RE9_-_Leon_Render.png/revision/latest/scale-to-width-down/400?cb=20251212111407", ageNote: "Adult (27)" },
  { name: "Lady Dimitrescu", universe: "Resident Evil", gender: "female", imageUrl: "https://static.wikia.nocookie.net/residentevil/images/f/f8/ADimitrescuFull.png/revision/latest/scale-to-width-down/400?cb=20210523144240", ageNote: "Adult" },
  { name: "Claire Redfield", universe: "Resident Evil", gender: "female", imageUrl: "https://static.wikia.nocookie.net/residentevil/images/9/9e/Claire_-_Death_Island_Render.png/revision/latest/scale-to-width-down/400?cb=20230703033607", ageNote: "Adult (19+)" },

  // ── STREET FIGHTER (6) ─────────────────────────────────────────────────────
  { name: "Chun-Li", universe: "Street Fighter", gender: "female", imageUrl: "https://static.wikia.nocookie.net/streetfighter/images/5/5b/Chun-Li_SF6_Render.png/revision/latest/scale-to-width-down/400?cb=20220603005535", ageNote: "Adult" },
  { name: "Cammy White", universe: "Street Fighter", gender: "female", imageUrl: "https://static.wikia.nocookie.net/streetfighter/images/9/9a/SF6_Cammy.png/revision/latest/scale-to-width-down/400?cb=20220610000000", ageNote: "Adult (22)" },
  { name: "Juri Han", universe: "Street Fighter", gender: "female", imageUrl: "https://static.wikia.nocookie.net/streetfighter/images/d/dc/Sf6-juri.png/revision/latest/scale-to-width-down/400?cb=20220808055222", ageNote: "Adult" },
  { name: "Ryu", universe: "Street Fighter", gender: "male", imageUrl: "https://static.wikia.nocookie.net/streetfighter/images/3/3a/Sf6-ryu.png/revision/latest/scale-to-width-down/400?cb=20220603010542", ageNote: "Adult" },
  { name: "Ken Masters", universe: "Street Fighter", gender: "male", imageUrl: "https://static.wikia.nocookie.net/streetfighter/images/1/14/Ken_SF6_Render.png/revision/latest/scale-to-width-down/400?cb=20220915164810", ageNote: "Adult" },
  { name: "Karin Kanzuki", universe: "Street Fighter", gender: "female", imageUrl: "https://static.wikia.nocookie.net/streetfighter/images/6/65/Karin_Kanzuki_%28SFV%29.png/revision/latest/scale-to-width-down/400?cb=20160321000000", ageNote: "Adult (18)" },

  // ── DEVIL MAY CRY (5) ──────────────────────────────────────────────────────
  { name: "Dante", universe: "Devil May Cry", gender: "male", imageUrl: "https://static.wikia.nocookie.net/devilmaycry/images/c/c2/Dante_DMC5.png/revision/latest/scale-to-width-down/400?cb=20180922220047", ageNote: "Adult" },
  { name: "Vergil", universe: "Devil May Cry", gender: "male", imageUrl: "https://static.wikia.nocookie.net/devilmaycry/images/4/4e/Vergil_DMC5.png/revision/latest/scale-to-width-down/400?cb=20240130212008", ageNote: "Adult" },
  { name: "Lady", universe: "Devil May Cry", gender: "female", imageUrl: "https://static.wikia.nocookie.net/devilmaycry/images/c/c9/DMC5_Lady.png/revision/latest/scale-to-width-down/400?cb=20180922220400", ageNote: "Adult (18+)" },
  { name: "Trish", universe: "Devil May Cry", gender: "female", imageUrl: "https://static.wikia.nocookie.net/devilmaycry/images/7/79/DMC5_Trish.png/revision/latest/scale-to-width-down/400?cb=20180922220252", ageNote: "Adult" },
  { name: "Nico", universe: "Devil May Cry", gender: "female", imageUrl: "https://static.wikia.nocookie.net/devilmaycry/images/8/8a/Nicoletta_Goldstein_DMC5.png/revision/latest/scale-to-width-down/400?cb=20230810220744", ageNote: "Adult" },

  // ── TEKKEN (5) ─────────────────────────────────────────────────────────────
  { name: "Nina Williams", universe: "Tekken", gender: "female", imageUrl: "https://static.wikia.nocookie.net/tekken/images/c/c8/Tekken_8_-_Nina_Williams_Official_Render.jpg/revision/latest/scale-to-width-down/400?cb=20230901101613&path-prefix=en", ageNote: "Adult" },
  { name: "Christie Monteiro", universe: "Tekken", gender: "female", imageUrl: "https://static.wikia.nocookie.net/tekken/images/5/55/Christie4.png/revision/latest/scale-to-width-down/400?cb=20171111111301&path-prefix=en", ageNote: "Adult (22)" },
  { name: "Asuka Kazama", universe: "Tekken", gender: "female", imageUrl: "https://static.wikia.nocookie.net/tekken/images/b/b1/Tekken_8_-_Asuka_Render.jpg/revision/latest/scale-to-width-down/400?cb=20230425185037&path-prefix=en", ageNote: "Adult (18+)" },
  { name: "Lars Alexandersson", universe: "Tekken", gender: "male", imageUrl: "https://static.wikia.nocookie.net/tekken/images/e/e6/Lars_Alexandersson_TK8_%28High_Resolution%29.jpg/revision/latest/scale-to-width-down/400?cb=20251203010212&path-prefix=en", ageNote: "Adult" },
  { name: "Jin Kazama", universe: "Tekken", gender: "male", imageUrl: "https://static.wikia.nocookie.net/tekken/images/a/ab/T8_-_Jin_Render_%28High_Resolution%29.jpg/revision/latest/scale-to-width-down/400?cb=20251202234836&path-prefix=en", ageNote: "Adult (21)" },

  // ═══════════════════════════════════════════════════════════════════════════
  // CARTOONS
  // ═══════════════════════════════════════════════════════════════════════════

  // ── AVATAR: THE LEGEND OF KORRA (5) ──────────────────────────────────────
  { name: "Korra", universe: "Avatar: Legend of Korra", gender: "female", imageUrl: "https://static.wikia.nocookie.net/avatar/images/3/31/Korra_smiling.png/revision/latest/scale-to-width-down/400?cb=20200810000000", ageNote: "Adult (21)" },
  { name: "Asami Sato", universe: "Avatar: Legend of Korra", gender: "female", imageUrl: "https://static.wikia.nocookie.net/avatar/images/b/b6/Asami_Sato.png/revision/latest/scale-to-width-down/400?cb=20200101000000", ageNote: "Adult (22)" },
  { name: "Lin Beifong", universe: "Avatar: Legend of Korra", gender: "female", imageUrl: "https://static.wikia.nocookie.net/avatar/images/8/83/Lin_Beifong.png/revision/latest/scale-to-width-down/400?cb=20200101000000", ageNote: "Adult (40s)" },
  { name: "Mako", universe: "Avatar: Legend of Korra", gender: "male", imageUrl: "https://static.wikia.nocookie.net/avatar/images/a/a6/Mako.png/revision/latest/scale-to-width-down/400?cb=20150408124557", ageNote: "Adult (22)" },
  { name: "Bolin", universe: "Avatar: Legend of Korra", gender: "male", imageUrl: "https://static.wikia.nocookie.net/avatar/images/d/d4/Bolin.png/revision/latest/scale-to-width-down/400?cb=20200101000000", ageNote: "Adult (22)" },

  // ── ARCANE (4) ─────────────────────────────────────────────────────────────
  { name: "Vi (Arcane)", universe: "Arcane", gender: "female", imageUrl: "https://static.wikia.nocookie.net/arcane/images/c/ca/ViFinaleSitting.jpg/revision/latest/scale-to-width-down/400?cb=20241023000000", ageNote: "Adult" },
  { name: "Caitlyn Kiramman", universe: "Arcane", gender: "female", imageUrl: "https://static.wikia.nocookie.net/arcane/images/4/49/CaitlynFinale.jpg/revision/latest/scale-to-width-down/400?cb=20250315073154", ageNote: "Adult (20s)" },
  { name: "Jayce", universe: "Arcane", gender: "male", imageUrl: "https://static.wikia.nocookie.net/arcane/images/f/f6/Astral_Jayce.png/revision/latest/scale-to-width-down/400?cb=20250203233045", ageNote: "Adult" },
  { name: "Viktor", universe: "Arcane", gender: "male", imageUrl: "https://static.wikia.nocookie.net/arcane/images/e/e2/AstralViktor.png/revision/latest/scale-to-width-down/400?cb=20250323005235", ageNote: "Adult" },

  // ── CASTLEVANIA (3) ────────────────────────────────────────────────────────
  { name: "Sypha Belnades", universe: "Castlevania", gender: "female", imageUrl: "https://static.wikia.nocookie.net/castlevania/images/f/f6/Pachi_sypha.jpg/revision/latest/scale-to-width-down/400?cb=20181026000000", ageNote: "Adult" },
  { name: "Alucard", universe: "Castlevania", gender: "male", imageUrl: "https://static.wikia.nocookie.net/castlevania/images/2/21/Alucard_%28animated_series%29_-_01.jpg/revision/latest/scale-to-width-down/400?cb=20250816201900", ageNote: "Adult" },
  { name: "Trevor Belmont", universe: "Castlevania", gender: "male", imageUrl: "https://static.wikia.nocookie.net/castlevania/images/2/24/Trevor_Belmont_-_01.png/revision/latest/scale-to-width-down/400?cb=20181026000000", ageNote: "Adult" },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMIC BOOKS (non-Marvel/DC)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── INVINCIBLE (4) ─────────────────────────────────────────────────────────
  { name: "Mark Grayson (Invincible)", universe: "Invincible", gender: "male", imageUrl: "https://static.wikia.nocookie.net/amazon-invincible/images/a/a3/Invincible_%28Mark_Grayson%29.png/revision/latest/scale-to-width-down/400?cb=20250717141424", ageNote: "Adult (18+)" },
  { name: "Atom Eve", universe: "Invincible", gender: "female", imageUrl: "https://static.wikia.nocookie.net/amazon-invincible/images/7/74/Atom-EveProfile.png/revision/latest/scale-to-width-down/400?cb=20250520153227", ageNote: "Adult (18+)" },
  { name: "Debbie Grayson", universe: "Invincible", gender: "female", imageUrl: "https://static.wikia.nocookie.net/amazon-invincible/images/c/cb/DebbieProfile.png/revision/latest/scale-to-width-down/400?cb=20210619071405", ageNote: "Adult" },
  { name: "Omni-Man", universe: "Invincible", gender: "male", imageUrl: "https://static.wikia.nocookie.net/amazon-invincible/images/8/8d/Nolan_coalition_fullbod.png/revision/latest/scale-to-width-down/400?cb=20260123113904", ageNote: "Adult" },

  // ── THE BOYS (4) ───────────────────────────────────────────────────────────
  { name: "Billy Butcher", universe: "The Boys", gender: "male", imageUrl: "https://static.wikia.nocookie.net/amazons-the-boys/images/9/98/Billy_Butcher-S4.png/revision/latest/scale-to-width-down/400?cb=20240614090132", ageNote: "Adult" },
  { name: "Starlight (Annie January)", universe: "The Boys", gender: "female", imageUrl: "https://static.wikia.nocookie.net/amazons-the-boys/images/c/cb/Annie_January-S4.png/revision/latest/scale-to-width-down/400?cb=20240614091322", ageNote: "Adult (25)" },
  { name: "Queen Maeve", universe: "The Boys", gender: "female", imageUrl: "https://static.wikia.nocookie.net/amazons-the-boys/images/2/27/Queen-Maeve-S3.png/revision/latest/scale-to-width-down/400?cb=20220604010748", ageNote: "Adult" },
  { name: "Homelander", universe: "The Boys", gender: "male", imageUrl: "https://static.wikia.nocookie.net/amazons-the-boys/images/5/5b/Homelander-S4.png/revision/latest/scale-to-width-down/400?cb=20240614091600", ageNote: "Adult" },

  // ═══════════════════════════════════════════════════════════════════════════
  // MANGA (non-anime)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── BERSERK (4) ────────────────────────────────────────────────────────────
  { name: "Guts", universe: "Berserk", gender: "male", imageUrl: "https://static.wikia.nocookie.net/berserk/images/4/40/Manga_V38_Guts.png/revision/latest/scale-to-width-down/400?cb=20170919104357", ageNote: "Adult (24)" },
  { name: "Griffith", universe: "Berserk", gender: "male", imageUrl: "https://static.wikia.nocookie.net/berserk/images/b/b0/BTCG_Griffith_Holding_Sabre.png/revision/latest/scale-to-width-down/400?cb=20170930052614", ageNote: "Adult" },
  { name: "Casca", universe: "Berserk", gender: "female", imageUrl: "https://static.wikia.nocookie.net/berserk/images/d/d0/BTCG_Casca_and_Puck.png/revision/latest/scale-to-width-down/400?cb=20170923104942", ageNote: "Adult (22+)" },
  { name: "Farnese de Vandimion", universe: "Berserk", gender: "female", imageUrl: "https://static.wikia.nocookie.net/berserk/images/9/9e/Farnese_de_Vandimion_Manga.jpg/revision/latest/scale-to-width-down/400?cb=20160918013313", ageNote: "Adult (18+)" },

  // ── FULLMETAL ALCHEMIST (5) ────────────────────────────────────────────────
  { name: "Roy Mustang", universe: "Fullmetal Alchemist", gender: "male", imageUrl: "https://static.wikia.nocookie.net/fma/images/5/5b/MustangManga.png/revision/latest/scale-to-width-down/400?cb=20250220111436", ageNote: "Adult (29)" },
  { name: "Riza Hawkeye", universe: "Fullmetal Alchemist", gender: "female", imageUrl: "https://static.wikia.nocookie.net/fma/images/b/ba/RizaManga.png/revision/latest/scale-to-width-down/400?cb=20250220112828", ageNote: "Adult" },
  { name: "Olivier Mira Armstrong", universe: "Fullmetal Alchemist", gender: "female", imageUrl: "https://static.wikia.nocookie.net/fma/images/e/e6/Avatar_olivier.png/revision/latest/scale-to-width-down/400?cb=20160812165045", ageNote: "Adult" },
  { name: "Izumi Curtis", universe: "Fullmetal Alchemist", gender: "female", imageUrl: "https://static.wikia.nocookie.net/fma/images/2/26/Avatar_harnet.png/revision/latest/scale-to-width-down/400?cb=20171031131954", ageNote: "Adult" },
  { name: "Alex Louis Armstrong", universe: "Fullmetal Alchemist", gender: "male", imageUrl: "https://static.wikia.nocookie.net/fma/images/4/44/Avatar_alex0.png/revision/latest/scale-to-width-down/400?cb=20180418142334", ageNote: "Adult" },

  // ── TOKYO GHOUL (4) ────────────────────────────────────────────────────────
  { name: "Ken Kaneki", universe: "Tokyo Ghoul", gender: "male", imageUrl: "https://static.wikia.nocookie.net/tokyoghoul/images/7/7d/Kaneki_Finale_HQ.png/revision/latest/scale-to-width-down/400?cb=20180706042331", ageNote: "Adult (18+)" },
  { name: "Touka Kirishima", universe: "Tokyo Ghoul", gender: "female", imageUrl: "https://static.wikia.nocookie.net/tokyoghoul/images/5/5b/Touka_Finale_HQ.png/revision/latest/scale-to-width-down/400?cb=20181103072059", ageNote: "Adult (18+)" },
  { name: "Shu Tsukiyama", universe: "Tokyo Ghoul", gender: "male", imageUrl: "https://static.wikia.nocookie.net/tokyoghoul/images/d/d6/Tsukiyama_Cover_Vol_4.png/revision/latest/scale-to-width-down/400?cb=20150321133928", ageNote: "Adult (22)" },
  { name: "Rize Kamishiro", universe: "Tokyo Ghoul", gender: "female", imageUrl: "https://static.wikia.nocookie.net/tokyoghoul/images/b/b5/Re_Vol_15_%28cleaned_version%29.png/revision/latest/scale-to-width-down/400?cb=20180323091504", ageNote: "Adult (18+)" },

  // ── HUNTER x HUNTER (3) ────────────────────────────────────────────────────
  { name: "Hisoka Morow", universe: "Hunter x Hunter", gender: "male", imageUrl: "https://static.wikia.nocookie.net/hunterxhunter/images/2/29/Hisoka_Morow_YC_Portrait.png/revision/latest/scale-to-width-down/400?cb=20190123172039", ageNote: "Adult" },
  { name: "Leorio Paradinight", universe: "Hunter x Hunter", gender: "male", imageUrl: "https://static.wikia.nocookie.net/hunterxhunter/images/7/73/HxH2011_EP145_Leorio_Portrait.png/revision/latest/scale-to-width-down/400?cb=20230902193715", ageNote: "Adult (19+)" },
  { name: "Biscuit Krueger", universe: "Hunter x Hunter", gender: "female", imageUrl: "https://static.wikia.nocookie.net/hunterxhunter/images/c/cd/Biscuit_Krueger_CA_Portrait.png/revision/latest/scale-to-width-down/400?cb=20190630140152", ageNote: "Adult (ancient)" },


];

async function seed() {
  console.log("Clearing old data and re-seeding...");
  await db.delete(votesTable);
  await db.delete(charactersTable);
  await db.insert(charactersTable).values(characters);
  const universes = new Set(characters.map(c => c.universe));
  const placeholders = characters.filter(c => c.imageUrl.includes("ui-avatars.com")).length;
  console.log(`Seeded ${characters.length} characters across ${universes.size} universes (${characters.length - placeholders} real images, ${placeholders} placeholders).`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
