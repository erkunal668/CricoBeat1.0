import { createServerClient, type CookieOptions } from "@supabase/ssr"
// import { cookies } from "next/headers"
const { cookies } = require("next/headers"); 

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase env vars missing – add SUPABASE_URL and SUPABASE_ANON_KEY (or their NEXT_PUBLIC_ equivalents).",
  )
}

export async function createClient() {
  const cookieStore = cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch {
          /* ignore – called from a Server Component */
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options })
        } catch {
          /* ignore – called from a Server Component */
        }
      },
    },
  })
}

// New function to create a Supabase client with the service_role key
export function createAdminClient() {
  if (!supabaseServiceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set. Cannot create admin client.")
  }
  return createServerClient(supabaseUrl!, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    cookies: {
      get(name: string) {
        return cookies().get(name)?.value
      },
      set() {
        /* do nothing */
      },
      remove() {
        /* do nothing */
      },
    },
  })
}
