import { Router } from "express";
import { registerSchema, loginSchema } from "../schemas/authSchema";
import { validate } from "../middleware/validationMiddleware";
import { registerUser,loginUser } from "../controllers/authController";

const router = Router()
 
//Register User
router.post('/register', validate(registerSchema),registerUser)
//Login User
router.post('/login',validate(loginSchema), loginUser)
//Logout User
//Reset PassWord
export default router