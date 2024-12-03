import { z } from "zod";

// Validation for registration
export const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid Email Address'),
    password:z.string().min(6,'Password must be atleast six characters'),
  }),
})

// Validation for login
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});