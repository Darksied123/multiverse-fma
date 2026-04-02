import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { charactersTable } from "@workspace/db/schema";
import { sql, eq, and } from "drizzle-orm";

const router: IRouter = Router();

router.get("/characters", async (req, res, next) => {
  try {
    const gender = req.query.gender as string | undefined;

    const conditions = [];
    if (gender === "male") conditions.push(eq(charactersTable.gender, "male"));
    else if (gender === "female") conditions.push(eq(charactersTable.gender, "female"));

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const characters = whereClause
      ? await db.select().from(charactersTable).where(whereClause).orderBy(sql`RANDOM()`).limit(3)
      : await db.select().from(charactersTable).orderBy(sql`RANDOM()`).limit(3);

    res.json(characters);
  } catch (err) {
    next(err);
  }
});

router.get("/characters/all", async (req, res, next) => {
  try {
    const gender = req.query.gender as string | undefined;

    const conditions = [];
    if (gender === "male") conditions.push(eq(charactersTable.gender, "male"));
    else if (gender === "female") conditions.push(eq(charactersTable.gender, "female"));

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const characters = whereClause
      ? await db.select().from(charactersTable).where(whereClause).orderBy(charactersTable.name)
      : await db.select().from(charactersTable).orderBy(charactersTable.name);

    res.set("Cache-Control", "public, max-age=60");
    res.json(characters);
  } catch (err) {
    next(err);
  }
});

export default router;
