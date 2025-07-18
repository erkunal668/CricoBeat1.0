import Link from "next/link"

export function Footer() {
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t py-6 px-4 sm:flex-row md:px-6">
      <p className="text-xs text-gray-500 dark:text-gray-400">© 2025&nbsp;Cricobeat. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs underline-offset-4 hover:underline" href="#">
          Terms&nbsp;of&nbsp;Service
        </Link>
        <Link className="text-xs underline-offset-4 hover:underline" href="#">
          Privacy
        </Link>
        <Link className="text-xs underline-offset-4 hover:underline" href="#">
          Contact
        </Link>
      </nav>
    </footer>
  )
}
