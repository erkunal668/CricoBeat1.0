import { z } from "zod"

/**
 * Schema for the login form.
 *   • email – required, must be a valid email
 *   • password – required (min 1 char because Supabase handles complexity)
 */
export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(1, { message: "Password is required." }).trim(),
})

/**
 * Schema for the signup form.
 */
export const SignupFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters long." }).trim(),
  mobile: z
    .string()
    .regex(/^\d{10}$/, { message: "Mobile number must be 10 digits." })
    .trim(),
  address: z.string().min(10, { message: "Address must be at least 10 characters long." }).trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
})

/**
 * Schema for profile updates.
 */
export const ProfileUpdateSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters long." }).trim(),
  mobile: z
    .string()
    .regex(/^\d{10}$/, { message: "Mobile number must be 10 digits." })
    .trim(),
  address: z.string().min(10, { message: "Address must be at least 10 characters long." }).trim(),
})
