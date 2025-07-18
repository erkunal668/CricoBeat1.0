// This file will now only contain the login action
"use server"

import { createClient, createAdminClient } from "@/lib/supabase/server"
import { LoginSchema } from "@/schemas"
import { revalidatePath } from "next/cache"

/* -------------------------------------------------------------------------- */
/*  Constants for the fixed admin login                                       */
/* -------------------------------------------------------------------------- */
const FIXED_ADMIN_EMAIL = "kkunal668@gmail.com"
const FIXED_ADMIN_PASSWORD = "1234567890"
const FIXED_ADMIN_PROFILE = {
  full_name: "Kunal Admin",
  mobile: "9939619930",
  address: "Admin Address, City, State",
  role: "admin",
}

/* -------------------------------------------------------------------------- */
/*  Ensure the fixed admin user exists                                        */
/* -------------------------------------------------------------------------- */
async function ensureFixedAdminUser() {
  const admin = createAdminClient()

  // 1. Create (or ignore if 422)
  await admin.auth.admin.createUser({
    email: FIXED_ADMIN_EMAIL,
    password: FIXED_ADMIN_PASSWORD,
    email_confirm: true,
    user_metadata: { full_name: FIXED_ADMIN_PROFILE.full_name },
  })

  // 2. Resolve user id (new or existing)
  const { users } = (await admin.auth.admin.listUsers({
    email: FIXED_ADMIN_EMAIL,
    perPage: 1,
    page: 1,
  }).data) ?? { users: [] }

  const uid = users?.[0]?.id
  if (!uid) return

  // 3. Upsert profile
  await admin.from("profiles").upsert({ id: uid, ...FIXED_ADMIN_PROFILE }, { onConflict: "id" })
}

/* -------------------------------------------------------------------------- */
/*  Server Action: login                                                      */
/* -------------------------------------------------------------------------- */
export async function login(_prevState: any, formData: FormData) {
  // Validate input
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors, message: "Invalid fields." }
  }

  const { email, password } = parsed.data

  // Auto-seed the fixed admin
  if (email === FIXED_ADMIN_EMAIL && password === FIXED_ADMIN_PASSWORD) {
    await ensureFixedAdminUser()
  }

  // Sign in
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { message: "Invalid credentials." }
  }

  // Revalidate root layout so middleware & header pick up the new session
  revalidatePath("/", "layout")
  return { success: "Logged in!" }
}
