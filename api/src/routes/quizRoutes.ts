import { Router } from "express";
//Quizzes End Point
const router = Router();
// Route to get all quizzes
router.get("/", (req, res) => {
  res.send("List of quizes");
});
// Route to get questions for a specific quiz
router.get("/:quizId/questions", (req, res) => {
  console.log(req.params);
  res.send("List of questions for the specific Quiz");
});
// Route to submit answers for a quiz
router.post("/:quizId/submit", (req, res) => {
  res.send("Answers submitted for a quiz");
});
export default router;