"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { categoriesData, type Subcategory } from "@/lib/data" // Using categoriesData to get subcategories
import { PencilIcon, Trash2Icon, PlusCircleIcon, ImageIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AddEditSubcategoryForm } from "@/components/admin/add-edit-subcategory-form"
import Image from "next/image"

// Helper type for subcategories with parent info for display
type DisplaySubcategory = Subcategory & { parentCategory: string; id: string }

export default function AdminSubcategoriesPage() {
  // Flatten all subcategories for display and add unique ID
  const initialSubcategories: DisplaySubcategory[] = categoriesData.flatMap((category) =>
    category.subcategories.map((sub) => ({
      ...sub,
      parentCategory: category.name,
      id: `${category.slug}-${sub.slug}`, // Unique ID for keying
    })),
  )

  const [subcategories, setSubcategories] = useState<DisplaySubcategory[]>(initialSubcategories)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSubcategory, setEditingSubcategory] = useState<DisplaySubcategory | undefined>(undefined)

  const handleAdd = () => {
    setEditingSubcategory(undefined) // Clear any previous editing state
    setIsDialogOpen(true)
  }

  const handleEdit = (id: string) => {
    const subToEdit = subcategories.find((sub) => sub.id === id)
    if (subToEdit) {
      // Need to pass parentCategorySlug for the form's initial data
      const parentCat = categoriesData.find((cat) => cat.name === subToEdit.parentCategory)
      if (parentCat) {
        setEditingSubcategory({ ...subToEdit, parentCategorySlug: parentCat.slug })
        setIsDialogOpen(true)
      }
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this subcategory?")) {
      setSubcategories(subcategories.filter((sub) => sub.id !== id))
      console.log("Deleted Subcategory with ID:", id)
    }
  }

  const handleSaveSubcategory = (formData: Subcategory & { parentCategorySlug: string }) => {
    // In a real application, you would send this data to your backend/database
    console.log("Saving Subcategory:", formData)

    const newSubcategory: DisplaySubcategory = {
      ...formData,
      parentCategory: categoriesData.find((cat) => cat.slug === formData.parentCategorySlug)?.name || "Unknown",
      id: `${formData.parentCategorySlug}-${formData.slug}-${Date.now()}`, // Generate a unique ID for new entries
    }

    if (editingSubcategory) {
      // Update existing
      setSubcategories(subcategories.map((sub) => (sub.id === editingSubcategory.id ? newSubcategory : sub)))
    } else {
      // Add new
      setSubcategories([...subcategories, newSubcategory])
    }

    setIsDialogOpen(false) // Close dialog after saving
    setEditingSubcategory(undefined) // Clear editing state
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Subcategories</h1>
        <Button onClick={handleAdd}>
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Add Subcategory
        </Button>
      </div>
      <p className="text-gray-500 dark:text-gray-400">
        Organize and manage sub-disciplines within your main categories.
      </p>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Parent Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subcategories.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell>
                  {sub.imageUrl ? (
                    <Image
                      src={sub.imageUrl || "/placeholder.svg"}
                      alt={sub.name}
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  )}
                </TableCell>
                <TableCell className="font-medium">{sub.name}</TableCell>
                <TableCell>{sub.parentCategory}</TableCell>
                <TableCell className="max-w-[200px] truncate">{sub.description}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(sub.id)}>
                    <PencilIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(sub.id)}>
                    <Trash2Icon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingSubcategory ? "Edit Subcategory" : "Add New Subcategory"}</DialogTitle>
          </DialogHeader>
          <AddEditSubcategoryForm
            initialData={editingSubcategory}
            onSave={handleSaveSubcategory}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
