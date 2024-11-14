import { Request, Response } from "express";
import { db } from "../config/db";
//import { Request, Response } from "express";
//import { db } from "../config/db";
import { Quiz } from '../models/Quiz';
import { Question } from "../models/Question";
import { eq } from "drizzle-orm";

// Interface for the Create Quiz Request
interface CreateQuizRequest extends Request {
  body: {
    title: string;
    category: string;
  };
}

// Interface for Add Question Request
interface AddQuestionRequest extends Request {
  params: { quizId: string };
  body: {
    question_text: string;
    answer_options: string[];
    correct_answer: number;
  };
}


//To Add Questions to a Quiz
export async function addQuestionToQuiz(req: Request, res: Response) {
  const { quizId } = req.params;
  const { question_text, answer_options, correct_answer } = req.body;
  
  
  try {
      
      const newQuestion = await db
        .insert(Question)
        .values({
          quiz_id: parseInt(quizId),
          question_text,
          answer_options,
          correct_answer,
        })
        .returning();

      res.status(201).json({ question: newQuestion });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to add question to quiz", error });
    }
}
  


//To Create a new quiz
export async function createQuiz(req: Request, res: Response) {
  //const { title, category } = req.body;
  try {
    const newQuiz = await db
      .insert(Quiz)
      .values(req.body)
      .returning();
    res.status(201).json({ quiz: newQuiz });
  } catch (error) {
    res.status(500).json({message:'Failed to create Quiz ',error})
  };
  
}


export async function getQuizzes  (req :Request, res:Response) {
  try {
    const quizzies = await db.select().from(Quiz)
    res.json(quizzies)
  } catch (error) {
    res.status(500).json({message:'Failed To fetch quizzes from the server',error})
 }
};
//Get Quiz By ID
export async function getQuizById(req: Request, res: Response) {
  const {quizId} =req.params
  try {
    const [quiz] = await db.select().from(Quiz).where(eq(Quiz.id, Number(quizId)))
    if (!quiz) {
      res.status(404).send({Message:'Quiz Not Found!'})
    }
    else {
      res.json(quiz)
    }
 } catch (error) {
   res
     .status(500)
     .json({ message: "Failed To fetch quizzes from the server", error });
 }
}
//Delete a Quiz

export async function deleteQuiz(req: Request, res: Response) {
  const id= Number(req.params.quizId)
  try {
    const [deletedQuiz] = await db.delete(Quiz).where(eq(Quiz.id, id)).returning()
    if (deletedQuiz) {
      res.status(204).send()
    }
    else {
      res.status(404).send({ message:'Quiz never exists'})
    }
   } catch (error) {
     res
       .status(500)
       .send(error)
   }
} 
//Edit a quiz
export async function editQuiz(req: Request, res: Response) {
  try {
    const id = Number(req.params.quizId);
    const updatedFields = req.body
    const [quiz] = await db.update(Quiz).set(updatedFields)
      .where(eq(Quiz.id, id))
      .returning()
    if (quiz) {
      res.json(quiz)
    }
    else {
      res.status(404).send({message:'Quiz not found'})
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed To fetch quizzes from the server", error });
  }
} 
//Get Quizzies By Category
export async function getQuizziesByCategory(req:Request,res:Response) {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed To fetch quizzes from the server", error });
  }
}

export function getQuizQuestions  (req: Request, res: Response) {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed To fetch quizzes from the server", error });
  }
};
// Submitted Quiz Answers
export function submitQuizAnswers  (req: Request, res: Response) {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed To fetch quizzes from the server", error });
  }
};
