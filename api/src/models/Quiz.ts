import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { Question } from "./Question";

export const Quiz = pgTable("quizzes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  //age: integer().notNull(),
  category: varchar({ length: 255 }).notNull(),
});
export const quizzesRelations = relations(Quiz, ({ many }) => ({
  questions: many(Question),
}));