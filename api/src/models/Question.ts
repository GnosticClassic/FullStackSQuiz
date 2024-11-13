import { sql ,relations} from "drizzle-orm";
import { integer, pgTable, varchar, text} from "drizzle-orm/pg-core";
import { Quiz } from "./Quiz";

export const Question = pgTable("questions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  quiz_id: integer("quiz_id").references(()=>Quiz.id),
  question_text: varchar({ length: 255 }).notNull(),
  answer_options: text("tags1")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  correct_answer: varchar({ length: 255 }).notNull(),
});

export const quesstionsRelations = relations(Question, ({ one }) => ({
  quiz: one(Quiz, {
    fields: [Question.quiz_id],
    references: [Quiz.id],
  }),
}));