"use server"

import { createClient, createAdminClient } from "@/lib/supabase/server"
import { SignupFormSchema } from "@/schemas"
import type { FormState } from "./auth" // reuse the existing type

/**
 * Server Action – user sign-up
 */
export async function register(state: FormState, formData: FormData) {
  const validated = SignupFormSchema.safeParse({
    fullName: formData.get("fullName"),
    mobile: formData.get("mobile"),
    address: formData.get("address"),
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Please correct the errors in the form.",
    }
  }

  const { fullName, mobile, address, email, password } = validated.data
  const supabase = await createClient()

  // ── sign up in auth.users ────────────────────────────────────────────────
  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      data: { full_name: fullName },
    },
  })

  if (signUpError) {
    return { message: signUpError.message || "Signup failed." }
  }

  // ── insert profile row ───────────────────────────────────────────────────
  if (data.user) {
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      full_name: fullName,
      mobile,
      address,
      role: "user",
    })

    if (profileError) {
      // clean up auth.user if profile insert fails
      await createAdminClient().auth.admin.deleteUser(data.user.id)
      return { message: "Failed to create user profile. Please try again." }
    }
  }

  return { success: "Check your inbox to confirm your email and finish registration!" }
}
