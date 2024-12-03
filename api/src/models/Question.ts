import { sql ,relations} from "drizzle-orm";
import { integer, pgTable, varchar, text} from "drizzle-orm/pg-core";
import { Quiz } from "./Quiz";
//import { createInsertSchema,createSelectSchema } from "drizzle-zod";
//import { smallint } from "drizzle-orm/mysql-core";
import{z} from 'zod'

export const Question = pgTable("questions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  quiz_id: integer("quiz_id").references(() => Quiz.id),
  question_text: varchar({ length: 255 }).notNull(),
  answer_options: text("answer_options")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  correct_answer: integer().notNull(),
  image: varchar({ length: 255 }),
  feedBack:varchar({length:255}),
}
);

export const quesstionsRelations = relations(Question, ({ one }) => ({
  quiz: one(Quiz, {
    fields: [Question.quiz_id],
    references: [Quiz.id],
  }),
}));

// export const addQuestionSchema = createInsertSchema(Question, {
//   question_text: z.string().min(1, "Question text is required"),
//   answer_options: z
//     .array(z.string())
//     .min(2, "At least two answer options are required"),
//   correct_answer: z
//     .number()
//     .int()
//     .nonnegative("Correct answer must be a non-negative integer")
//   ,
// })//
 
