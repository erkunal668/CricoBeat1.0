import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getUserAndProfile } from "@/app/actions/auth"
import { logout } from "@/app/actions/logout"
import { User, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AuthDialog } from "@/components/auth/auth-dialog" // Will be created in the next step

export async function Header() {
  const { user, profile } = await getUserAndProfile()

  return (
    <header className="flex h-16 shrink-0 items-center justify-between px-4 md:px-6 bg-transparent">
      <Link href="/" className="flex items-center gap-2 text-lg font-bold md:text-xl text-white">
        <span className="text-accent-yellow text-2xl font-extrabold tracking-wider">CRICOBEAT</span>
      </Link>

      <nav className="flex items-center gap-2 sm:gap-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary-dark-blue bg-transparent flex items-center gap-2"
                size="sm"
              >
                <User className="h-4 w-4" />
                {profile?.full_name || user.email}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-secondary-light-blue text-white border-secondary-light-blue">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-600" />
              <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                <Link href="/profile" className="w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                <Link href="/settings" className="w-full">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-600" />
              <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                <form action={logout} className="w-full">
                  <button type="submit" className="w-full text-left">
                    Logout
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          // Use the AuthDialog component for login/signup/forgot password
          <AuthDialog />
        )}
      </nav>
    </header>
  )
}
