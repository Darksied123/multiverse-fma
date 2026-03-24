import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { votesTable, charactersTable } from "@workspace/db/schema";
import { eq, sql, desc } from "drizzle-orm";
import { z } from "zod";
import { randomUUID } from "crypto";

const router: IRouter = Router();

const roundChoiceSchema = z.object({
  characterId: z.number().int().positive(),
  choice: z.enum(["marry", "fuck", "avoid"]),
});

const roundSubmissionSchema = z.object({
  choices: z.array(roundChoiceSchema).min(3).max(3),
});

router.post("/stats/submit", async (req, res) => {
  const parsed = roundSubmissionSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid submission" });
    return;
  }

  const { choices } = parsed.data;

  const choiceValues = choices.map((c) => c.choice);
  const uniqueChoices = new Set(choiceValues);
  if (uniqueChoices.size !== 3) {
    res.status(400).json({ error: "Each choice must be unique" });
    return;
  }

  const roundId = randomUUID();

  await db.insert(votesTable).values(
    choices.map((c) => ({
      characterId: c.characterId,
      choice: c.choice,
      roundId,
    }))
  );

  const characterIds = choices.map((c) => c.characterId);

  const statsPromises = characterIds.map(async (charId) => {
    const char = await db.select().from(charactersTable).where(eq(charactersTable.id, charId)).limit(1);
    const charName = char[0]?.name ?? "Unknown";

    const voteCounts = await db
      .select({
        choice: votesTable.choice,
        count: sql<number>`count(*)::int`,
      })
      .from(votesTable)
      .where(eq(votesTable.characterId, charId))
      .groupBy(votesTable.choice);

    const counts = { marry: 0, fuck: 0, avoid: 0 };
    for (const row of voteCounts) {
      counts[row.choice as keyof typeof counts] = row.count;
    }

    const total = counts.marry + counts.fuck + counts.avoid;

    return {
      characterId: charId,
      characterName: charName,
      marryCount: counts.marry,
      fuckCount: counts.fuck,
      avoidCount: counts.avoid,
      totalVotes: total,
      marryPercent: total > 0 ? Math.round((counts.marry / total) * 100) : 0,
      fuckPercent: total > 0 ? Math.round((counts.fuck / total) * 100) : 0,
      avoidPercent: total > 0 ? Math.round((counts.avoid / total) * 100) : 0,
    };
  });

  const characterStats = await Promise.all(statsPromises);

  res.json({ success: true, characterStats });
});

router.get("/stats/global", async (_req, res) => {
  const totalRoundsRow = await db
    .select({ count: sql<number>`count(distinct round_id)::int` })
    .from(votesTable);
  const totalRounds = totalRoundsRow[0]?.count ?? 0;

  const buildLeaderboard = async (choice: string) => {
    const rows = await db
      .select({
        characterId: charactersTable.id,
        characterName: charactersTable.name,
        universe: charactersTable.universe,
        imageUrl: charactersTable.imageUrl,
        count: sql<number>`count(case when ${votesTable.choice} = ${choice} then 1 end)::int`,
        totalVotes: sql<number>`count(${votesTable.id})::int`,
      })
      .from(votesTable)
      .innerJoin(charactersTable, eq(votesTable.characterId, charactersTable.id))
      .groupBy(charactersTable.id, charactersTable.name, charactersTable.universe, charactersTable.imageUrl)
      .orderBy(desc(sql<number>`count(case when ${votesTable.choice} = ${choice} then 1 end)`))
      .limit(10);

    return rows.map((r) => ({
      ...r,
      percent: r.totalVotes > 0 ? Math.round((r.count / r.totalVotes) * 100) : 0,
    }));
  };

  const [topMarried, topFucked, topAvoided] = await Promise.all([
    buildLeaderboard("marry"),
    buildLeaderboard("fuck"),
    buildLeaderboard("avoid"),
  ]);

  res.json({ topMarried, topFucked, topAvoided, totalRounds });
});

router.get("/stats/character/:characterId", async (req, res) => {
  const charId = parseInt(req.params.characterId, 10);
  if (isNaN(charId)) {
    res.status(400).json({ error: "Invalid character ID" });
    return;
  }

  const char = await db.select().from(charactersTable).where(eq(charactersTable.id, charId)).limit(1);
  if (!char[0]) {
    res.status(404).json({ error: "Character not found" });
    return;
  }

  const voteCounts = await db
    .select({
      choice: votesTable.choice,
      count: sql<number>`count(*)::int`,
    })
    .from(votesTable)
    .where(eq(votesTable.characterId, charId))
    .groupBy(votesTable.choice);

  const counts = { marry: 0, fuck: 0, avoid: 0 };
  for (const row of voteCounts) {
    counts[row.choice as keyof typeof counts] = row.count;
  }

  const total = counts.marry + counts.fuck + counts.avoid;

  res.json({
    characterId: charId,
    characterName: char[0].name,
    marryCount: counts.marry,
    fuckCount: counts.fuck,
    avoidCount: counts.avoid,
    totalVotes: total,
    marryPercent: total > 0 ? Math.round((counts.marry / total) * 100) : 0,
    fuckPercent: total > 0 ? Math.round((counts.fuck / total) * 100) : 0,
    avoidPercent: total > 0 ? Math.round((counts.avoid / total) * 100) : 0,
  });
});

export default router;
