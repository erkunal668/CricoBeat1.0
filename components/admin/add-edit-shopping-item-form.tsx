"use client"

import type React from "react"
import { useState, useEffect, useCallback, startTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categoriesData, type ShoppingItem } from "@/lib/data"
import { UploadCloudIcon, XIcon } from "lucide-react"
import Image from "next/image"
import { toast } from "@/hooks/use-toast"
import { useActionState } from "react"
import { addShoppingItem, updateShoppingItem, type ShoppingItemFormState } from "@/app/actions/shopping-items"

interface AddEditShoppingItemFormProps {
  initialData?: ShoppingItem // For editing
  onSave: () => void // No longer passes data, as action handles it
  onCancel: () => void
}

export function AddEditShoppingItemForm({ initialData, onSave, onCancel }: AddEditShoppingItemFormProps) {
  const [name, setName] = useState(initialData?.name || "")
  const [slug, setSlug] = useState(initialData?.slug || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [price, setPrice] = useState(initialData?.price || 0)
  const [discount, setDiscount] = useState(initialData?.discount || 0)
  const [subcategorySlug, setSubcategorySlug] = useState(initialData?.subcategory_slug || "") // Renamed
  const [imageUrls, setImageUrls] = useState<string[]>(initialData?.image_urls || []) // Renamed
  const [filesToUpload, setFilesToUpload] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)

  const isEditing = !!initialData?.id
  const [state, formAction, isPending] = useActionState<ShoppingItemFormState, FormData>(
    isEditing ? updateShoppingItem : addShoppingItem,
    undefined,
  )

  // Filter categories to only include "Shopping" and its subcategories
  const shoppingCategory = categoriesData.find((cat) => cat.slug === "shopping")
  const shoppingSubcategories = shoppingCategory ? shoppingCategory.subcategories : []

  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
      setSlug(initialData.slug)
      setDescription(initialData.description)
      setPrice(initialData.price)
      setDiscount(initialData.discount || 0)
      setSubcategorySlug(initialData.subcategory_slug)
      setImageUrls(initialData.image_urls || [])
      setFilesToUpload([]) // Clear files to upload when editing existing item
    }
  }, [initialData])

  useEffect(() => {
    if (state?.message) {
      toast({
        title: state.success ? "Success!" : "Error!",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      })
      if (state.success) {
        onSave() // Call onSave to close dialog and refresh parent list
      }
    }
  }, [state, onSave])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFilesToUpload(Array.from(e.target.files))
    }
  }

  const handleRemoveImage = (indexToRemove: number, isUploaded: boolean) => {
    if (isUploaded) {
      setImageUrls((prev) => prev.filter((_, index) => index !== indexToRemove))
    } else {
      setFilesToUpload((prev) => prev.filter((_, index) => index !== indexToRemove))
    }
  }

  const uploadImages = useCallback(async (): Promise<string[]> => {
    if (filesToUpload.length === 0) return []

    setUploading(true)
    const uploadedUrls: string[] = []
    for (const file of filesToUpload) {
      try {
        // Generate a unique filename to prevent conflicts
        const uniqueFilename = `${Date.now()}-${file.name.replace(/\s/g, "_")}`
        const response = await fetch(`/api/upload?filename=${uniqueFilename}`, {
          method: "POST",
          body: file,
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const blob = await response.json()
        uploadedUrls.push(blob.url)
      } catch (error) {
        console.error("Error uploading file:", file.name, error)
        toast({
          title: "Upload Failed",
          description: `Failed to upload ${file.name}.`,
          variant: "destructive",
        })
      }
    }
    setUploading(false)
    setFilesToUpload([]) // Clear files after upload attempt
    return uploadedUrls
  }, [filesToUpload])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Upload any newly-selected images first
    const newlyUploadedImageUrls = await uploadImages()
    const finalImageUrls = [...imageUrls, ...newlyUploadedImageUrls]

    if (finalImageUrls.length === 0) {
      toast({
        title: "No Images",
        description: "Please upload at least one image for the shopping item.",
        variant: "destructive",
      })
      return
    }

    // Build FormData manually (safer than passing the form element)
    const formData = new FormData()

    if (isEditing && initialData?.id) formData.append("id", initialData.id)

    const finalSlug =
      slug.trim() ||
      name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")

    formData.append("name", name)
    formData.append("slug", finalSlug)
    formData.append("description", description)
    formData.append("price", price.toString())
    formData.append("discount", discount ? discount.toString() : "") // keep empty if 0
    formData.append("subcategory_slug", subcategorySlug)

    // Append each image URL
    finalImageUrls.forEach((url) => formData.append("image_urls", url))

    // Submit to the relevant Server Action
    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="subcategory_slug" className="text-right">
          Subcategory
        </Label>
        <Select value={subcategorySlug} onValueChange={setSubcategorySlug} name="subcategory_slug">
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select a subcategory" />
          </SelectTrigger>
          <SelectContent>
            {shoppingSubcategories.map((subcat) => (
              <SelectItem key={subcat.slug} value={subcat.slug}>
                {subcat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state?.errors?.subcategory_slug && (
          <p className="col-span-4 col-start-2 text-red-500 text-sm mt-1">{state.errors.subcategory_slug.join(", ")}</p>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="col-span-3"
          required
        />
        {state?.errors?.name && (
          <p className="col-span-4 col-start-2 text-red-500 text-sm mt-1">{state.errors.name.join(", ")}</p>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="slug" className="text-right">
          Slug (Optional)
        </Label>
        <Input
          id="slug"
          name="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="col-span-3"
          placeholder="auto-generated if empty"
        />
        {state?.errors?.slug && (
          <p className="col-span-4 col-start-2 text-red-500 text-sm mt-1">{state.errors.slug.join(", ")}</p>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="col-span-3"
          required
        />
        {state?.errors?.description && (
          <p className="col-span-4 col-start-2 text-red-500 text-sm mt-1">{state.errors.description.join(", ")}</p>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="price" className="text-right">
          Price (₹)
        </Label>
        <Input
          id="price"
          name="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number.parseFloat(e.target.value))}
          className="col-span-3"
          required
          min="1"
        />
        {state?.errors?.price && (
          <p className="col-span-4 col-start-2 text-red-500 text-sm mt-1">{state.errors.price.join(", ")}</p>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="discount" className="text-right">
          Discount (%)
        </Label>
        <Input
          id="discount"
          name="discount"
          type="number"
          value={discount}
          onChange={(e) => setDiscount(Number.parseFloat(e.target.value))}
          className="col-span-3"
          min="0"
          max="100"
        />
        {state?.errors?.discount && (
          <p className="col-span-4 col-start-2 text-red-500 text-sm mt-1">{state.errors.discount.join(", ")}</p>
        )}
      </div>
      <div className="grid grid-cols-4 items-start gap-4">
        <Label htmlFor="images" className="text-right pt-2">
          Images
        </Label>
        <div className="col-span-3 flex flex-col gap-2">
          <Input id="images" type="file" multiple onChange={handleFileChange} disabled={uploading || isPending} />
          {uploading && (
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <UploadCloudIcon className="h-4 w-4 animate-pulse" /> Uploading images...
            </p>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            {imageUrls.map((url, index) => (
              <div key={`uploaded-${index}`} className="relative h-20 w-20 rounded-md overflow-hidden border">
                <Image
                  src={url || "/placeholder.svg"}
                  alt={`Uploaded image ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                  onClick={() => handleRemoveImage(index, true)}
                  disabled={isPending || uploading}
                >
                  <XIcon className="h-3 w-3" />
                </Button>
              </div>
            ))}
            {filesToUpload.map((file, index) => (
              <div key={`new-${index}`} className="relative h-20 w-20 rounded-md overflow-hidden border border-dashed">
                <Image
                  src={URL.createObjectURL(file) || "/placeholder.svg"}
                  alt={`New image ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                  onClick={() => handleRemoveImage(index, false)}
                  disabled={isPending || uploading}
                >
                  <XIcon className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
          {imageUrls.length + filesToUpload.length === 0 && (
            <p className="text-sm text-gray-400">No images selected. Please upload at least one.</p>
          )}
          {state?.errors?.image_urls && (
            <p className="text-red-500 text-sm mt-1">{state.errors.image_urls.join(", ")}</p>
          )}
        </div>
      </div>
      {state?.message && !state.success && (
        <p className="col-span-4 text-red-500 text-sm text-center">{state.message}</p>
      )}
      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={uploading || isPending}>
          Cancel
        </Button>
        <Button type="submit" disabled={uploading || isPending}>
          {isPending ? (isEditing ? "Saving..." : "Adding...") : isEditing ? "Save Changes" : "Add Item"}
        </Button>
      </div>
    </form>
  )
}
