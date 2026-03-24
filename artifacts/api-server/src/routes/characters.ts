import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { charactersTable } from "@workspace/db/schema";
import { sql, eq, and } from "drizzle-orm";

const router: IRouter = Router();

router.get("/characters", async (req, res) => {
  const gender = req.query.gender as string | undefined;

  let conditions = [];
  if (gender === "male") {
    conditions.push(eq(charactersTable.gender, "male"));
  } else if (gender === "female") {
    conditions.push(eq(charactersTable.gender, "female"));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const characters = whereClause
    ? await db.select().from(charactersTable).where(whereClause).orderBy(sql`RANDOM()`).limit(3)
    : await db.select().from(charactersTable).orderBy(sql`RANDOM()`).limit(3);

  res.json(characters);
});

router.get("/characters/all", async (req, res) => {
  const gender = req.query.gender as string | undefined;

  let conditions = [];
  if (gender === "male") {
    conditions.push(eq(charactersTable.gender, "male"));
  } else if (gender === "female") {
    conditions.push(eq(charactersTable.gender, "female"));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const characters = whereClause
    ? await db.select().from(charactersTable).where(whereClause).orderBy(charactersTable.name)
    : await db.select().from(charactersTable).orderBy(charactersTable.name);

  res.json(characters);
});

export default router;
