import { pgTable, serial, integer, varchar, timestamp, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { charactersTable } from "./characters";

export const votesTable = pgTable("votes", {
  id: serial("id").primaryKey(),
  characterId: integer("character_id").notNull().references(() => charactersTable.id),
  choice: varchar("choice", { length: 10 }).notNull(),
  roundId: varchar("round_id", { length: 64 }),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_votes_character_id").on(table.characterId),
  index("idx_votes_choice").on(table.choice),
  index("idx_votes_round_id").on(table.roundId),
  index("idx_votes_char_choice").on(table.characterId, table.choice),
]);

export const insertVoteSchema = createInsertSchema(votesTable).omit({ id: true, createdAt: true });
export type InsertVote = z.infer<typeof insertVoteSchema>;
export type Vote = typeof votesTable.$inferSelect;
