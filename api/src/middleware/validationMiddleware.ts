//import { Request, Response, NextFunction } from "express";
//import { z, ZodError } from "zod";

// export function validateData(schema: z.ZodObject<any, any>) {
//   return (req: Request, res: Response, next: NextFunction) => {
//     try {
//       schema.parse(req.body)
       
//       next();
//     } catch (error) {
//       if (error instanceof ZodError) {
//         const errorMessages = error.errors.map((issue: any) => ({
//           message: `${issue.path.join(".")} is ${issue.message}`,
//         }));
//         res.status(400).json({ error: "Invalid data", details: errorMessages });
//       } else {
//         res.status(500).json({ error: "Internal Server Error" });
//       }
//     }
//   };
// }
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message, issues: error });
      }
    }
  };
