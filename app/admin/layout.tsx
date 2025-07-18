import type React from "react"
import Link from "next/link"
import {
  HomeIcon,
  UsersIcon,
  LayoutGridIcon,
  ListOrderedIcon,
  AwardIcon,
  MessageSquareTextIcon,
  ShoppingBagIcon,
} from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <aside className="hidden w-64 flex-col border-r bg-gray-100 p-4 dark:bg-gray-800 md:flex">
          <nav className="grid gap-2">
            <Link
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-all hover:bg-gray-200 dark:text-gray-50 dark:hover:bg-gray-700"
              href="/admin"
            >
              <HomeIcon className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-all hover:bg-gray-200 dark:text-gray-50 dark:hover:bg-gray-700"
              href="/admin/categories"
            >
              <LayoutGridIcon className="h-4 w-4" />
              Categories
            </Link>
            <Link
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-all hover:bg-gray-200 dark:text-gray-50 dark:hover:bg-gray-700"
              href="/admin/subcategories"
            >
              <ListOrderedIcon className="h-4 w-4" />
              Subcategories
            </Link>
            <Link
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-all hover:bg-gray-200 dark:text-gray-50 dark:hover:bg-gray-700"
              href="/admin/membership-plans"
            >
              <AwardIcon className="h-4 w-4" />
              Membership Plans
            </Link>
            <Link
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-all hover:bg-gray-200 dark:text-gray-50 dark:hover:bg-gray-700"
              href="/admin/shopping-items" // NEW LINK
            >
              <ShoppingBagIcon className="h-4 w-4" />
              Shopping Items
            </Link>
            <Link
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-all hover:bg-gray-200 dark:text-gray-50 dark:hover:bg-gray-700"
              href="/admin/users"
            >
              <UsersIcon className="h-4 w-4" />
              Users
            </Link>
            <Link
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-all hover:bg-gray-200 dark:text-gray-50 dark:hover:bg-gray-700"
              href="/admin/testimonials"
            >
              <MessageSquareTextIcon className="h-4 w-4" />
              Testimonials
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
