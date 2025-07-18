"use server"

import { createClient } from "@/lib/supabase/server"

export async function requestPasswordReset(prevState: any, formData: FormData) {
  const email = String(formData.get("email"))
  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/update-password`, // Redirect to a page where user can set new password
  })

  if (error) {
    console.error("[requestPasswordReset] Supabase error:", error.message)
    return { message: "Failed to send reset email. Please try again." }
  }

  return { success: "Password reset email sent! Check your inbox." }
}
