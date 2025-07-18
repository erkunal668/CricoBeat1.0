import { createBrowserClient } from "@supabase/ssr"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase env vars missing – add SUPABASE_URL and SUPABASE_ANON_KEY (or their NEXT_PUBLIC_ equivalents).",
  )
}

// ── Singleton to avoid re-initialising the client on every render ─────────────
let browserClient: ReturnType<typeof createBrowserClient> | undefined = undefined

export function createClient() {
  if (!browserClient) {
    browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey)
  }
  return browserClient
}
