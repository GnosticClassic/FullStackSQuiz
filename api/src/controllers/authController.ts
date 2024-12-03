import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from "../config/db";
import { User } from "../models/User";
import { eq } from "drizzle-orm";

// Register a new user
export async function registerUser(req:Request, res:Response)  {
  const { email, password } = req.body
  
   
  try {
    // Check if email already exists
   const [existingUser] = await db.select().from(User).where(eq(User.email,email))
    if (existingUser) {
     res.status(400).json({ message: "Email is already in use" });
   }
    else {
      //hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create the user
      const newUser = await db
        .insert(User)
        .values({
          email,
          password: hashedPassword,
        })
        .returning();

      res
        .status(201)
        .json(newUser);
    }
   
  }
  catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
    //res.send(200)
}

// Login a user
export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    //Find user by email
    const [user] = await db.select().from(User).where(eq(User.email, email));
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        res.status(201).json({ message: "User logged successfully" });
      } else {
        res.status(400).send({ message: "Email or Password is Invalid" });
      }
    } else {
      res.status(400).send({ message: "Email or Password is Invalid" });
    }
  } catch (error) {
    res.status(500).json({message:'Login failed',error})
  }
  
  
  
}