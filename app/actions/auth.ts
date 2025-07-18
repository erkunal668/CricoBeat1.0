// This file will now only contain getUserAndProfile and register
import { createClient, createAdminClient } from "@/lib/supabase/server"
import { SignupFormSchema } from "@/schemas" // Only SignupFormSchema is needed here

// Define FormState for signup
export type FormState =
  | {
      errors?: {
        fullName?: string[]
        mobile?: string[]
        address?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

/* -------------------------------------------------------------------------- */
/*                                AUTH ACTIONS                                */
/* -------------------------------------------------------------------------- */

export async function register(state: FormState, formData: FormData) {
  "use server"
  const validatedFields = SignupFormSchema.safeParse({
    fullName: formData.get("fullName"),
    mobile: formData.get("mobile"),
    address: formData.get("address"),
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors in the form.",
    }
  }

  const { fullName, mobile, address, email, password } = validatedFields.data
  const supabase = await createClient()

  try {
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
        data: {
          full_name: fullName, // Store full name in user_metadata
        },
      },
    })

    if (signUpError) {
      console.error("[register] Supabase signup error:", signUpError.message)
      return { message: signUpError.message || "Something went wrong during signup!" }
    }

    if (data.user) {
      // Insert additional profile data into public.profiles table
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: fullName,
        mobile: mobile,
        address: address,
        role: "user", // Default role for new signups
      })

      if (profileError) {
        console.error("[register] Supabase profile insert error:", profileError.message)
        // Optionally, delete the auth user if profile creation fails
        await createAdminClient().auth.admin.deleteUser(data.user.id)
        return { message: "Failed to create user profile. Please try again." }
      }
    }

    return { success: "Check your inbox to confirm your email and complete registration!" }
  } catch (error: any) {
    console.error("[register] Unexpected error:", error.message)
    return { message: "An unexpected error occurred during registration." }
  }
}

/** Used by server components (e.g., Header) to get the current user and their profile role */
export async function getUserAndProfile() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { user: null, profile: null }
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, role") // Select only necessary fields
    .eq("id", user.id)
    .single()

  if (profileError) {
    console.error("[getUserAndProfile] Error fetching profile:", profileError.message)
    return { user, profile: null }
  }

  return { user, profile }
}
