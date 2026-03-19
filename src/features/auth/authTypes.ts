import * as z from "zod";

export const SignUpFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z
    .string()
    .min(8, "Confirm Password must be at least 8 characters long"),
});

export type SignUpFormValues = z.infer<typeof SignUpFormSchema>;

export const SignInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type SignInFormValues = z.infer<typeof SignInFormSchema>;
