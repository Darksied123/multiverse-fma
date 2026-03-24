import { pgTable, serial, integer, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { charactersTable } from "./characters";

export const votesTable = pgTable("votes", {
  id: serial("id").primaryKey(),
  characterId: integer("character_id").notNull().references(() => charactersTable.id),
  choice: varchar("choice", { length: 10 }).notNull(),
  roundId: varchar("round_id", { length: 64 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertVoteSchema = createInsertSchema(votesTable).omit({ id: true, createdAt: true });
export type InsertVote = z.infer<typeof insertVoteSchema>;
export type Vote = typeof votesTable.$inferSelect;
