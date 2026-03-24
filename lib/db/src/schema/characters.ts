import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const charactersTable = pgTable("characters", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  universe: varchar("universe", { length: 255 }).notNull(),
  gender: varchar("gender", { length: 10 }).notNull(),
  imageUrl: text("image_url").notNull(),
  ageNote: varchar("age_note", { length: 255 }),
});

export const insertCharacterSchema = createInsertSchema(charactersTable).omit({ id: true });
export type InsertCharacter = z.infer<typeof insertCharacterSchema>;
export type Character = typeof charactersTable.$inferSelect;
