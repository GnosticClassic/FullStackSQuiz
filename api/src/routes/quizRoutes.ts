import { Router } from "express";
import { getQuizzes, getQuizQuestions, submitQuizAnswers, createQuiz, addQuestionToQuiz, getQuizById, deleteQuiz, editQuiz } from "../controllers/quizController";
import { validate } from "../middleware/validationMiddleware";
import { createQuizSchema, addQuestionSchema } from "../schemas/quizSchema";



//Quizzes End Point
const router = Router();
// Route to get all quizzes
router.get("/", getQuizzes);
// Route to get questions for a specific quiz
router.get("/:quizId/questions",getQuizQuestions);
// Route to submit answers for a quiz
router.post("/:quizId/submit", submitQuizAnswers);
// Route to create a new quiz
router.post('/',validate(createQuizSchema), createQuiz);
//Route to delete a quiz
router.delete('/:quizId', deleteQuiz)
//Route to update quiz
router.put('/:quizId',editQuiz)
// Route to add a question to an existing quiz
router.post('/:quizId/questions',validate(addQuestionSchema),addQuestionToQuiz);
//Route to fetch a Quiz By Id
router.get('/:quizId',getQuizById)
export default router;