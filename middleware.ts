import { NextResponse, type NextRequest } from "next/server"
import { createServerClient, type CookieOptions } from "@supabase/ssr"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({ name, value, ...options })
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })
        response.cookies.set({ name, value, ...options })
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({ name, value: "", ...options })
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })
        response.cookies.set({ name, value: "", ...options })
      },
    },
  })

  // Refresh session if expired - required for Server Components
  // and to get the latest user data for authorization
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Removed admin route protection: /admin will now be publicly accessible
  // const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")

  // if (isAdminRoute) {
  //   if (!user) {
  //     // If no user, redirect to login
  //     const redirectUrl = request.nextUrl.clone()
  //     redirectUrl.pathname = "/login"
  //     redirectUrl.searchParams.set("redirectedFrom", request.nextUrl.pathname)
  //     return NextResponse.redirect(redirectUrl)
  //   }

  //   // Fetch user's profile to check role
  //   const { data: profile, error: profileError } = await supabase
  //     .from("profiles")
  //     .select("role")
  //     .eq("id", user.id)
  //     .single()

  //   if (profileError || profile?.role !== "admin") {
  //     console.warn(`Unauthorized access attempt to /admin by user: ${user.email}, role: ${profile?.role}`)
  //     const redirectUrl = request.nextUrl.clone()
  //     redirectUrl.pathname = "/" // Redirect non-admins to home
  //     return NextResponse.redirect(redirectUrl)
  //   }
  // }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - /api/ (API routes)
     * - /auth/callback (Supabase auth callback)
     * - Any files in the public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|api|auth/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
