"use server"

import { createAdminClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// Define a Zod schema for input validation
const ShoppingItemSchema = z.object({
  id: z.string().optional(), // Optional for new items
  name: z.string().min(1, "Name is required.").trim(),
  slug: z.string().optional(), // Will be auto-generated if empty
  description: z.string().min(1, "Description is required.").trim(),
  price: z.coerce.number().min(0.01, "Price must be greater than 0."),
  discount: z.coerce.number().min(0).max(100).optional().nullable(),
  image_urls: z.array(z.string().url("Invalid image URL.")).optional(), // Renamed to match DB
  subcategory_slug: z.string().min(1, "Subcategory is required.").trim(), // Renamed to match DB
})

export type ShoppingItemFormState = {
  errors?: {
    name?: string[]
    slug?: string[]
    description?: string[]
    price?: string[]
    discount?: string[]
    image_urls?: string[]
    subcategory_slug?: string[]
  }
  message?: string
  success?: boolean
}

/* -------------------------------------------------------------------------- */
/*                               CRUD ACTIONS                                 */
/* -------------------------------------------------------------------------- */

export async function addShoppingItem(
  _prevState: ShoppingItemFormState,
  formData: FormData,
): Promise<ShoppingItemFormState> {
  const rawData = {
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    price: formData.get("price"),
    discount: formData.get("discount") || null, // Handle empty string for optional number
    image_urls: formData.getAll("image_urls"), // This will be an array of strings
    subcategory_slug: formData.get("subcategory_slug"),
  }

  const validatedFields = ShoppingItemSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors in the form.",
      success: false,
    }
  }

  const { name, slug, description, price, discount, image_urls, subcategory_slug } = validatedFields.data

  const finalSlug =
    slug && slug.length > 0
      ? slug
      : name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")

  const supabase = await createAdminClient() // Use admin client to bypass RLS for admin actions

  try {
    const { data, error } = await supabase
      .from("shopping_items")
      .insert({
        name,
        slug: finalSlug,
        description,
        price,
        discount,
        image_urls,
        subcategory_slug,
      })
      .select()
      .single()

    if (error) {
      console.error("[addShoppingItem] Supabase insert error:", error.message)
      if (error.code === "23505") {
        // Unique violation (e.g., slug already exists)
        return { message: "A shopping item with this slug already exists.", success: false }
      }
      return { message: "Failed to add shopping item. Please try again.", success: false }
    }

    revalidatePath("/admin/shopping-items") // Revalidate admin list
    revalidatePath("/shopping/category/[subcategorySlug]", "page") // Revalidate user-facing category page
    revalidatePath("/shopping/[itemSlug]", "page") // Revalidate user-facing item page
    revalidatePath("/", "layout") // Revalidate layout for any potential changes

    return { success: true, message: "Shopping item added successfully!" }
  } catch (error: any) {
    console.error("[addShoppingItem] Unexpected error:", error.message)
    return { message: `An unexpected error occurred: ${error.message}`, success: false }
  }
}

export async function updateShoppingItem(
  _prevState: ShoppingItemFormState,
  formData: FormData,
): Promise<ShoppingItemFormState> {
  const id = formData.get("id") as string

  const rawData = {
    id: formData.get("id"),
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    price: formData.get("price"),
    discount: formData.get("discount") || null,
    image_urls: formData.getAll("image_urls"),
    subcategory_slug: formData.get("subcategory_slug"),
  }

  const validatedFields = ShoppingItemSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors in the form.",
      success: false,
    }
  }

  const { name, slug, description, price, discount, image_urls, subcategory_slug } = validatedFields.data

  const finalSlug =
    slug && slug.length > 0
      ? slug
      : name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")

  const supabase = await createAdminClient()

  try {
    const { data, error } = await supabase
      .from("shopping_items")
      .update({
        name,
        slug: finalSlug,
        description,
        price,
        discount,
        image_urls,
        subcategory_slug,
        updated_at: new Date().toISOString(), // Update timestamp
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("[updateShoppingItem] Supabase update error:", error.message)
      if (error.code === "23505") {
        return { message: "A shopping item with this slug already exists.", success: false }
      }
      return { message: "Failed to update shopping item. Please try again.", success: false }
    }

    revalidatePath("/admin/shopping-items")
    revalidatePath("/shopping/category/[subcategorySlug]", "page")
    revalidatePath("/shopping/[itemSlug]", "page")
    revalidatePath("/", "layout")

    return { success: true, message: "Shopping item updated successfully!" }
  } catch (error: any) {
    console.error("[updateShoppingItem] Unexpected error:", error.message)
    return { message: `An unexpected error occurred: ${error.message}`, success: false }
  }
}

export async function deleteShoppingItem(id: string): Promise<ShoppingItemFormState> {
  const supabase = await createAdminClient()

  try {
    const { error } = await supabase.from("shopping_items").delete().eq("id", id)

    if (error) {
      console.error("[deleteShoppingItem] Supabase delete error:", error.message)
      return { message: "Failed to delete shopping item. Please try again.", success: false }
    }

    revalidatePath("/admin/shopping-items")
    revalidatePath("/shopping/category/[subcategorySlug]", "page")
    revalidatePath("/shopping/[itemSlug]", "page")
    revalidatePath("/", "layout")

    return { success: true, message: "Shopping item deleted successfully!" }
  } catch (error: any) {
    console.error("[deleteShoppingItem] Unexpected error:", error.message)
    return { message: `An unexpected error occurred: ${error.message}`, success: false }
  }
}
