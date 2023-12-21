import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(3,"Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});


export default signupSchema