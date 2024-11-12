import { Request, Response } from "express";

export function getQuizzes  (req :Request, res:Response) {
 // console.log(req.params);
  res.send("List of quizes");
};

export function getQuizQuestions  (req: Request, res: Response) {
  console.log(req.params);
  res.send("List of questions for the specific Quiz");
};

export function submitQuizAnswers  (req: Request, res: Response) {
  console.log(req.params);
  res.send("Answers submitted for a quiz");
};
