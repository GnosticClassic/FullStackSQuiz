import { z } from "zod";

// Schema for creating a quiz
export const createQuizSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    category: z.string().min(1, "Category is required"),
  }),
});

// Schema for adding a question to a quiz
export const addQuestionSchema = z.object({
  params: z.object({
    quizId: z.string().regex(/^\d+$/, "Quiz ID must be a number"),
  }),
  body: z
    .object({
      question_text: z.string().min(1, "Question text is required"),
      answer_options: z
        .array(z.string())
        .min(2, "At least two answer options are required"),
      correct_answer: z
        .number()
        .int()
        .nonnegative("Correct answer must be a non-negative integer"),
    })
    .refine(
      (data) =>
        data.correct_answer >= 0 &&
        data.correct_answer < data.answer_options.length,
      {
        message:
          "Correct answer must be a valid index in the answer options array",
        path:['correct_answer']
      }
    ),
});
