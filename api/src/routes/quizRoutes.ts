import { Router } from "express";
import { getQuizzes, getQuizQuestions, submitQuizAnswers } from "../controllers/quizController";
//Quizzes End Point
const router = Router();
// Route to get all quizzes
router.get("/", getQuizzes);
// Route to get questions for a specific quiz
router.get("/:quizId/questions",getQuizQuestions);
// Route to submit answers for a quiz
router.post("/:quizId/submit", submitQuizAnswers);
export default router;