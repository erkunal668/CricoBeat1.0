"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { usersData } from "@/lib/data"
import { PencilIcon, Trash2Icon, PlusCircleIcon } from "lucide-react"

export default function AdminUsersPage() {
  const [users, setUsers] = useState(usersData)

  const handleAdd = () => {
    console.log("Add User clicked")
    // Implement dialog/form for adding
  }

  const handleEdit = (id: string) => {
    console.log("Edit User clicked for:", id)
    // Implement dialog/form for editing
  }

  const handleDelete = (id: string) => {
    console.log("Delete User clicked for:", id)
    // Implement confirmation and actual deletion
    setUsers(users.filter((user) => user.id !== id))
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <Button onClick={handleAdd}>
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      <p className="text-gray-500 dark:text-gray-400">View, add, edit, and delete user accounts.</p>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(user.id)}>
                    <PencilIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)}>
                    <Trash2Icon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
