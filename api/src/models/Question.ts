import { sql ,relations} from "drizzle-orm";
import { integer, pgTable, varchar, text} from "drizzle-orm/pg-core";
import { Quiz } from "./Quiz";
//import { smallint } from "drizzle-orm/mysql-core";

export const Question = pgTable("questions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  quiz_id: integer("quiz_id").references(() => Quiz.id),
  question_text: varchar({ length: 255 }).notNull(),
  answer_options: text("answer_options")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  correct_answer: integer().notNull(),
});

export const quesstionsRelations = relations(Question, ({ one }) => ({
  quiz: one(Quiz, {
    fields: [Question.quiz_id],
    references: [Quiz.id],
  }),
}));