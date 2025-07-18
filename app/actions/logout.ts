"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

/** Signs the user out (Server Action). */
export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()

  // Refresh header / middleware state immediately
  revalidatePath("/", "layout")

  return { success: "Logged out!" }
}
