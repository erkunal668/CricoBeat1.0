"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categoriesData, type Subcategory } from "@/lib/data"

interface AddEditSubcategoryFormProps {
  initialData?: Subcategory & { parentCategorySlug: string } // For editing
  onSave: (data: Subcategory & { parentCategorySlug: string }) => void
  onCancel: () => void
}

export function AddEditSubcategoryForm({ initialData, onSave, onCancel }: AddEditSubcategoryFormProps) {
  const [name, setName] = useState(initialData?.name || "")
  const [slug, setSlug] = useState(initialData?.slug || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "")
  const [parentCategorySlug, setParentCategorySlug] = useState(initialData?.parentCategorySlug || "")

  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
      setSlug(initialData.slug)
      setDescription(initialData.description)
      setImageUrl(initialData.imageUrl || "")
      setParentCategorySlug(initialData.parentCategorySlug)
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Basic validation
    if (!name || !description || !parentCategorySlug) {
      alert("Please fill in all required fields.")
      return
    }

    // Generate slug if not provided or if it's a new entry
    const finalSlug =
      slug ||
      name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")

    onSave({ name, slug: finalSlug, description, imageUrl, parentCategorySlug })
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="parentCategory" className="text-right">
          Parent Category
        </Label>
        <Select value={parentCategorySlug} onValueChange={setParentCategorySlug}>
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select a parent category" />
          </SelectTrigger>
          <SelectContent>
            {categoriesData.map((category) => (
              <SelectItem key={category.slug} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="slug" className="text-right">
          Slug (Optional)
        </Label>
        <Input
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="col-span-3"
          placeholder="auto-generated if empty"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="imageUrl" className="text-right">
          Image URL
        </Label>
        <Input
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="col-span-3"
          placeholder="e.g., /placeholder.svg"
        />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Subcategory</Button>
      </div>
    </form>
  )
}
