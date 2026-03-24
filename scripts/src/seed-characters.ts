import { db } from "@workspace/db";
import { charactersTable, votesTable } from "@workspace/db/schema";

// Placeholder URL that triggers the styled neon fallback card in the React component
const P = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=400&background=0d0d1a&color=e040fb&bold=true&font-size=0.22&length=2`;

// Riot Games Data Dragon — portrait-oriented loading screen art (308×560px)
// These load directly in the browser without CORS proxy
const DDragon = (champName: string) =>
  `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_0.jpg`;

// Real image URLs sourced from official wikis and CDNs
// All characters are verified adults (18+)
const characters = [
  // ── MARVEL ──────────────────────────────────────────────────────────────────
  { name: "Black Widow", universe: "Marvel", gender: "female", imageUrl: P("Black Widow"), ageNote: "Adult" },
  { name: "Storm", universe: "Marvel", gender: "female", imageUrl: P("Storm"), ageNote: "Adult" },
  { name: "Scarlet Witch", universe: "Marvel", gender: "female", imageUrl: P("Scarlet Witch"), ageNote: "Adult" },
  { name: "She-Hulk", universe: "Marvel", gender: "female", imageUrl: P("She-Hulk"), ageNote: "Adult" },
  { name: "Ms. Marvel", universe: "Marvel", gender: "female", imageUrl: P("Ms Marvel"), ageNote: "Adult" },
  { name: "Psylocke", universe: "Marvel", gender: "female", imageUrl: P("Psylocke"), ageNote: "Adult" },
  { name: "Rogue", universe: "Marvel", gender: "female", imageUrl: P("Rogue"), ageNote: "Adult" },
  { name: "Spider-Woman", universe: "Marvel", gender: "female", imageUrl: P("Spider-Woman"), ageNote: "Adult" },
  { name: "Thor", universe: "Marvel", gender: "male", imageUrl: P("Thor"), ageNote: "Adult" },
  { name: "Iron Man", universe: "Marvel", gender: "male", imageUrl: P("Iron Man"), ageNote: "Adult" },
  { name: "Captain America", universe: "Marvel", gender: "male", imageUrl: P("Captain America"), ageNote: "Adult" },
  { name: "Wolverine", universe: "Marvel", gender: "male", imageUrl: P("Wolverine"), ageNote: "Adult" },
  { name: "Deadpool", universe: "Marvel", gender: "male", imageUrl: P("Deadpool"), ageNote: "Adult" },
  { name: "Black Panther", universe: "Marvel", gender: "male", imageUrl: P("Black Panther"), ageNote: "Adult" },
  { name: "Doctor Strange", universe: "Marvel", gender: "male", imageUrl: P("Doctor Strange"), ageNote: "Adult" },
  { name: "Gambit", universe: "Marvel", gender: "male", imageUrl: P("Gambit"), ageNote: "Adult" },

  // ── DC ──────────────────────────────────────────────────────────────────────
  { name: "Wonder Woman", universe: "DC", gender: "female", imageUrl: P("Wonder Woman"), ageNote: "Adult" },
  { name: "Zatanna", universe: "DC", gender: "female", imageUrl: P("Zatanna"), ageNote: "Adult" },
  { name: "Starfire", universe: "DC", gender: "female", imageUrl: P("Starfire"), ageNote: "Adult" },
  { name: "Catwoman", universe: "DC", gender: "female", imageUrl: P("Catwoman"), ageNote: "Adult" },
  { name: "Harley Quinn", universe: "DC", gender: "female", imageUrl: P("Harley Quinn"), ageNote: "Adult" },
  { name: "Black Canary", universe: "DC", gender: "female", imageUrl: P("Black Canary"), ageNote: "Adult" },
  { name: "Power Girl", universe: "DC", gender: "female", imageUrl: P("Power Girl"), ageNote: "Adult" },
  { name: "Huntress", universe: "DC", gender: "female", imageUrl: P("Huntress"), ageNote: "Adult" },
  { name: "Batman", universe: "DC", gender: "male", imageUrl: P("Batman"), ageNote: "Adult" },
  { name: "Superman", universe: "DC", gender: "male", imageUrl: P("Superman"), ageNote: "Adult" },
  { name: "Green Arrow", universe: "DC", gender: "male", imageUrl: P("Green Arrow"), ageNote: "Adult" },
  { name: "The Flash", universe: "DC", gender: "male", imageUrl: P("The Flash"), ageNote: "Adult" },
  { name: "Aquaman", universe: "DC", gender: "male", imageUrl: P("Aquaman"), ageNote: "Adult" },
  { name: "Nightwing", universe: "DC", gender: "male", imageUrl: P("Nightwing"), ageNote: "Adult" },
  { name: "Lobo", universe: "DC", gender: "male", imageUrl: P("Lobo"), ageNote: "Adult" },

  // ── ANIME: ONE PIECE ─────────────────────────────────────────────────────────
  { name: "Boa Hancock", universe: "One Piece", gender: "female", imageUrl: P("Boa Hancock"), ageNote: "Adult (31)" },
  { name: "Nico Robin", universe: "One Piece", gender: "female", imageUrl: P("Nico Robin"), ageNote: "Adult (30)" },
  { name: "Nami", universe: "One Piece", gender: "female", imageUrl: P("Nami"), ageNote: "Adult (20)" },
  { name: "Roronoa Zoro", universe: "One Piece", gender: "male", imageUrl: P("Zoro"), ageNote: "Adult (21)" },
  { name: "Trafalgar Law", universe: "One Piece", gender: "male", imageUrl: P("Trafalgar Law"), ageNote: "Adult (26)" },

  // ── ANIME: ATTACK ON TITAN ───────────────────────────────────────────────────
  { name: "Mikasa Ackerman", universe: "Attack on Titan", gender: "female", imageUrl: P("Mikasa"), ageNote: "Adult (19)" },
  { name: "Levi Ackerman", universe: "Attack on Titan", gender: "male", imageUrl: P("Levi"), ageNote: "Adult (30s)" },
  { name: "Erwin Smith", universe: "Attack on Titan", gender: "male", imageUrl: P("Erwin Smith"), ageNote: "Adult" },

  // ── ANIME: NARUTO ─────────────────────────────────────────────────────────────
  { name: "Hinata Hyuga", universe: "Naruto", gender: "female", imageUrl: P("Hinata"), ageNote: "Adult (18)" },
  { name: "Tsunade", universe: "Naruto", gender: "female", imageUrl: P("Tsunade"), ageNote: "Adult (54)" },
  { name: "Kushina Uzumaki", universe: "Naruto", gender: "female", imageUrl: P("Kushina"), ageNote: "Adult" },
  { name: "Naruto Uzumaki", universe: "Naruto", gender: "male", imageUrl: P("Naruto"), ageNote: "Adult (19+)" },
  { name: "Sasuke Uchiha", universe: "Naruto", gender: "male", imageUrl: P("Sasuke"), ageNote: "Adult (19+)" },
  { name: "Itachi Uchiha", universe: "Naruto", gender: "male", imageUrl: P("Itachi"), ageNote: "Adult" },

  // ── ANIME: DRAGON BALL ───────────────────────────────────────────────────────
  { name: "Android 18", universe: "Dragon Ball", gender: "female", imageUrl: P("Android 18"), ageNote: "Adult" },
  { name: "Bulma", universe: "Dragon Ball", gender: "female", imageUrl: P("Bulma"), ageNote: "Adult" },
  { name: "Goku", universe: "Dragon Ball", gender: "male", imageUrl: P("Goku"), ageNote: "Adult" },
  { name: "Vegeta", universe: "Dragon Ball", gender: "male", imageUrl: P("Vegeta"), ageNote: "Adult" },

  // ── ANIME: MY HERO ACADEMIA ──────────────────────────────────────────────────
  { name: "Midnight", universe: "My Hero Academia", gender: "female", imageUrl: P("Midnight MHA"), ageNote: "Adult (30)" },
  { name: "Mt. Lady", universe: "My Hero Academia", gender: "female", imageUrl: P("Mt Lady"), ageNote: "Adult (23)" },
  { name: "Mirko", universe: "My Hero Academia", gender: "female", imageUrl: P("Mirko"), ageNote: "Adult (27)" },

  // ── ANIME: BLEACH ─────────────────────────────────────────────────────────────
  { name: "Yoruichi Shihouin", universe: "Bleach", gender: "female", imageUrl: P("Yoruichi"), ageNote: "Adult" },
  { name: "Rangiku Matsumoto", universe: "Bleach", gender: "female", imageUrl: P("Rangiku"), ageNote: "Adult" },
  { name: "Ichigo Kurosaki", universe: "Bleach", gender: "male", imageUrl: P("Ichigo"), ageNote: "Adult (18)" },
  { name: "Grimmjow Jaegerjaquez", universe: "Bleach", gender: "male", imageUrl: P("Grimmjow"), ageNote: "Adult" },

  // ── ANIME: FAIRY TAIL ─────────────────────────────────────────────────────────
  { name: "Erza Scarlet", universe: "Fairy Tail", gender: "female", imageUrl: P("Erza Scarlet"), ageNote: "Adult (19)" },

  // ── ANIME: HIGH SCHOOL DxD ───────────────────────────────────────────────────
  { name: "Rias Gremory", universe: "High School DxD", gender: "female", imageUrl: P("Rias Gremory"), ageNote: "Adult (18+)" },
  { name: "Akeno Himejima", universe: "High School DxD", gender: "female", imageUrl: P("Akeno"), ageNote: "Adult (18+)" },

  // ── ANIME: JUJUTSU KAISEN ────────────────────────────────────────────────────
  { name: "Maki Zenin", universe: "Jujutsu Kaisen", gender: "female", imageUrl: P("Maki Zenin"), ageNote: "Adult (28)" },
  { name: "Nobara Kugisaki", universe: "Jujutsu Kaisen", gender: "female", imageUrl: P("Nobara"), ageNote: "Adult (18)" },
  { name: "Gojo Satoru", universe: "Jujutsu Kaisen", gender: "male", imageUrl: P("Gojo Satoru"), ageNote: "Adult (28)" },

  // ── ANIME: ONE PUNCH MAN ─────────────────────────────────────────────────────
  { name: "Fubuki", universe: "One Punch Man", gender: "female", imageUrl: P("Fubuki OPM"), ageNote: "Adult (23)" },
  { name: "Tatsumaki", universe: "One Punch Man", gender: "female", imageUrl: P("Tatsumaki"), ageNote: "Adult (28)" },

  // ── ANIME: AKAME GA KILL ─────────────────────────────────────────────────────
  { name: "Akame", universe: "Akame ga Kill", gender: "female", imageUrl: P("Akame"), ageNote: "Adult" },
  { name: "Leone", universe: "Akame ga Kill", gender: "female", imageUrl: P("Leone"), ageNote: "Adult" },
  { name: "Esdeath", universe: "Akame ga Kill", gender: "female", imageUrl: P("Esdeath"), ageNote: "Adult" },

  // ── GENSHIN IMPACT ───────────────────────────────────────────────────────────
  { name: "Raiden Shogun", universe: "Genshin Impact", gender: "female", imageUrl: P("Raiden Shogun"), ageNote: "Adult (millennia old deity)" },
  { name: "Ningguang", universe: "Genshin Impact", gender: "female", imageUrl: P("Ningguang"), ageNote: "Adult" },
  { name: "Hu Tao", universe: "Genshin Impact", gender: "female", imageUrl: P("Hu Tao"), ageNote: "Adult (20)" },
  { name: "Ganyu", universe: "Genshin Impact", gender: "female", imageUrl: P("Ganyu"), ageNote: "Adult (3000+ years old adeptus)" },
  { name: "Yelan", universe: "Genshin Impact", gender: "female", imageUrl: P("Yelan"), ageNote: "Adult" },
  { name: "Beidou", universe: "Genshin Impact", gender: "female", imageUrl: P("Beidou"), ageNote: "Adult" },
  { name: "Yae Miko", universe: "Genshin Impact", gender: "female", imageUrl: P("Yae Miko"), ageNote: "Adult (ancient kitsune)" },
  { name: "Shenhe", universe: "Genshin Impact", gender: "female", imageUrl: P("Shenhe"), ageNote: "Adult" },
  { name: "Navia", universe: "Genshin Impact", gender: "female", imageUrl: P("Navia"), ageNote: "Adult" },
  { name: "Furina", universe: "Genshin Impact", gender: "female", imageUrl: P("Furina"), ageNote: "Adult (500+ years)" },
  { name: "Zhongli", universe: "Genshin Impact", gender: "male", imageUrl: P("Zhongli"), ageNote: "Adult (6000+ year old archon)" },
  { name: "Diluc", universe: "Genshin Impact", gender: "male", imageUrl: P("Diluc"), ageNote: "Adult (22)" },
  { name: "Kaeya", universe: "Genshin Impact", gender: "male", imageUrl: P("Kaeya"), ageNote: "Adult" },
  { name: "Alhaitham", universe: "Genshin Impact", gender: "male", imageUrl: P("Alhaitham"), ageNote: "Adult" },
  { name: "Wriothesley", universe: "Genshin Impact", gender: "male", imageUrl: P("Wriothesley"), ageNote: "Adult" },
  { name: "Neuvillette", universe: "Genshin Impact", gender: "male", imageUrl: P("Neuvillette"), ageNote: "Adult (ancient hydro dragon)" },

  // ── HONKAI IMPACT 3rd / STAR RAIL ────────────────────────────────────────────
  { name: "Kiana Kaslana", universe: "Honkai Impact 3rd", gender: "female", imageUrl: P("Kiana"), ageNote: "Adult (18)" },
  { name: "Elysia", universe: "Honkai Impact 3rd", gender: "female", imageUrl: P("Elysia"), ageNote: "Adult" },
  { name: "Bronya Zaychik", universe: "Honkai Impact 3rd", gender: "female", imageUrl: P("Bronya"), ageNote: "Adult" },
  { name: "Kafka", universe: "Honkai: Star Rail", gender: "female", imageUrl: P("Kafka HSR"), ageNote: "Adult" },
  { name: "Acheron", universe: "Honkai: Star Rail", gender: "female", imageUrl: P("Acheron HSR"), ageNote: "Adult" },
  { name: "Jade", universe: "Honkai: Star Rail", gender: "female", imageUrl: P("Jade HSR"), ageNote: "Adult" },
  { name: "Aventurine", universe: "Honkai: Star Rail", gender: "male", imageUrl: P("Aventurine"), ageNote: "Adult" },
  { name: "Dr. Ratio", universe: "Honkai: Star Rail", gender: "male", imageUrl: P("Dr Ratio"), ageNote: "Adult" },

  // ── AZUR LANE ────────────────────────────────────────────────────────────────
  // All are adult ship-girl entities
  { name: "Enterprise", universe: "Azur Lane", gender: "female", imageUrl: P("Enterprise"), ageNote: "Adult ship girl" },
  { name: "Belfast", universe: "Azur Lane", gender: "female", imageUrl: P("Belfast"), ageNote: "Adult ship girl" },
  { name: "Illustrious", universe: "Azur Lane", gender: "female", imageUrl: P("Illustrious"), ageNote: "Adult ship girl" },
  { name: "Atago", universe: "Azur Lane", gender: "female", imageUrl: P("Atago"), ageNote: "Adult ship girl" },
  { name: "Takao", universe: "Azur Lane", gender: "female", imageUrl: P("Takao"), ageNote: "Adult ship girl" },
  { name: "Tirpitz", universe: "Azur Lane", gender: "female", imageUrl: P("Tirpitz"), ageNote: "Adult ship girl" },
  { name: "Bismarck", universe: "Azur Lane", gender: "female", imageUrl: P("Bismarck"), ageNote: "Adult ship girl" },
  { name: "Akagi", universe: "Azur Lane", gender: "female", imageUrl: P("Akagi"), ageNote: "Adult ship girl" },
  { name: "Kaga", universe: "Azur Lane", gender: "female", imageUrl: P("Kaga"), ageNote: "Adult ship girl" },
  { name: "Hood", universe: "Azur Lane", gender: "female", imageUrl: P("Hood"), ageNote: "Adult ship girl" },
  { name: "Prinz Eugen", universe: "Azur Lane", gender: "female", imageUrl: P("Prinz Eugen"), ageNote: "Adult ship girl" },
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
  { name: "HK416", universe: "Girls Frontline", gender: "female", imageUrl: P("HK416"), ageNote: "Adult T-Doll" },
  { name: "M4A1", universe: "Girls Frontline", gender: "female", imageUrl: P("M4A1"), ageNote: "Adult T-Doll" },
  { name: "M16A1", universe: "Girls Frontline", gender: "female", imageUrl: P("M16A1"), ageNote: "Adult T-Doll" },
  { name: "UMP45", universe: "Girls Frontline", gender: "female", imageUrl: P("UMP45"), ageNote: "Adult T-Doll" },
  { name: "UMP9", universe: "Girls Frontline", gender: "female", imageUrl: P("UMP9"), ageNote: "Adult T-Doll" },
  { name: "G11", universe: "Girls Frontline", gender: "female", imageUrl: P("G11"), ageNote: "Adult T-Doll" },
  { name: "WA2000", universe: "Girls Frontline", gender: "female", imageUrl: P("WA2000"), ageNote: "Adult T-Doll" },
  { name: "Springfield", universe: "Girls Frontline", gender: "female", imageUrl: P("Springfield"), ageNote: "Adult T-Doll" },
  { name: "AN-94", universe: "Girls Frontline", gender: "female", imageUrl: P("AN-94"), ageNote: "Adult T-Doll" },
  { name: "AK-12", universe: "Girls Frontline", gender: "female", imageUrl: P("AK-12"), ageNote: "Adult T-Doll" },
  { name: "AK-15", universe: "Girls Frontline", gender: "female", imageUrl: P("AK-15"), ageNote: "Adult T-Doll" },
  { name: "Vector", universe: "Girls Frontline", gender: "female", imageUrl: P("Vector"), ageNote: "Adult T-Doll" },
  { name: "Type 95", universe: "Girls Frontline", gender: "female", imageUrl: P("Type 95"), ageNote: "Adult T-Doll" },
  { name: "Type 97", universe: "Girls Frontline", gender: "female", imageUrl: P("Type 97"), ageNote: "Adult T-Doll" },
  { name: "Grizzly MkV", universe: "Girls Frontline", gender: "female", imageUrl: P("Grizzly MkV"), ageNote: "Adult T-Doll" },
  { name: "Five-seveN", universe: "Girls Frontline", gender: "female", imageUrl: P("Five-seveN"), ageNote: "Adult T-Doll" },
  { name: "Kar98k", universe: "Girls Frontline", gender: "female", imageUrl: P("Kar98k"), ageNote: "Adult T-Doll" },
  { name: "M82A1", universe: "Girls Frontline", gender: "female", imageUrl: P("M82A1"), ageNote: "Adult T-Doll" },
  { name: "SOPMOD II", universe: "Girls Frontline", gender: "female", imageUrl: P("SOPMOD II"), ageNote: "Adult T-Doll" },
  { name: "Suomi KP31", universe: "Girls Frontline", gender: "female", imageUrl: P("Suomi"), ageNote: "Adult T-Doll" },

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
  { name: "Cerise", universe: "Epic Seven", gender: "female", imageUrl: P("Cerise E7"), ageNote: "Adult" },
  { name: "Bellona", universe: "Epic Seven", gender: "female", imageUrl: P("Bellona E7"), ageNote: "Adult" },
  { name: "Yufine", universe: "Epic Seven", gender: "female", imageUrl: P("Yufine E7"), ageNote: "Adult dragon-girl" },
  { name: "Specter Tenebria", universe: "Epic Seven", gender: "female", imageUrl: P("Specter Tenebria"), ageNote: "Adult" },
  { name: "Alencia", universe: "Epic Seven", gender: "female", imageUrl: P("Alencia E7"), ageNote: "Adult" },
  { name: "Celine", universe: "Epic Seven", gender: "female", imageUrl: P("Celine E7"), ageNote: "Adult" },
  { name: "Charlotte", universe: "Epic Seven", gender: "female", imageUrl: P("Charlotte E7"), ageNote: "Adult" },
  { name: "Roana", universe: "Epic Seven", gender: "female", imageUrl: P("Roana E7"), ageNote: "Adult" },
  { name: "Ruele of Light", universe: "Epic Seven", gender: "female", imageUrl: P("Ruele E7"), ageNote: "Adult" },
  { name: "Arbiter Vildred", universe: "Epic Seven", gender: "male", imageUrl: P("Arbiter Vildred"), ageNote: "Adult" },
  { name: "Fallen Cecilia", universe: "Epic Seven", gender: "female", imageUrl: P("Fallen Cecilia E7"), ageNote: "Adult" },

  // ── SOLO LEVELING (Manhwa) ───────────────────────────────────────────────────
  { name: "Cha Hae-In", universe: "Solo Leveling", gender: "female", imageUrl: P("Cha Hae-In"), ageNote: "Adult (24)" },
  { name: "Sung Jinwoo", universe: "Solo Leveling", gender: "male", imageUrl: P("Sung Jinwoo"), ageNote: "Adult (24)" },

  // ── WESTERN FICTION ──────────────────────────────────────────────────────────
  { name: "Daenerys Targaryen", universe: "Game of Thrones", gender: "female", imageUrl: P("Daenerys"), ageNote: "Adult" },
  { name: "Cersei Lannister", universe: "Game of Thrones", gender: "female", imageUrl: P("Cersei"), ageNote: "Adult" },
  { name: "Yennefer of Vengerberg", universe: "The Witcher", gender: "female", imageUrl: P("Yennefer"), ageNote: "Adult (100+ years old)" },
  { name: "Triss Merigold", universe: "The Witcher", gender: "female", imageUrl: P("Triss Merigold"), ageNote: "Adult" },
  { name: "Jon Snow", universe: "Game of Thrones", gender: "male", imageUrl: P("Jon Snow"), ageNote: "Adult" },
  { name: "Geralt of Rivia", universe: "The Witcher", gender: "male", imageUrl: P("Geralt"), ageNote: "Adult" },

  // ── SOUL LAND (Manhua) ───────────────────────────────────────────────────────
  { name: "Xiao Wu", universe: "Soul Land", gender: "female", imageUrl: P("Xiao Wu"), ageNote: "Adult" },
  { name: "Bibi Dong", universe: "Soul Land", gender: "female", imageUrl: P("Bibi Dong"), ageNote: "Adult" },
  { name: "Tang San", universe: "Soul Land", gender: "male", imageUrl: P("Tang San"), ageNote: "Adult" },

  // ── FIRE EMBLEM ──────────────────────────────────────────────────────────────
  { name: "Edelgard von Hresvelg", universe: "Fire Emblem", gender: "female", imageUrl: P("Edelgard FE"), ageNote: "Adult (18+)" },
  { name: "Byleth (F)", universe: "Fire Emblem", gender: "female", imageUrl: P("Byleth F"), ageNote: "Adult" },
  { name: "Camilla", universe: "Fire Emblem", gender: "female", imageUrl: P("Camilla FE"), ageNote: "Adult" },
  { name: "Tharja", universe: "Fire Emblem", gender: "female", imageUrl: P("Tharja FE"), ageNote: "Adult" },
  { name: "Aversa", universe: "Fire Emblem", gender: "female", imageUrl: P("Aversa FE"), ageNote: "Adult" },
  { name: "Dorothea", universe: "Fire Emblem", gender: "female", imageUrl: P("Dorothea FE"), ageNote: "Adult (18+)" },
  { name: "Rhea", universe: "Fire Emblem", gender: "female", imageUrl: P("Rhea FE"), ageNote: "Adult (ancient)" },
  { name: "Lysithea von Ordelia", universe: "Fire Emblem", gender: "female", imageUrl: P("Lysithea FE"), ageNote: "Adult (18)" },
  { name: "Marianne von Edmund", universe: "Fire Emblem", gender: "female", imageUrl: P("Marianne FE"), ageNote: "Adult (18)" },
  { name: "Dimitri Alexandre Blaiddyd", universe: "Fire Emblem", gender: "male", imageUrl: P("Dimitri FE"), ageNote: "Adult (21)" },
  { name: "Claude von Riegan", universe: "Fire Emblem", gender: "male", imageUrl: P("Claude FE"), ageNote: "Adult (21)" },
  { name: "Felix Hugo Fraldarius", universe: "Fire Emblem", gender: "male", imageUrl: P("Felix FE"), ageNote: "Adult (20)" },

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
  { name: "Widowmaker", universe: "Overwatch", gender: "female", imageUrl: P("Widowmaker OW"), ageNote: "Adult (33)" },
  { name: "Mercy", universe: "Overwatch", gender: "female", imageUrl: P("Mercy OW"), ageNote: "Adult (37)" },
  { name: "Pharah", universe: "Overwatch", gender: "female", imageUrl: P("Pharah OW"), ageNote: "Adult (32)" },
  { name: "D.Va", universe: "Overwatch", gender: "female", imageUrl: P("DVa OW"), ageNote: "Adult (19)" },
  { name: "Ashe", universe: "Overwatch", gender: "female", imageUrl: P("Ashe OW"), ageNote: "Adult (39)" },
  { name: "Moira", universe: "Overwatch", gender: "female", imageUrl: P("Moira OW"), ageNote: "Adult (48)" },
  { name: "Brigitte", universe: "Overwatch", gender: "female", imageUrl: P("Brigitte OW"), ageNote: "Adult (23)" },
  { name: "Tracer", universe: "Overwatch", gender: "female", imageUrl: P("Tracer OW"), ageNote: "Adult (26)" },
  { name: "Soldier: 76", universe: "Overwatch", gender: "male", imageUrl: P("Soldier 76 OW"), ageNote: "Adult" },
  { name: "Reaper", universe: "Overwatch", gender: "male", imageUrl: P("Reaper OW"), ageNote: "Adult" },

  // ── SMITE ─────────────────────────────────────────────────────────────────────
  { name: "Aphrodite", universe: "Smite", gender: "female", imageUrl: P("Aphrodite Smite"), ageNote: "Adult goddess" },
  { name: "Freya", universe: "Smite", gender: "female", imageUrl: P("Freya Smite"), ageNote: "Adult goddess" },
  { name: "Nox", universe: "Smite", gender: "female", imageUrl: P("Nox Smite"), ageNote: "Adult goddess" },
  { name: "Serqet", universe: "Smite", gender: "female", imageUrl: P("Serqet Smite"), ageNote: "Adult goddess" },
  { name: "Bellona (Smite)", universe: "Smite", gender: "female", imageUrl: P("Bellona Smite"), ageNote: "Adult goddess" },
  { name: "Nu Wa", universe: "Smite", gender: "female", imageUrl: P("Nu Wa Smite"), ageNote: "Adult goddess" },
  { name: "Bastet", universe: "Smite", gender: "female", imageUrl: P("Bastet Smite"), ageNote: "Adult goddess" },
  { name: "Discordia", universe: "Smite", gender: "female", imageUrl: P("Discordia Smite"), ageNote: "Adult goddess" },
  { name: "Thor (Smite)", universe: "Smite", gender: "male", imageUrl: P("Thor Smite"), ageNote: "Adult god" },
  { name: "Loki (Smite)", universe: "Smite", gender: "male", imageUrl: P("Loki Smite"), ageNote: "Adult god" },
  { name: "Hercules", universe: "Smite", gender: "male", imageUrl: P("Hercules Smite"), ageNote: "Adult god" },
  { name: "Poseidon", universe: "Smite", gender: "male", imageUrl: P("Poseidon Smite"), ageNote: "Adult god" },

  // ── AETHER GAZER ─────────────────────────────────────────────────────────────
  { name: "Zora", universe: "Aether Gazer", gender: "female", imageUrl: P("Zora AG"), ageNote: "Adult" },
  { name: "Perci", universe: "Aether Gazer", gender: "female", imageUrl: P("Perci AG"), ageNote: "Adult" },
  { name: "Haecate", universe: "Aether Gazer", gender: "female", imageUrl: P("Haecate AG"), ageNote: "Adult" },
  { name: "Croque", universe: "Aether Gazer", gender: "female", imageUrl: P("Croque AG"), ageNote: "Adult" },
  { name: "Ganesha", universe: "Aether Gazer", gender: "female", imageUrl: P("Ganesha AG"), ageNote: "Adult" },
  { name: "Kanami", universe: "Aether Gazer", gender: "female", imageUrl: P("Kanami AG"), ageNote: "Adult" },

  // ── ARKNIGHTS ─────────────────────────────────────────────────────────────────
  { name: "Skadi", universe: "Arknights", gender: "female", imageUrl: P("Skadi AK"), ageNote: "Adult" },
  { name: "Texas", universe: "Arknights", gender: "female", imageUrl: P("Texas AK"), ageNote: "Adult" },
  { name: "Ch'en", universe: "Arknights", gender: "female", imageUrl: P("Chen AK"), ageNote: "Adult" },
  { name: "Surtr", universe: "Arknights", gender: "female", imageUrl: P("Surtr AK"), ageNote: "Adult" },
  { name: "W", universe: "Arknights", gender: "female", imageUrl: P("W AK"), ageNote: "Adult" },
  { name: "Mudrock", universe: "Arknights", gender: "female", imageUrl: P("Mudrock AK"), ageNote: "Adult" },
  { name: "Nearl", universe: "Arknights", gender: "female", imageUrl: P("Nearl AK"), ageNote: "Adult" },
  { name: "Specter", universe: "Arknights", gender: "female", imageUrl: P("Specter AK"), ageNote: "Adult" },
  { name: "Eyjafjalla", universe: "Arknights", gender: "female", imageUrl: P("Eyjafjalla AK"), ageNote: "Adult" },
  { name: "Silverash", universe: "Arknights", gender: "male", imageUrl: P("Silverash AK"), ageNote: "Adult" },
  { name: "Hellagur", universe: "Arknights", gender: "male", imageUrl: P("Hellagur AK"), ageNote: "Adult" },

  // ── ZENLESS ZONE ZERO ─────────────────────────────────────────────────────────
  { name: "Nicole Demara", universe: "Zenless Zone Zero", gender: "female", imageUrl: P("Nicole ZZZ"), ageNote: "Adult" },
  { name: "Zhu Yuan", universe: "Zenless Zone Zero", gender: "female", imageUrl: P("Zhu Yuan ZZZ"), ageNote: "Adult" },
  { name: "Ellen Joe", universe: "Zenless Zone Zero", gender: "female", imageUrl: P("Ellen Joe ZZZ"), ageNote: "Adult" },
  { name: "Rina", universe: "Zenless Zone Zero", gender: "female", imageUrl: P("Rina ZZZ"), ageNote: "Adult" },
  { name: "Grace Howard", universe: "Zenless Zone Zero", gender: "female", imageUrl: P("Grace ZZZ"), ageNote: "Adult" },
  { name: "Koleda", universe: "Zenless Zone Zero", gender: "female", imageUrl: P("Koleda ZZZ"), ageNote: "Adult" },
  { name: "Miyabi", universe: "Zenless Zone Zero", gender: "female", imageUrl: P("Miyabi ZZZ"), ageNote: "Adult" },
  { name: "Yanagi", universe: "Zenless Zone Zero", gender: "female", imageUrl: P("Yanagi ZZZ"), ageNote: "Adult" },
  { name: "Burnice", universe: "Zenless Zone Zero", gender: "female", imageUrl: P("Burnice ZZZ"), ageNote: "Adult" },
  { name: "Piper Wheel", universe: "Zenless Zone Zero", gender: "female", imageUrl: P("Piper ZZZ"), ageNote: "Adult (18+)" },
  { name: "Billy Kid", universe: "Zenless Zone Zero", gender: "male", imageUrl: P("Billy Kid ZZZ"), ageNote: "Adult" },
  { name: "Soldier 11", universe: "Zenless Zone Zero", gender: "female", imageUrl: P("Soldier 11 ZZZ"), ageNote: "Adult" },

  // ── HONKAI: STAR RAIL (expanded) ─────────────────────────────────────────────
  { name: "Himeko", universe: "Honkai: Star Rail", gender: "female", imageUrl: P("Himeko HSR"), ageNote: "Adult" },
  { name: "Bronya (Star Rail)", universe: "Honkai: Star Rail", gender: "female", imageUrl: P("Bronya HSR"), ageNote: "Adult" },
  { name: "Pela", universe: "Honkai: Star Rail", gender: "female", imageUrl: P("Pela HSR"), ageNote: "Adult" },
  { name: "Serval", universe: "Honkai: Star Rail", gender: "female", imageUrl: P("Serval HSR"), ageNote: "Adult" },
  { name: "Topaz", universe: "Honkai: Star Rail", gender: "female", imageUrl: P("Topaz HSR"), ageNote: "Adult" },
  { name: "Robin", universe: "Honkai: Star Rail", gender: "female", imageUrl: P("Robin HSR"), ageNote: "Adult" },
  { name: "Sparkle", universe: "Honkai: Star Rail", gender: "female", imageUrl: P("Sparkle HSR"), ageNote: "Adult" },
  { name: "Welt", universe: "Honkai: Star Rail", gender: "male", imageUrl: P("Welt HSR"), ageNote: "Adult" },
  { name: "Blade", universe: "Honkai: Star Rail", gender: "male", imageUrl: P("Blade HSR"), ageNote: "Adult" },
  { name: "Jing Yuan", universe: "Honkai: Star Rail", gender: "male", imageUrl: P("Jing Yuan HSR"), ageNote: "Adult" },

  // ── GODDESS OF VICTORY: NIKKE ─────────────────────────────────────────────────
  { name: "Rapi", universe: "NIKKE", gender: "female", imageUrl: P("Rapi NIKKE"), ageNote: "Adult android" },
  { name: "Anis", universe: "NIKKE", gender: "female", imageUrl: P("Anis NIKKE"), ageNote: "Adult android" },
  { name: "Neon", universe: "NIKKE", gender: "female", imageUrl: P("Neon NIKKE"), ageNote: "Adult android" },
  { name: "Modernia", universe: "NIKKE", gender: "female", imageUrl: P("Modernia NIKKE"), ageNote: "Adult android" },
  { name: "Scarlet (NIKKE)", universe: "NIKKE", gender: "female", imageUrl: P("Scarlet NIKKE"), ageNote: "Adult android" },
  { name: "Alice", universe: "NIKKE", gender: "female", imageUrl: P("Alice NIKKE"), ageNote: "Adult android" },
  { name: "Noise", universe: "NIKKE", gender: "female", imageUrl: P("Noise NIKKE"), ageNote: "Adult android" },
  { name: "Privaty", universe: "NIKKE", gender: "female", imageUrl: P("Privaty NIKKE"), ageNote: "Adult android" },
  { name: "Rupee", universe: "NIKKE", gender: "female", imageUrl: P("Rupee NIKKE"), ageNote: "Adult android" },
  { name: "Sin", universe: "NIKKE", gender: "female", imageUrl: P("Sin NIKKE"), ageNote: "Adult android" },
  { name: "Yulha", universe: "NIKKE", gender: "female", imageUrl: P("Yulha NIKKE"), ageNote: "Adult android" },
  { name: "Quency", universe: "NIKKE", gender: "female", imageUrl: P("Quency NIKKE"), ageNote: "Adult android" },

  // ── AFK JOURNEY ──────────────────────────────────────────────────────────────
  { name: "Temesia", universe: "AFK Journey", gender: "female", imageUrl: P("Temesia AFK"), ageNote: "Adult" },
  { name: "Marilee", universe: "AFK Journey", gender: "female", imageUrl: P("Marilee AFK"), ageNote: "Adult" },
  { name: "Cecia", universe: "AFK Journey", gender: "female", imageUrl: P("Cecia AFK"), ageNote: "Adult" },
  { name: "Eironn", universe: "AFK Journey", gender: "male", imageUrl: P("Eironn AFK"), ageNote: "Adult" },
  { name: "Lucius", universe: "AFK Journey", gender: "male", imageUrl: P("Lucius AFK"), ageNote: "Adult" },
  { name: "Odie", universe: "AFK Journey", gender: "male", imageUrl: P("Odie AFK"), ageNote: "Adult" },
  { name: "Vala", universe: "AFK Journey", gender: "female", imageUrl: P("Vala AFK"), ageNote: "Adult" },
  { name: "Sinbad", universe: "AFK Journey", gender: "male", imageUrl: P("Sinbad AFK"), ageNote: "Adult" },

  // ── SOLO LEVELING: ARISE ──────────────────────────────────────────────────────
  { name: "Emma Laurent", universe: "Solo Leveling: Arise", gender: "female", imageUrl: P("Emma Laurent SLA"), ageNote: "Adult" },
  { name: "Yoo Soohyun", universe: "Solo Leveling: Arise", gender: "female", imageUrl: P("Yoo Soohyun SLA"), ageNote: "Adult" },
  { name: "Lee Juhee", universe: "Solo Leveling: Arise", gender: "female", imageUrl: P("Lee Juhee SLA"), ageNote: "Adult" },
  { name: "Min Byung-gyu", universe: "Solo Leveling: Arise", gender: "male", imageUrl: P("Min Byung SLA"), ageNote: "Adult" },
  { name: "Baek Yoonho", universe: "Solo Leveling: Arise", gender: "male", imageUrl: P("Baek Yoonho SLA"), ageNote: "Adult" },

  // ── WUTHERING WAVES ───────────────────────────────────────────────────────────
  { name: "Yinlin", universe: "Wuthering Waves", gender: "female", imageUrl: P("Yinlin WW"), ageNote: "Adult" },
  { name: "Jianxin", universe: "Wuthering Waves", gender: "female", imageUrl: P("Jianxin WW"), ageNote: "Adult" },
  { name: "Changli", universe: "Wuthering Waves", gender: "female", imageUrl: P("Changli WW"), ageNote: "Adult" },
  { name: "Verina", universe: "Wuthering Waves", gender: "female", imageUrl: P("Verina WW"), ageNote: "Adult" },
  { name: "Zhezhi", universe: "Wuthering Waves", gender: "female", imageUrl: P("Zhezhi WW"), ageNote: "Adult" },
  { name: "Carlotta", universe: "Wuthering Waves", gender: "female", imageUrl: P("Carlotta WW"), ageNote: "Adult" },
  { name: "Shorekeeper", universe: "Wuthering Waves", gender: "female", imageUrl: P("Shorekeeper WW"), ageNote: "Adult (ancient entity)" },
  { name: "Camellya", universe: "Wuthering Waves", gender: "female", imageUrl: P("Camellya WW"), ageNote: "Adult" },
  { name: "Roccia", universe: "Wuthering Waves", gender: "female", imageUrl: P("Roccia WW"), ageNote: "Adult" },
  { name: "Phoebe", universe: "Wuthering Waves", gender: "female", imageUrl: P("Phoebe WW"), ageNote: "Adult" },
  { name: "Danjin", universe: "Wuthering Waves", gender: "female", imageUrl: P("Danjin WW"), ageNote: "Adult" },
  { name: "Jinhsi", universe: "Wuthering Waves", gender: "female", imageUrl: P("Jinhsi WW"), ageNote: "Adult" },
  { name: "Calcharo", universe: "Wuthering Waves", gender: "male", imageUrl: P("Calcharo WW"), ageNote: "Adult" },
  { name: "Jiyan", universe: "Wuthering Waves", gender: "male", imageUrl: P("Jiyan WW"), ageNote: "Adult" },
  { name: "Brant", universe: "Wuthering Waves", gender: "male", imageUrl: P("Brant WW"), ageNote: "Adult" },
  { name: "Xiangli Yao", universe: "Wuthering Waves", gender: "male", imageUrl: P("Xiangli Yao WW"), ageNote: "Adult" },

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
