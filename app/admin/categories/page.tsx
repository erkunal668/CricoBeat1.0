"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { categoriesData } from "@/lib/data"
import { PencilIcon, Trash2Icon, PlusCircleIcon } from "lucide-react"

export default function AdminCategoriesPage() {
  // In a real app, this would come from a database and be managed with state/actions
  const [categories, setCategories] = useState(categoriesData)

  const handleAdd = () => {
    console.log("Add Category clicked")
    // Implement dialog/form for adding
  }

  const handleEdit = (id: string) => {
    console.log("Edit Category clicked for:", id)
    // Implement dialog/form for editing
  }

  const handleDelete = (id: string) => {
    console.log("Delete Category clicked for:", id)
    // Implement confirmation and actual deletion
    setCategories(categories.filter((cat) => cat.slug !== id))
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Categories</h1>
        <Button onClick={handleAdd}>
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>
      <p className="text-gray-500 dark:text-gray-400">Add, edit, and delete main sports and fitness categories.</p>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.slug}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(category.slug)}>
                    <PencilIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(category.slug)}>
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
