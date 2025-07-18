"use client" // This page needs to be a client component to use useActionState

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { UsersIcon, LayoutGridIcon, ListOrderedIcon, AwardIcon, MessageSquareTextIcon } from "lucide-react"
// Removed Button and useActionState as the temporary admin setup section is removed

export default function AdminDashboardPage() {
  // Removed temporary admin seeding section

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-500 dark:text-gray-400">Manage your application content and users.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Link href="/admin/categories">
          <Card className="transition-all hover:scale-[1.02] hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <LayoutGridIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Manage Sports & Fitness Categories</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Add, edit, or delete main categories.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/subcategories">
          <Card className="transition-all hover:scale-[1.02] hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subcategories</CardTitle>
              <ListOrderedIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Organize Sub-disciplines</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Define specific areas within categories.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/membership-plans">
          <Card className="transition-all hover:scale-[1.02] hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Membership Plans</CardTitle>
              <AwardIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Configure Access Tiers</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Set up and manage subscription plans.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/users">
          <Card className="transition-all hover:scale-[1.02] hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Users</CardTitle>
              <UsersIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Manage User Accounts</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">View, add, edit, or delete user profiles.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/testimonials">
          <Card className="transition-all hover:scale-[1.02] hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
              <MessageSquareTextIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Curate User Feedback</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Approve, edit, or remove testimonials.</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
