import { db } from "@workspace/db";
import { charactersTable } from "@workspace/db/schema";

const PLACEHOLDER = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=400&background=1a1a2e&color=e040fb&bold=true&font-size=0.2`;

const characters = [
  // Marvel - Female
  { name: "Black Widow", universe: "Marvel", gender: "female", imageUrl: "https://cdn.marvel.com/content/1x/blackwidow_lob_crd_03.jpg", ageNote: "Adult" },
  { name: "Storm", universe: "Marvel", gender: "female", imageUrl: "https://cdn.marvel.com/content/1x/storm_lob_crd_01.jpg", ageNote: "Adult" },
  { name: "Scarlet Witch", universe: "Marvel", gender: "female", imageUrl: "https://cdn.marvel.com/content/1x/scarletwitch_lob_crd_01.jpg", ageNote: "Adult" },
  { name: "She-Hulk", universe: "Marvel", gender: "female", imageUrl: PLACEHOLDER("She-Hulk"), ageNote: "Adult" },
  { name: "Ms. Marvel (Carol Danvers)", universe: "Marvel", gender: "female", imageUrl: PLACEHOLDER("Ms. Marvel"), ageNote: "Adult" },
  { name: "Psylocke", universe: "Marvel", gender: "female", imageUrl: PLACEHOLDER("Psylocke"), ageNote: "Adult" },
  { name: "Rogue", universe: "Marvel", gender: "female", imageUrl: PLACEHOLDER("Rogue"), ageNote: "Adult" },
  { name: "Spider-Woman", universe: "Marvel", gender: "female", imageUrl: PLACEHOLDER("Spider-Woman"), ageNote: "Adult" },
  // Marvel - Male
  { name: "Thor", universe: "Marvel", gender: "male", imageUrl: PLACEHOLDER("Thor"), ageNote: "Adult" },
  { name: "Iron Man", universe: "Marvel", gender: "male", imageUrl: PLACEHOLDER("Iron Man"), ageNote: "Adult" },
  { name: "Captain America", universe: "Marvel", gender: "male", imageUrl: PLACEHOLDER("Captain America"), ageNote: "Adult" },
  { name: "Wolverine", universe: "Marvel", gender: "male", imageUrl: PLACEHOLDER("Wolverine"), ageNote: "Adult" },
  { name: "Deadpool", universe: "Marvel", gender: "male", imageUrl: PLACEHOLDER("Deadpool"), ageNote: "Adult" },
  { name: "Black Panther", universe: "Marvel", gender: "male", imageUrl: PLACEHOLDER("Black Panther"), ageNote: "Adult" },
  { name: "Doctor Strange", universe: "Marvel", gender: "male", imageUrl: PLACEHOLDER("Doctor Strange"), ageNote: "Adult" },
  { name: "Gambit", universe: "Marvel", gender: "male", imageUrl: PLACEHOLDER("Gambit"), ageNote: "Adult" },
  // DC - Female
  { name: "Wonder Woman", universe: "DC", gender: "female", imageUrl: PLACEHOLDER("Wonder Woman"), ageNote: "Adult" },
  { name: "Zatanna", universe: "DC", gender: "female", imageUrl: PLACEHOLDER("Zatanna"), ageNote: "Adult" },
  { name: "Starfire", universe: "DC", gender: "female", imageUrl: PLACEHOLDER("Starfire"), ageNote: "Adult" },
  { name: "Catwoman", universe: "DC", gender: "female", imageUrl: PLACEHOLDER("Catwoman"), ageNote: "Adult" },
  { name: "Harley Quinn", universe: "DC", gender: "female", imageUrl: PLACEHOLDER("Harley Quinn"), ageNote: "Adult" },
  { name: "Black Canary", universe: "DC", gender: "female", imageUrl: PLACEHOLDER("Black Canary"), ageNote: "Adult" },
  { name: "Power Girl", universe: "DC", gender: "female", imageUrl: PLACEHOLDER("Power Girl"), ageNote: "Adult" },
  { name: "Huntress", universe: "DC", gender: "female", imageUrl: PLACEHOLDER("Huntress"), ageNote: "Adult" },
  // DC - Male
  { name: "Batman", universe: "DC", gender: "male", imageUrl: PLACEHOLDER("Batman"), ageNote: "Adult" },
  { name: "Superman", universe: "DC", gender: "male", imageUrl: PLACEHOLDER("Superman"), ageNote: "Adult" },
  { name: "Green Arrow", universe: "DC", gender: "male", imageUrl: PLACEHOLDER("Green Arrow"), ageNote: "Adult" },
  { name: "The Flash", universe: "DC", gender: "male", imageUrl: PLACEHOLDER("The Flash"), ageNote: "Adult" },
  { name: "Aquaman", universe: "DC", gender: "male", imageUrl: PLACEHOLDER("Aquaman"), ageNote: "Adult" },
  { name: "Green Lantern", universe: "DC", gender: "male", imageUrl: PLACEHOLDER("Green Lantern"), ageNote: "Adult" },
  { name: "Nightwing", universe: "DC", gender: "male", imageUrl: PLACEHOLDER("Nightwing"), ageNote: "Adult" },
  { name: "Lobo", universe: "DC", gender: "male", imageUrl: PLACEHOLDER("Lobo"), ageNote: "Adult" },
  // One Piece
  { name: "Boa Hancock", universe: "One Piece", gender: "female", imageUrl: PLACEHOLDER("Boa Hancock"), ageNote: "Adult (31)" },
  { name: "Nico Robin", universe: "One Piece", gender: "female", imageUrl: PLACEHOLDER("Nico Robin"), ageNote: "Adult (30)" },
  { name: "Nami", universe: "One Piece", gender: "female", imageUrl: PLACEHOLDER("Nami"), ageNote: "Adult (20)" },
  { name: "Nami (Post-Skip)", universe: "One Piece", gender: "female", imageUrl: PLACEHOLDER("Nami Post-Skip"), ageNote: "Adult (20)" },
  { name: "Robin (Post-Skip)", universe: "One Piece", gender: "female", imageUrl: PLACEHOLDER("Robin Post-Skip"), ageNote: "Adult (30)" },
  { name: "Roronoa Zoro", universe: "One Piece", gender: "male", imageUrl: PLACEHOLDER("Zoro"), ageNote: "Adult (21)" },
  { name: "Trafalgar Law", universe: "One Piece", gender: "male", imageUrl: PLACEHOLDER("Trafalgar Law"), ageNote: "Adult (26)" },
  // Attack on Titan
  { name: "Mikasa Ackerman", universe: "Attack on Titan", gender: "female", imageUrl: PLACEHOLDER("Mikasa"), ageNote: "Adult (19)" },
  { name: "Levi Ackerman", universe: "Attack on Titan", gender: "male", imageUrl: PLACEHOLDER("Levi Ackerman"), ageNote: "Adult (30s)" },
  { name: "Erwin Smith", universe: "Attack on Titan", gender: "male", imageUrl: PLACEHOLDER("Erwin Smith"), ageNote: "Adult" },
  // Fairy Tail
  { name: "Erza Scarlet", universe: "Fairy Tail", gender: "female", imageUrl: PLACEHOLDER("Erza Scarlet"), ageNote: "Adult (19)" },
  // Naruto
  { name: "Hinata Hyuga", universe: "Naruto", gender: "female", imageUrl: PLACEHOLDER("Hinata"), ageNote: "Adult (18)" },
  { name: "Tsunade", universe: "Naruto", gender: "female", imageUrl: PLACEHOLDER("Tsunade"), ageNote: "Adult (54)" },
  { name: "Kushina Uzumaki", universe: "Naruto", gender: "female", imageUrl: PLACEHOLDER("Kushina"), ageNote: "Adult" },
  { name: "Naruto Uzumaki", universe: "Naruto", gender: "male", imageUrl: PLACEHOLDER("Naruto"), ageNote: "Adult (19+)" },
  { name: "Sasuke Uchiha", universe: "Naruto", gender: "male", imageUrl: PLACEHOLDER("Sasuke"), ageNote: "Adult (19+)" },
  { name: "Itachi Uchiha", universe: "Naruto", gender: "male", imageUrl: PLACEHOLDER("Itachi"), ageNote: "Adult" },
  // Dragon Ball
  { name: "Android 18", universe: "Dragon Ball", gender: "female", imageUrl: PLACEHOLDER("Android 18"), ageNote: "Adult" },
  { name: "Bulma", universe: "Dragon Ball", gender: "female", imageUrl: PLACEHOLDER("Bulma"), ageNote: "Adult" },
  { name: "Goku", universe: "Dragon Ball", gender: "male", imageUrl: PLACEHOLDER("Goku"), ageNote: "Adult" },
  { name: "Vegeta", universe: "Dragon Ball", gender: "male", imageUrl: PLACEHOLDER("Vegeta"), ageNote: "Adult" },
  // My Hero Academia
  { name: "Midnight (Nemuri Kayama)", universe: "My Hero Academia", gender: "female", imageUrl: PLACEHOLDER("Midnight MHA"), ageNote: "Adult (30)" },
  { name: "Mt. Lady", universe: "My Hero Academia", gender: "female", imageUrl: PLACEHOLDER("Mt. Lady"), ageNote: "Adult (23)" },
  { name: "Mirko", universe: "My Hero Academia", gender: "female", imageUrl: PLACEHOLDER("Mirko"), ageNote: "Adult (27)" },
  // Bleach
  { name: "Yoruichi Shihouin", universe: "Bleach", gender: "female", imageUrl: PLACEHOLDER("Yoruichi"), ageNote: "Adult" },
  { name: "Rangiku Matsumoto", universe: "Bleach", gender: "female", imageUrl: PLACEHOLDER("Rangiku"), ageNote: "Adult" },
  { name: "Ichigo Kurosaki", universe: "Bleach", gender: "male", imageUrl: PLACEHOLDER("Ichigo"), ageNote: "Adult (18)" },
  { name: "Grimmjow Jaegerjaquez", universe: "Bleach", gender: "male", imageUrl: PLACEHOLDER("Grimmjow"), ageNote: "Adult" },
  // High School DxD
  { name: "Rias Gremory", universe: "High School DxD", gender: "female", imageUrl: PLACEHOLDER("Rias Gremory"), ageNote: "Adult (18+)" },
  { name: "Akeno Himejima", universe: "High School DxD", gender: "female", imageUrl: PLACEHOLDER("Akeno Himejima"), ageNote: "Adult (18+)" },
  // Jujutsu Kaisen
  { name: "Maki Zenin", universe: "Jujutsu Kaisen", gender: "female", imageUrl: PLACEHOLDER("Maki Zenin"), ageNote: "Adult (28)" },
  { name: "Nobara Kugisaki", universe: "Jujutsu Kaisen", gender: "female", imageUrl: PLACEHOLDER("Nobara"), ageNote: "Adult (18)" },
  { name: "Gojo Satoru", universe: "Jujutsu Kaisen", gender: "male", imageUrl: PLACEHOLDER("Gojo Satoru"), ageNote: "Adult (28)" },
  // Genshin Impact - Female
  { name: "Raiden Shogun", universe: "Genshin Impact", gender: "female", imageUrl: PLACEHOLDER("Raiden Shogun"), ageNote: "Adult (millennia old deity)" },
  { name: "Ningguang", universe: "Genshin Impact", gender: "female", imageUrl: PLACEHOLDER("Ningguang"), ageNote: "Adult" },
  { name: "Hu Tao", universe: "Genshin Impact", gender: "female", imageUrl: PLACEHOLDER("Hu Tao"), ageNote: "Adult (20)" },
  { name: "Ganyu", universe: "Genshin Impact", gender: "female", imageUrl: PLACEHOLDER("Ganyu"), ageNote: "Adult (3000+ years old)" },
  { name: "Yelan", universe: "Genshin Impact", gender: "female", imageUrl: PLACEHOLDER("Yelan"), ageNote: "Adult" },
  { name: "Beidou", universe: "Genshin Impact", gender: "female", imageUrl: PLACEHOLDER("Beidou"), ageNote: "Adult" },
  { name: "Yae Miko", universe: "Genshin Impact", gender: "female", imageUrl: PLACEHOLDER("Yae Miko"), ageNote: "Adult (ancient kitsune)" },
  { name: "Shenhe", universe: "Genshin Impact", gender: "female", imageUrl: PLACEHOLDER("Shenhe"), ageNote: "Adult" },
  { name: "Navia", universe: "Genshin Impact", gender: "female", imageUrl: PLACEHOLDER("Navia"), ageNote: "Adult (20s)" },
  { name: "Furina", universe: "Genshin Impact", gender: "female", imageUrl: PLACEHOLDER("Furina"), ageNote: "Adult (500+ years)" },
  // Genshin Impact - Male
  { name: "Zhongli", universe: "Genshin Impact", gender: "male", imageUrl: PLACEHOLDER("Zhongli"), ageNote: "Adult (6000+ year old archon)" },
  { name: "Diluc", universe: "Genshin Impact", gender: "male", imageUrl: PLACEHOLDER("Diluc"), ageNote: "Adult (22)" },
  { name: "Kaeya", universe: "Genshin Impact", gender: "male", imageUrl: PLACEHOLDER("Kaeya"), ageNote: "Adult" },
  { name: "Cyno", universe: "Genshin Impact", gender: "male", imageUrl: PLACEHOLDER("Cyno"), ageNote: "Adult" },
  { name: "Alhaitham", universe: "Genshin Impact", gender: "male", imageUrl: PLACEHOLDER("Alhaitham"), ageNote: "Adult" },
  { name: "Wriothesley", universe: "Genshin Impact", gender: "male", imageUrl: PLACEHOLDER("Wriothesley"), ageNote: "Adult (30s)" },
  { name: "Neuvillette", universe: "Genshin Impact", gender: "male", imageUrl: PLACEHOLDER("Neuvillette"), ageNote: "Adult (ancient hydro dragon)" },
  { name: "Baizhu", universe: "Genshin Impact", gender: "male", imageUrl: PLACEHOLDER("Baizhu"), ageNote: "Adult" },
  // Azur Lane - Female (ship girls, all adult)
  { name: "Enterprise", universe: "Azur Lane", gender: "female", imageUrl: PLACEHOLDER("Enterprise"), ageNote: "Adult ship girl" },
  { name: "Belfast", universe: "Azur Lane", gender: "female", imageUrl: PLACEHOLDER("Belfast"), ageNote: "Adult ship girl" },
  { name: "Illustrious", universe: "Azur Lane", gender: "female", imageUrl: PLACEHOLDER("Illustrious"), ageNote: "Adult ship girl" },
  { name: "Atago", universe: "Azur Lane", gender: "female", imageUrl: PLACEHOLDER("Atago"), ageNote: "Adult ship girl" },
  { name: "Takao", universe: "Azur Lane", gender: "female", imageUrl: PLACEHOLDER("Takao"), ageNote: "Adult ship girl" },
  { name: "Tirpitz", universe: "Azur Lane", gender: "female", imageUrl: PLACEHOLDER("Tirpitz"), ageNote: "Adult ship girl" },
  { name: "Bismarck", universe: "Azur Lane", gender: "female", imageUrl: PLACEHOLDER("Bismarck"), ageNote: "Adult ship girl" },
  { name: "Akagi", universe: "Azur Lane", gender: "female", imageUrl: PLACEHOLDER("Akagi"), ageNote: "Adult ship girl" },
  { name: "Kaga", universe: "Azur Lane", gender: "female", imageUrl: PLACEHOLDER("Kaga"), ageNote: "Adult ship girl" },
  { name: "Hood", universe: "Azur Lane", gender: "female", imageUrl: PLACEHOLDER("Hood"), ageNote: "Adult ship girl" },
  // Epic Seven
  { name: "Cerise", universe: "Epic Seven", gender: "female", imageUrl: PLACEHOLDER("Cerise"), ageNote: "Adult" },
  { name: "Bellona", universe: "Epic Seven", gender: "female", imageUrl: PLACEHOLDER("Bellona"), ageNote: "Adult" },
  { name: "Yufine", universe: "Epic Seven", gender: "female", imageUrl: PLACEHOLDER("Yufine"), ageNote: "Adult dragon-girl" },
  { name: "Specter Tenebria", universe: "Epic Seven", gender: "female", imageUrl: PLACEHOLDER("Specter Tenebria"), ageNote: "Adult" },
  { name: "Alencia", universe: "Epic Seven", gender: "female", imageUrl: PLACEHOLDER("Alencia"), ageNote: "Adult" },
  { name: "Celine", universe: "Epic Seven", gender: "female", imageUrl: PLACEHOLDER("Celine"), ageNote: "Adult" },
  { name: "Arbiter Vildred", universe: "Epic Seven", gender: "male", imageUrl: PLACEHOLDER("Arbiter Vildred"), ageNote: "Adult" },
  // Solo Leveling / Manhwa
  { name: "Cha Hae-In", universe: "Solo Leveling", gender: "female", imageUrl: PLACEHOLDER("Cha Hae-In"), ageNote: "Adult (24)" },
  { name: "Sung Jinwoo", universe: "Solo Leveling", gender: "male", imageUrl: PLACEHOLDER("Sung Jinwoo"), ageNote: "Adult (24)" },
  // Tower of God
  { name: "Sooha", universe: "Tower of God", gender: "female", imageUrl: PLACEHOLDER("Sooha"), ageNote: "Adult" },
  { name: "Bam", universe: "Tower of God", gender: "male", imageUrl: PLACEHOLDER("Bam"), ageNote: "Adult" },
  // The Beginning After the End
  { name: "Eris Baumgartner", universe: "The Beginning After the End", gender: "female", imageUrl: PLACEHOLDER("Eris TBATE"), ageNote: "Adult (20+)" },
  { name: "Sylvie", universe: "The Beginning After the End", gender: "female", imageUrl: PLACEHOLDER("Sylvie TBATE"), ageNote: "Adult dragon" },
  { name: "Arthur Leywin", universe: "The Beginning After the End", gender: "male", imageUrl: PLACEHOLDER("Arthur Leywin"), ageNote: "Adult" },
  // Western Fiction - Female
  { name: "Daenerys Targaryen", universe: "Game of Thrones", gender: "female", imageUrl: PLACEHOLDER("Daenerys"), ageNote: "Adult" },
  { name: "Cersei Lannister", universe: "Game of Thrones", gender: "female", imageUrl: PLACEHOLDER("Cersei"), ageNote: "Adult" },
  { name: "Margaery Tyrell", universe: "Game of Thrones", gender: "female", imageUrl: PLACEHOLDER("Margaery"), ageNote: "Adult" },
  { name: "Triss Merigold", universe: "The Witcher", gender: "female", imageUrl: PLACEHOLDER("Triss Merigold"), ageNote: "Adult" },
  { name: "Yennefer of Vengerberg", universe: "The Witcher", gender: "female", imageUrl: PLACEHOLDER("Yennefer"), ageNote: "Adult (100+ years old sorceress)" },
  // Western Fiction - Male
  { name: "Jon Snow", universe: "Game of Thrones", gender: "male", imageUrl: PLACEHOLDER("Jon Snow"), ageNote: "Adult" },
  { name: "Geralt of Rivia", universe: "The Witcher", gender: "male", imageUrl: PLACEHOLDER("Geralt"), ageNote: "Adult" },
  { name: "Aragorn", universe: "Lord of the Rings", gender: "male", imageUrl: PLACEHOLDER("Aragorn"), ageNote: "Adult" },
  { name: "Legolas", universe: "Lord of the Rings", gender: "male", imageUrl: PLACEHOLDER("Legolas"), ageNote: "Adult (2900+ year old elf)" },
  // Manga - Other
  { name: "Fubuki", universe: "One Punch Man", gender: "female", imageUrl: PLACEHOLDER("Fubuki"), ageNote: "Adult (23)" },
  { name: "Tatsumaki", universe: "One Punch Man", gender: "female", imageUrl: PLACEHOLDER("Tatsumaki"), ageNote: "Adult (28)" },
  { name: "Akame", universe: "Akame ga Kill", gender: "female", imageUrl: PLACEHOLDER("Akame"), ageNote: "Adult" },
  { name: "Leone", universe: "Akame ga Kill", gender: "female", imageUrl: PLACEHOLDER("Leone"), ageNote: "Adult" },
  { name: "Esdeath", universe: "Akame ga Kill", gender: "female", imageUrl: PLACEHOLDER("Esdeath"), ageNote: "Adult" },
  // Honkai / Star Rail
  { name: "Kiana Kaslana", universe: "Honkai Impact 3rd", gender: "female", imageUrl: PLACEHOLDER("Kiana"), ageNote: "Adult (18)" },
  { name: "Elysia", universe: "Honkai Impact 3rd", gender: "female", imageUrl: PLACEHOLDER("Elysia"), ageNote: "Adult" },
  { name: "Kafka", universe: "Honkai: Star Rail", gender: "female", imageUrl: PLACEHOLDER("Kafka"), ageNote: "Adult" },
  { name: "Acheron", universe: "Honkai: Star Rail", gender: "female", imageUrl: PLACEHOLDER("Acheron"), ageNote: "Adult" },
  { name: "Jade", universe: "Honkai: Star Rail", gender: "female", imageUrl: PLACEHOLDER("Jade"), ageNote: "Adult" },
  // Manhua
  { name: "Xiao Wu", universe: "Soul Land", gender: "female", imageUrl: PLACEHOLDER("Xiao Wu"), ageNote: "Adult" },
];

async function seed() {
  console.log("Re-seeding characters with working image URLs...");
  
  await db.delete(charactersTable);
  await db.insert(charactersTable).values(characters);
  console.log(`Seeded ${characters.length} characters.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
